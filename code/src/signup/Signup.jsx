import React from 'react';
import './Signup.css';
import Navbar from '../navbar/Navbar.jsx'

function SignUp() {
  return (

    <div class = "signupstyle">

      <Navbar isActive = { true } />

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
                    <td class = "cellSign"><input class = "inputBoxSign" type = "text" id = "inputEmail"
                        placeholder = "First name" maxlength = "100"></input></td>
                    <td class = "cellSign"><input class = "inputBoxSign" type = "text" id = "inputEmail"
                        placeholder = "Last name" maxlength = "100"></input></td>
                </tr>
                <tr>
                    <td colspan = "2" class = "cellSign"><input class = "inputBoxSign" type = "email" id = "inputName"
                        placeholder = "Email" maxlength = "100"></input></td>
                </tr>
                <tr>
                    <td colspan = "2" class = "cellSign"><input class = "inputBoxSign" type = "password" id = "inputEmail"
                        placeholder = "Password" maxlength = "100"></input></td>
                </tr>
                <tr>
                    <td colspan = "2" class = "cellSign"><input class = "inputBoxSign" type = "password" id = "inputEmail"
                        placeholder = "Repeat password" maxlength = "100"></input></td>
                </tr>
                <tr>
                    <td colspan = "2"><a href="/verify"><button class = "signupButton" onClick={() => { }}>Continue</button></a></td>
                </tr>
          </table>
        
      </div>

    </div>
  );
};

export default SignUp;