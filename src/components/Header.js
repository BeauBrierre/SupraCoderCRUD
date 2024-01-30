import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

const Header = ({user, setUser}) => {
	const navigate = useNavigate();
	//confirm the user actually wants to sign out
	const handleLogout = () => {
		if (window.confirm('Do you want to log out?')){
			setUser('');
			navigate('/', { replace: true })
		}
	};

	//function to guide login/out prompts
	const handleLoginText = () => {
		//if no one is signed in, once the sign in option is clicked, direct user to sign in page
		if (user === ''){
			return <p className={styles.textRight} onClick={() => {navigate('/login', { replace: true })}}>SupraSign-In</p>
		}
		//if someone is signed in, once the username section is clicked, prompt to sign out or not
		else{
			return <p className={styles.textRight} onClick={() => handleLogout()}>{user}</p>
		}
	};

	return (
		//carry out login/out prompts 
        <div className={styles.baseHeader}>
			<div>
				{handleLoginText()}
				<p className={styles.text} onClick={() => {navigate('/', { replace: true })}}>SupraHome</p>
			</div>
        </div>
	);
}

export default Header;
