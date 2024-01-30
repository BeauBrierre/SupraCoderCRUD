<!-- Beau Brierre
Inventory Management Website
Z-Prefix CRUD Assessment
January 30, 2024 -->


OVERVIEW: 
    This project is an inventory management system with the capability for users to login and perform tracking tasks.
    This product features a react frontend and python backend which connects to Mongo for its database.

STARTING:
     In order to start this product, first a virtual environment must be established. 
     To accomplish this, enter the backend directory and run the command "python -m virtualenv venv"

     Once the virtual environment is establshed, it must be activated.
     The virtual environment can be activated by running the command "venv\Scripts\activate.bat"

     Now that the virtual environment is ready, the local system needs to have all appropriate extensions.
     To quickly install all of these at once, run the command "pip install -r extensions.txt"
    ****Occassionally there is still trouble connecting to the database. if this happens run (in order):
        pip uninstall pymongo, pip uninstall bson, pip install pymongo

    It is also important to make sure that MongoDB is running as a windows service.
    To ensure this, search "services" in the Windows search bar. 
    Then find "MongoDB server" and it should say "running" in the status column.

    If you have not already, leave the backend directory and kick off the product.
    To start the product, run the commands "npm install" then "npm start" in that order.

    Congratulations! The website should now be active!!

