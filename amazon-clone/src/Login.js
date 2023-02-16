import React from 'react'
import "./Login.css"
import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react';
import { SignalCellular0Bar } from '@mui/icons-material';
import { auth } from './firebase.js'
function Login() {
    const history = useHistory();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const signIn= e=>{
        e.preventDefault();
        auth
          .signInWithEmailAndPassword(email,password)
          .then((auth) =>{
            if(auth){
                history.push('/')
            }
          })
          .catch(error => alert(error.message))
          
    }
    const register=(e) =>{
        e.preventDefault();
        auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
            // it successfully created a new user with email and password
            if (auth) {
                history.push('/')
            }
            
        })
        .catch(error => alert(error.message))
    }
  return (
    <div className='loginpage'>
    <Link to='/'>
        <img className='login_logo' src='/amazon.jpeg'></img>
        </Link>
        <div className='Login_container'>
            <h1>Sign in</h1>

            <form>
            <h5>E-mail</h5>
            <input type='text' value={email} onChange = {e => setEmail(e.target.value)}></input>

            <h5 className='login_password'>Password</h5>
            <input type='password' value={password} onChange = {e => setPassword(e.target.value)}></input>
            <button type='submit' onClick={signIn} >Sign in</button>
            <p>
            By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
            see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
            </p>
            <button onClick={register}>create a new account</button>
            </form>
        </div>
    </div>
  )
}

export default Login
