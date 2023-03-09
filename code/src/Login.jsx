import React from 'react';
import Navbar from './Navbar.jsx'
import './Login.css';

function Login() {
  return (

    <div class = "signupstyle">

      <Navbar />


      <div class = "maintitle">
        <h1>Login</h1>
      </div>

      <div class = "mainbody">
        <div class = "mainbodytitle">
          <p>Let's get you logged in</p>
        </div>
        <div class = "mainbodysubtitle">
          <p>Please enter your email and password to sign into Ultimate Seat Selector.</p>
        </div>


          <table class = "inputTableLog">
                <tr>
                    <td class = "cellLog"><input class = "InputBoxLog" type = "email" id = "inputName"
                        placeholder = "Email" maxlength = "100"></input></td>
                </tr>
                <tr>
                    <td class = "cellLog"><input class = "InputBoxLog" type = "password" id = "inputEmail"
                        placeholder = "Password" maxlength = "100"></input></td>
                </tr>
                <tr>
                    <td><button class = "loginButton" onClick={() => { }}>Login</button></td>
                </tr>
          </table>
        <div class = "bottomtext">
            <p><a href="/signup">Sign Up</a></p>
        </div>
        
      </div>

    </div>
  );
};

export default Login;