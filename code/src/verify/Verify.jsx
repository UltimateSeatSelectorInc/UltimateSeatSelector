import React from 'react';
import Navbar from '../navbar/Navbar.jsx'
import { auth } from "../firebase/firebase";
import { sendEmailVerification } from "firebase/auth"; 
import './Verify.css';


/* function that sends verification email, then checks every 3 seconds for the user
to verify their email. Once verified, it redirects them to the home page. */
function sendVerification() {

  try {
    const user = auth.currentUser;

    if (user) {
      if (user.emailVerified) { // display special message if they are already verified
        var showAlreadyVMsg = document.getElementById("alreadyVerifiedMsg")
        showAlreadyVMsg.style.display = "block"
      } else {
        // Send verification email
        sendEmailVerification(auth.currentUser)
          .then(() => {
            const intervalId = setInterval(() => { // set timer
              user.reload()
                .then(() => {
                  if (user.emailVerified) { // if it's verified
                    // clear the interval and redirect to the home page
                    clearInterval(intervalId);
                    window.location.href = "/";
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            }, 3000); // Check verification status every 3 seconds
          })

        // display the "message sent" text
        var showMessage = document.getElementById("emailSentMsg");
        showMessage.style.display = "block";
      }
    } else {
      alert("User not signed in.");
    }

  } catch (error) {
    alert(error.message) // for dev... make more meaningful later
  }
}
function Verify() {
    return (
  
      <div class = "signupstyle">
  
        <Navbar isActive = { false } />
  
        <div class = "maintitle">
          <h1>Verify</h1>
        </div>
  
        <div class = "mainbody">
          <div class = "mainbodytitle">
            <p>Verify your email</p>
          </div>
          <div class = "mainbodysubtitle">
            <p>Click 'Verify' to send a verification email to the address you provided.
                Once the link is clicked, you will be re-routed and have full access to USS,
                or <strong><a href="/signup">Sign Up</a></strong>. <br></br><br></br>
            </p>
          </div>

            <table class = "inputTableLog">
                  <tr>
                      <td><button class = "verifyButton" onClick={() => { sendVerification() }}>Verify</button></td>
                  </tr>
            </table>

            <div class = "mainbodysubtitle">
              <p class = "emailMessage" id = "emailSentMsg">Email sent! Check your inbox. Click the link 
              in the email to gain access!</p>
            </div>

            <div class = "mainbodysubtitle">
              <p class = "emailMessage" id = "alreadyVerifiedMsg">You have already been verified. Please
              navigate to the <strong><a href="/">Seat Map</a></strong></p>
            </div>

        </div>
  
      </div>
    );
  };
  
  export default Verify;