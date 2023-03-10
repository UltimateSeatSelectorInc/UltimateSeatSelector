import React from 'react';
import Navbar from '../navbar/Navbar.jsx'
import './Verify.css';

function Verify() {
    return (
  
      <div class = "signupstyle">
  
        <Navbar />
  
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
                or <strong><a href="/signup">Sign Up</a></strong>.
            </p>
          </div>
  
            <table class = "inputTableLog">
                  <tr>
                      <td><button class = "verifyButton" onClick={() => { }}>Verify</button></td>
                  </tr>
            </table>
        </div>
  
      </div>
    );
  };
  
  export default Verify;