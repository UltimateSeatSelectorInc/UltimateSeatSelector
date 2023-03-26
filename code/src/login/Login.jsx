import React, { useState  } from 'react';
import Navbar from '../navbar/Navbar.jsx'
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { checkIfEmpty } from "../signup/inputVal"
import './Login.css';

// function that takes in the name of a textfield and checks if they're empty and applies error styling if they are
function setEmptyErrors(fieldName) {
  const element = document.getElementById(fieldName);
  if (element) {
    element.parentElement.classList.remove("cellSign")
    element.parentElement.classList.add("cellSignError")
    document.getElementById("emptyError").classList.remove("errorShowNone")

    // remove the red border class style for each element when user enters input
    element.addEventListener("input", () => {
      element.parentElement.classList.remove("cellSignError")
      element.parentElement.classList.add("cellSign")

      const errorElements = document.querySelectorAll(".cellSignError")
      if (errorElements.length === 0) {
        document.getElementById("emptyError").classList.add("errorShowNone")
      }
    })
  }
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const listOfFields = [
    {name: 'email', value: email},
    {name: 'password', value: password},
  ];

  const handleLogIn = async () => {
    let hasErrors = false;
    
    // check if any of the fields are empty, and if so, apply error styling
    for (let i = 0; i < listOfFields.length; i++) {
      if (checkIfEmpty(listOfFields[i].value)) {
        setEmptyErrors(listOfFields[i].name);
        hasErrors = true;
      }
    }
    
    // dont login if there are errors
    if (hasErrors) {
      return;
    }
    
    const auth = getAuth()
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "/";
    } catch (error) {
      if (error) {
        document.getElementById("loginError").classList.remove("errorShowNone")
      }
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
                id = "email"
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
                id = "password"
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
        <div class = "mainbodysubtitle">
          <p class = "errorMsg errorShowNone" id = "emptyError">Error: You cannot leave the highlighted field(s) blank</p>
        </div>
        <div class = "mainbodysubtitle">
          <p class = "errorMsg errorShowNone" id = "emailInvalidError">Error: The email you entered is invalid.</p>
       
        </div>
        <div class = "mainbodysubtitle">
          <p class = "errorMsg errorShowNone" id = "loginError">Error: Invalid email or password</p>
        </div>
          
        </div>

      </div>
    );
};

export default Login;