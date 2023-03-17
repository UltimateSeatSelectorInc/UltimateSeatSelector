import React, { useState  } from 'react';
import Navbar from '../navbar/Navbar.jsx'
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogIn = async () => {
    const auth = getAuth()
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("hi")
        alert('Logged in successfully!');
    } catch (error) {
        console.error('Error logging in:', error);
      }
    };

    return(

      <div className = "signupstyle">

        <Navbar isActive = { true } />

        <div className = "maintitle">
          <h1>Login</h1>
        </div>

        <div className = "mainbody">
          <div className = "mainbodytitle">
            <p>Let's get you logged in</p>
          </div>
          <div className = "mainbodysubtitle">
            <p>Please enter your email and password to sign into Ultimate Seat Selector,
              or <strong><a href="/signup">Sign Up</a></strong>.
            </p>
          </div>

            <table className = "inputTableLog">
                <tr>
                  <td className = "cellSign">
                        <input 
                            className = "inputBoxSign"
                            type = "string"
                            id = "inputEmail"
                            placeholder = "Email" 
                            maxLength = "100"
                            value = {email}
                            onChange={(e) => setEmail(e.target.value)} >
                        </input>
                      </td>
                  </tr>
                  <tr>
                      <td className = "cellSign">
                        <input 
                            className = "inputBoxSign" 
                            type = "password" 
                            id = "inputPassword"
                            placeholder = "Password" 
                            maxLength = "100"
                            onChange={(e) => setPassword(e.target.value)} >
                        </input>
                      </td>
                  </tr>
                  <tr>
                      <td ><button className = "signupButton" onClick={() => { handleLogIn() }}>Login</button></td>
                  </tr>
                  
            </table>
          <div className = "bottomtext">
              <p></p>
          </div>
          
        </div>

      </div>
    );
};

export default Login;