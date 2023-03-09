import React from 'react';
import './Signup.css';
import Navbar from './Navbar.jsx'

function SignUp() {
  return (

    <div class = "signupstyle">

      <Navbar />


      <div class = "maintitle">
        <h1>Signup</h1>
      </div>

      <div class = "mainbody">
        <div class = "mainbodytitle">
          <p>Let's sign you up</p>
        </div>
        <div class = "mainbodysubtitle">
          <p>Signup to Utimate Seat Selector with an email and password. You will
            receive an email to verify your account.
          </p>
        </div>

          <table class = "inputTableSign">
                <tr>
                    <td class = "cellSign"><input class = "InputBoxSign" type = "email" id = "inputName"
                        placeholder = "Your email" maxlength = "100"></input></td>
                </tr>
                <tr>
                    <td class = "cellSign"><input class = "InputBoxSign" type = "password" id = "inputEmail"
                        placeholder = "A strong password" maxlength = "100"></input></td>
                </tr>
                <tr>
                    <td class = "cellSign"><input class = "InputBoxSign" type = "password" id = "inputEmail"
                        placeholder = "Repeat password" maxlength = "100"></input></td>
                </tr>
                <tr>
                    <td><a href="/verify"><button class = "signupButton" onClick={() => { }}>Continue</button></a></td>
                </tr>
          </table>
        
      </div>

    </div>
  );
};

export default SignUp;