import React, { useState  } from 'react';
import './Signup.css';
import Navbar from '../navbar/Navbar.jsx'
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  /* TO DO (for whole project)
  - implement extensive input validation and display that to user (use firebase error msgs)
  - figure out how to get user data stored with account (first name, last name, email)
        it doesn't currently work because we are already using main node for seats.
  - implement tokens to track users throughout pages
  - implement firebase login on login page
  - implement tokens to track users through pages
  - configure verify page to send email verification and auto reroute when email verification
        is clicked (if possible... not sure now that we are not using node.js express because
        then we could make server requests every x seconds until it's clicked) otherwise just
        make seat map page protected route for logged in users.
  - configure protected routes
  - uhhh
  */

  // make sure passwords match
  const handleSignUp = async () => {
    if (password !== repeatPassword) {
      setErrorMessage("Passwords do not match.");
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

      /*
      // save the user data with the user account id
      await db.ref(`users/${user.uid}`).set({
        firstName: firstName,
        lastName: lastName,
        email: email,
      });*/

      // reroute to verify page
      //window.location.href = "/verify";
      alert("Success!")
    } catch (error) {
      alert(error.message) // using alert for now until input validation implemented
      setErrorMessage(error.message);
    }
  };

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
                    <td class = "cellSign">
                      <input 
                          class = "inputBoxSign" 
                          type = "text" 
                          id = "inputFirstName"
                          placeholder = "First name" 
                          maxlength = "100"
                          value = {firstName}
                          onChange={(e) => setFirstName(e.target.value)} >
                        </input>
                    </td>
                    <td class = "cellSign">
                      <input 
                          class = "inputBoxSign" 
                          type = "text" 
                          id = "inputLastName"
                          placeholder = "Last name" 
                          maxlength = "100"
                          value = {lastName}
                          onChange={(e) => setLastName(e.target.value)} >
                        </input>
                    </td>
                </tr>
                <tr>
                    <td colspan = "2" class = "cellSign">
                      <input 
                          class = "inputBoxSign"
                          type = "email"
                          id = "inputEmail"
                          placeholder = "Email" 
                          maxlength = "100"
                          value = {email}
                          onChange={(e) => setEmail(e.target.value)} >
                      </input>
                    </td>
                </tr>
                <tr>
                    <td colspan = "2" class = "cellSign">
                      <input 
                          class = "inputBoxSign" 
                          type = "password" 
                          id = "inputPassword"
                          placeholder = "Password"
                          maxlength = "100"
                          onChange={(e) => setPassword(e.target.value)} >
                      </input>
                    </td>
                </tr>
                <tr>
                    <td colspan = "2" class = "cellSign">
                      <input 
                          class = "inputBoxSign" 
                          type = "password" 
                          id = "inputRepeatPassword"
                          placeholder = "Repeat password" 
                          maxlength = "100"
                          onChange={(e) => setRepeatPassword(e.target.value)} >
                        </input>
                    </td>
                </tr>
                <tr>
                    <td colspan = "2"><button class = "signupButton" onClick={() => { handleSignUp() }}>Continue</button></td>
                </tr>
          </table>
        
      </div>

    </div>
  );
};

export default SignUp;