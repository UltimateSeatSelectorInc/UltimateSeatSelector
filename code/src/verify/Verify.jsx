import React from 'react';
import Navbar from '../navbar/Navbar.jsx'
import './Verify.css';

function emailMessage() {
  var showMessage = document.getElementById("emailSentMsg");
  showMessage.style.display = "block"
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
                      <td><button class = "verifyButton" onClick={() => { emailMessage() }}>Verify</button></td>
                  </tr>
            </table>

            <div class = "mainbodysubtitle">
              <p class = "emailMessage" id = "emailSentMsg">Email sent! Check your inbox.</p>
            </div>

        </div>
  
      </div>
    );
  };
  
  export default Verify;