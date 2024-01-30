import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import dog from './max1200.jpg';


const Login = ({user, setUser}) => {
  //establish variables 
  const navigate = useNavigate();
  const [uname, setUname] = useState('');
  const [pword, setPword] = useState('');
  const handleUnameChange = (e) => setUname(e.target.value);
  const handlePasswordChange = (e) => setPword(e.target.value);

 

  const loginAccount = () => {
    //compile both variables
    let account = {
        'username': uname,
        'password': pword
      };
    //use axios to access database, finding user data
    axios.post(
        'http://127.0.0.1:5000/create-account',
        account,
        {withCredentials: true}
    //let the user know if the log in was successful or not
    ).then((response) => {
        alert(`logged in as ${response.data.current_user}`);
        setUser(response.data.current_user);
        navigate('/inventory', { replace: true });
    }).catch((err) => {
      alert(err.response.data.message);
      console.log(err);
    });
  };


  //create the form and collect the data
	return (
    <div className={styles.form}>
     <h2>SupraSign-In</h2>
     <form>
       <div>
         <label>Username </label>
         <input type='text' name='uname' value={uname} onChange={handleUnameChange} required />
       </div>
       <div>
         <label>Password </label>
         <input type='password' name='pass' value={pword} onChange={handlePasswordChange} required />
       </div>
     </form>
     <div>
        <p className={styles.button} type='submit' onClick={() => loginAccount()}> Submit </p>
      </div>
    {/* give the user an option to create an account in case they do not have one */}
     <p className={styles.buttonText} onClick={() => {navigate('/create-account', { replace: true })}}>Not registered? Create an account here!</p>
     {/* insert image of sign in dog :) */}
     <div className={styles.rightSide}>
      <img id='dog' src={dog} alt='max1200'/> 

      </div>
   </div>

	);
}



export default Login;

