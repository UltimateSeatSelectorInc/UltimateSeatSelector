import React, { useState } from 'react';
import { checkIfEmpty, checkIfEmailValid, checkIfPasswordValid } from '../signup/inputVal';
import { setEmptyErrors, setFieldErrors } from '../signup/Signup';
import { auth, dbstore } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Navbar from '../navbar/Navbar.jsx'
import { setDoc, doc } from "firebase/firestore";

function AddInstructor() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSignUp = async () => {
    let hasErrors = false;

    const listOfFields = [
      { name: 'firstName', value: firstName },
      { name: 'lastName', value: lastName },
      { name: 'email', value: email },
      { name: 'password', value: password },
      { name: 'repeatPassword', value: repeatPassword },
    ];
    // some simple string manipulation to make names proper (with support for apostraphe's)
    const firstNameCap = ((firstName.charAt(0).toUpperCase()) + firstName.substring(1).toLowerCase())
    let lastNameCap = ((lastName.charAt(0).toUpperCase()) + lastName.substring(1).toLowerCase())
    const apostropheIndex = lastNameCap.indexOf("'")
    if (apostropheIndex > 0 && apostropheIndex < lastNameCap.length - 1) {
      const lastNameCapArray = lastNameCap.split('')
      lastNameCapArray[apostropheIndex+1] = lastNameCapArray[apostropheIndex+1].toUpperCase()
      lastNameCap = lastNameCapArray.join('')
    }
    for (let i = 0; i < listOfFields.length; i++) {
      if (checkIfEmpty(listOfFields[i].value)) {
        setEmptyErrors(listOfFields[i].name);
        hasErrors = true;
      }
    }

    if (checkIfEmailValid(email) === false) {
      setFieldErrors('email');
      hasErrors = true;
    }
    if (checkIfPasswordValid(password) === false) {
      setFieldErrors('password');
      hasErrors = true;
    }
    if (password !== repeatPassword) {
      setFieldErrors('repeatPassword');
      hasErrors = true;
    }

    if (hasErrors === true) {
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
        Email: email,
        isInstructor: true
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
        <h1>Add Instructor</h1>
      </div>

      <div className = "mainbody">
        <div className = "mainbodytitle">
          <p>Let's add another instructor</p>
        </div>
        <div className = "mainbodysubtitle">
          <p>Please enter valid credentials to add a fellow instructor :
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

export default AddInstructor;
