import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import patch from './Supra_coder_logo-removebg-preview.png';

//sets background color to silver
document.body.style = 'background: silver;';

const Home = () => {
    const navigate = useNavigate();

	return (
        //format welcome text and button to left side
        //then formats welcome image to the right side
        <div className={styles.baseHome}>
            <div className={styles.leftSide}>
                <h1 className={styles.titleText}>SupraSystems&lt;.inventory&gt;</h1>
                <button className={styles.browseButton} onClick={() => {navigate('/inventory', { replace: true })}}>View inventory</button> 
            </div>
            <div className={styles.rightSide}>
            <img id='patch' src={patch} alt='./Supra_coder_logo-removebg-preview.png'/> 

            </div>
        </div>
	);
}

export default Home;
