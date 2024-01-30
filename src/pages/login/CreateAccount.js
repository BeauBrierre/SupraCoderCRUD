import React, { useState } from 'react';
import axios from 'axios';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import dog from './max1200.jpg';



//establish variables to be collected and prepare to enter data
const CreateAccount = ({user, setUser}) => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [uname, setUname] = useState('');
  const [pword, setPword] = useState('');
  const navigate = useNavigate();

  //compile variables to be collected for a new account
  const createNewAccount = () => {
    let newAccount = {
      'firstname': fname,
      'lastname': lname,
      'username': uname,
      'password': pword
    };
    //use axios to push newly acquired user info to database
    axios.post(
      'http://127.0.0.1:5000/create-account',
      newAccount,
      {withCredentials: true}
  //prompt the user of a successful log in or an error
  ).then((response) => {
      alert(`logged in as ${response.data.current_user}`);
      setUser(response.data.current_user);
      navigate('/inventory', { replace: true });
  }).catch((err) => {
    alert(err.response.data.message);
    console.log(err);
  });
  };

  //establish variables for entering data into database
  const handleFnameChange = (e) => setFname(e.target.value);
  const handleLnameChange = (e) => setLname(e.target.value);
  const handleUnameChange = (e) => setUname(e.target.value);
  const handlePasswordChange = (e) => setPword(e.target.value);

  //create the form, collect the data by calling function above
	return (
        <div className={styles.form}>
        <h1>SupraSign-Up</h1>
        <form>
          <div>
            <label>First Name </label>
            <input type='text' name='firstname' value={fname} onChange={handleFnameChange} required />
          </div>
          <div>
            <label>Last Name </label>
            <input type='text' name='lastname' value={lname} onChange={handleLnameChange}  required />
          </div>
          <div>
            <label>Username </label>
            <input type='text' name='username' value={uname} onChange={handleUnameChange}  required />
          </div>
          <div>
            <label>Password </label>
            <input type='password' name='password' value={pword} onChange={handlePasswordChange}  required />
          </div>
        </form>
        <div>
            <p className={styles.button} type='submit' onClick={() => createNewAccount()}> Submit </p>
        </div>
        {/* insert image of sign in dog :) */}
        <div className={styles.rightSide}>
        <img id='dog' src={dog} alt='max1200'/> 
        </div>
      </div>
	);
}

export default CreateAccount;
