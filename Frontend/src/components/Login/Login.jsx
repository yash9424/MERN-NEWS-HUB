import React, { useState } from 'react';
import {styles} from './index';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {


    const [inputData,setInputData] = useState({
        username:"",
        password:"",
    });
    const navigate  = useNavigate();

    const handleInput = (even) => {

        setInputData({...inputData,[even.target.name]: even.target.value}) 

    }

    const submitFrom = async (event) => {

        console.log(inputData);
        event.preventDefault();
  

            const data = {
                username:inputData.username,
                password:inputData.password
            }

            console.log(data);


            try {
                console.log('jelo')
                const response = await axios.post('http://localhost:8080/login',data);
                console.log(response.data);

                if(response.data.username){
                    localStorage.setItem('userName', response.data.username);
                    navigate('/');
                    
                }
                alert(response.data.message);
            } catch (error) {
                console.log(error.message);
            }


        
    }



    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h3 style={styles.formTitle}>login now</h3>
                <form onSubmit={submitFrom}>
                    <input type="email" name="username" onChange={handleInput} value={inputData.username} required placeholder="enter your email" style={styles.input} />
                    <input type="password" name="password" onChange={handleInput} value={inputData.password} required placeholder="enter your password" style={styles.input} />
                    <input type="submit" name="submit" value="login now" className="form-btn" style={styles.formBtn} />
                </form>
                <p style={styles.formText}>don't have an account? <a href="/user/register" style={styles.formLink}>register now</a></p>
                {/* If using Google sign-in, include your Google sign-in component here */}
            </div>
        </div>
    );
}

export default Login;
