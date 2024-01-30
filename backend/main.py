import json
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from pymongo import MongoClient
import bcrypt
import datetime
import uuid
from flask_cors import CORS  
from bson.json_util import dumps


#connects to database
app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/inventory"
app.config['MONGO_DBNAME'] = 'inventoryDatabase'
mongo = PyMongo(app)
CORS(app, supports_credentials=True)
connection_string = "mongodb://localhost:27017/inventory"
client = MongoClient(connection_string)


#add another item to the database
@app.route('/add-inventory', methods=['POST'])
def add_inventory():
    #collect date for new entry
    req_data = request.get_json()
    username = req_data['user']
    name = req_data['name']
    description = req_data['description']
    quantity = req_data['quantity']

    #establish database we are pulling from
    item_db = mongo.db['items']

    #check to see if entry is unnecessary 
    if item_db.find_one({'name': name}) is not None:
            return {'item-addition': 'failed', 'message': 'This item is already in the system. Please consider updating the existing record.'}, 400
    
    #set up information for new item
    new_item = {
    'id': str(uuid.uuid4()),
    'name': name,
    'description': description,
    'quantity': quantity,
    'userId': username
    }
    item_db.insert_one(new_item)

    #announce successfull entry
    new_inventory = list(item_db.find({'name': {'$exists': True}}))
    response = jsonify({'item-addition': 'success', 'inventory': dumps(new_inventory)})
    return response


#deletes an item from the database
@app.route('/delete-inventory', methods=['POST'])
def remove_inventory():
    #get information on target item from correct database
    req_data = request.get_json()
    name = req_data['name']
    item_db = mongo.db['items']
    #ensure target item actually exists
    if item_db.find_one({'name': name}) is None:
        return {'item-deletion': 'failed', 'message': 'This item is not in the system.'}, 400
    
    #delete target item
    item_db.find_one_and_delete({'name': name})

    #announce successfull deletion
    new_inventory = list(item_db.find({'name': {'$exists': True}}))
    response = jsonify({'item-deletion': 'success', 'inventory': dumps(new_inventory)})
    return response


#updates the systems inventory to reflect changes
@app.route('/update-inventory', methods=['POST'])
def update_inventory():
    #collect data for update
    req_data = request.get_json()
    username = req_data['user']
    name = req_data['name']
    old_name = req_data['oldName']
    description = req_data['description']
    quantity = req_data['quantity']

    #establish database we are pulling from
    item_db = mongo.db['items']

    #forget old information, insert new information
    item_db.find_one_and_delete({'name': old_name})
    new_item = {
    'id': str(uuid.uuid4()),
    'name': name,
    'description': description,
    'quantity': quantity,
    'userId': username
    }
    item_db.insert_one(new_item)

    #announce successfull update
    new_inventory = list(item_db.find({'name': {'$exists': True}}))
    response = jsonify({'item-update': 'success', 'inventory': dumps(new_inventory)})
    return response



#retrieves the inventory data from the database
@app.route('/get-inventory', methods=['GET'])
def get_inventory():
    #search for inventory
    item_db = mongo.db['items']
    inventory = list(item_db.find({'name': {'$exists': True}}))
    response = jsonify({'get-inventory': 'success', 'inventory': dumps(inventory)})
    return response



#Registers a new user into the system
@app.route('/create-account', methods=['POST'])
def create_account():
    #initiate request, establish database and collection
    reqData = request.get_json()
    user_db = mongo.db['users']

    #ask for username, password
    uname = reqData['username']
    password = reqData['password']

    #check for duplicate accounts for same person
    #if names match
    if 'firstname' in reqData.keys():
        fname = reqData['firstname']
        lname = reqData['lastname']

        #check if there is an associated username, prompt to sign in (not make new acct)
        if user_db.find_one({'username': uname}) is not None:
            return {'login': 'failed', 'message': 'This username has already been taken. Please try another.'}, 400
        
        #encrypt the password
        salt = bcrypt.gensalt()
        hashedWord = bcrypt.hashpw(password.encode('utf-8'), salt)
        new_user = {
            'id': str(uuid.uuid4()),
            'firstname': fname,
            'lastname': lname,
            'username': uname,
            'password': hashedWord
        }
        user_db.insert_one(new_user)
    #no other shared names in database
    else:
        check_user = user_db.find_one({'username': uname})
        #if entered username is not found in database, prompt to retry or create account
        if check_user is None:
            return {'login': 'failed',
                    'message': 'This username could not be found. Please try again.'}, 400
        #checks the password to ensure correct access
        if not bcrypt.checkpw(password.encode('utf-8'), check_user['password']):
            return {'login': 'failed',
                    'message': 'Incorrect password.'}, 401
    #create an alert announcing successful login
    response = jsonify({'login': 'success', 'current_user': uname})
    return response



if __name__ == '__main__':
    app.run(debug=True)
