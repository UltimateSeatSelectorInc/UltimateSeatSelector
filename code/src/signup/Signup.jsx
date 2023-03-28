import React, { useState  } from 'react';
import './Signup.css';
import Navbar from '../navbar/Navbar.jsx'
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore"; 
import { dbstore } from "../firebase/firebaseStore";
import { checkIfEmpty, checkIfEmailValid, checkIfPasswordValid } from "./inputVal"

// function to add a red border to the inputs if there are errors
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

// sets errors based on provided fieldIDs
function setFieldErrors(fieldName) {
  const element = document.getElementById(fieldName);
  if (element) {
    element.parentElement.classList.remove("cellSign")
    element.parentElement.classList.add("cellSignError")
    if (fieldName == "email") {
      document.getElementById("emailInvalidError").classList.remove("errorShowNone")
    }
    if (fieldName == "password") {
      document.getElementById("passwordInvalidError").classList.remove("errorShowNone")
    }
    if (fieldName == "repeatPassword") {
      document.getElementById("passwordsDontMatch").classList.remove("errorShowNone")
    }
      
    element.addEventListener("input", () => {
      if (fieldName == "email") {
        document.getElementById("emailInvalidError").classList.add("errorShowNone")
      }
      if (fieldName == "password") {
        document.getElementById("passwordInvalidError").classList.add("errorShowNone")
      }
      if (fieldName == "repeatPassword") {
        document.getElementById("passwordsDontMatch").classList.add("errorShowNone")
      }
      
      element.parentElement.classList.remove("cellSignError")
      element.parentElement.classList.add("cellSign")
    })
  }
}

// function that handles signing up
function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // some simple string manipulation to make names proper (with support for apostraphe's)
  const firstNameCap = ((firstName.charAt(0).toUpperCase()) + firstName.substring(1).toLowerCase())
  let lastNameCap = ((lastName.charAt(0).toUpperCase()) + lastName.substring(1).toLowerCase())
  const apostropheIndex = lastNameCap.indexOf("'")
  if (apostropheIndex > 0 && apostropheIndex < lastNameCap.length - 1) {
    const lastNameCapArray = lastNameCap.split('')
    lastNameCapArray[apostropheIndex+1] = lastNameCapArray[apostropheIndex+1].toUpperCase()
    lastNameCap = lastNameCapArray.join('')
  }

  const listOfFields = [
    {name: 'firstName', value: firstName},
    {name: 'lastName', value: lastName},
    {name: 'email', value: email},
    {name: 'password', value: password},
    {name: 'repeatPassword', value: repeatPassword}
  ];

  const handleSignUp = async () => {
    let hasErrors = false;
    
    // check if any of the fields are empty, and if so, apply error styling
    for (let i = 0; i < listOfFields.length; i++) {
      if (checkIfEmpty(listOfFields[i].value)) {
        setEmptyErrors(listOfFields[i].name);
        hasErrors = true; // set the flag to true if an error is found
      }
    }
    
    // check if email, password, and repeat password are valid
    if (checkIfEmailValid(email) === false) {
      setFieldErrors("email");
      hasErrors = true;
    }
    if (checkIfPasswordValid(password) === false) {
      setFieldErrors("password");
      hasErrors = true;
    }
    if (password !== repeatPassword) {
      setFieldErrors("repeatPassword");
      hasErrors = true;
    }
  
    if (hasErrors === true) { // if there are errors, do not create the user
      return;
    }

    // try to create a user with the function
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      //Creates a new document in the database for the user's account details.
      const docRef = await setDoc(doc(dbstore, "users", user.uid), {
        First_Name: firstNameCap,
        Last_Name: lastNameCap,
        Email: email
      });

      // reroute to verify page
      window.location.href = "/verify";
    } catch (error) {
      if (error == "FirebaseError: Firebase: Error (auth/email-already-in-use).") {
        document.getElementById("emailInUseError").classList.remove("errorShowNone")
      } else {
        document.getElementById("signupError").classList.remove("errorShowNone")
      }
      
    }
  };

  return (

    <div className = "signupstyle">

      <Navbar isActive = { true } />

      <div className = "maintitle">
        <h1>Signup</h1>
      </div>

      <div className = "mainbody">
        <div className = "mainbodytitle">
          <p>Let's sign you up</p>
        </div>
        <div className = "mainbodysubtitle">
          <p>Signup to Utimate Seat Selector with an email and password. You will
            receive an email to verify your account. Are you an instructor?
            Contact an administrator.
          </p>
        </div>

          <table className = "inputTableSign">
                <tr>
                    <td className = "cellSign">
                      <input 
                          className = "inputBoxSign" 
                          type = "text" 
                          id = "firstName"
                          placeholder = "First name" 
                          maxLength = "100"
                          value = {firstName}
                          onChange={(e) => setFirstName(e.target.value)} >
                        </input>
                    </td>
                    <td className = "cellSign">
                      <input 
                          className = "inputBoxSign" 
                          type = "text" 
                          id = "lastName"
                          placeholder = "Last name" 
                          maxLength = "100"
                          value = {lastName}
                          onChange={(e) => setLastName(e.target.value)} >
                        </input>
                    </td>
                </tr>
                <tr>
                    <td colSpan = "2" className = "cellSign">
                      <input 
                          className = "inputBoxSign"
                          type = "email"
                          id = "email"
                          placeholder = "Email" 
                          maxLength = "100"
                          value = {email}
                          onChange={(e) => setEmail(e.target.value)} >
                      </input>
                    </td>
                </tr>
                <tr>
                    <td colSpan = "2" className = "cellSign">
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
                    <td colSpan = "2" className = "cellSign">
                      <input 
                          className = "inputBoxSign" 
                          type = "password" 
                          id = "repeatPassword"
                          placeholder = "Repeat password" 
                          maxLength = "100"
                          onChange={(e) => setRepeatPassword(e.target.value)} >
                        </input>
                    </td>
                </tr>
                <tr>
                    <td colSpan = "2"><button className = "signupButton" onClick={() => { handleSignUp() }}>Continue</button></td>
                </tr>

                
          </table>

          <div class = "mainbodysubtitle">
              <p class = "errorMsg errorShowNone" id = "emptyError">Error: You cannot leave the highlighted field(s) blank</p>
          </div>
          <div class = "mainbodysubtitle">
              <p class = "errorMsg errorShowNone" id = "emailInvalidError">Error: The email you entered is invalid.</p>
          </div>
          <div class = "mainbodysubtitle">
              <p class = "errorMsg errorShowNone" id = "passwordInvalidError">Error: Password must be at least 8
              characters, include one uppercase letter, one lowercase, a number, and a special character</p>
          </div>
          <div class = "mainbodysubtitle">
              <p class = "errorMsg errorShowNone" id = "passwordsDontMatch">Error: Passwords do not match</p>
          </div>
          <div class = "mainbodysubtitle">
          <p class = "errorMsg errorShowNone" id = "emailInUseError">Error: This email is already in use!</p>
          </div>
          <div class = "mainbodysubtitle">
          <p class = "errorMsg errorShowNone" id = "signupError">Error: Could not sign you up: Contact administrator</p>
          </div>

      </div>

    </div>
  );
};

export default SignUp;