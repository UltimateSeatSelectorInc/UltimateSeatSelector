import React from 'react';
import Navbar from '../navbar/Navbar.jsx'
import { auth } from "../firebase/firebase";
import { sendEmailVerification } from "firebase/auth"; 
import './Verify.css';
import { getDoc, deleteDoc, setDoc, doc} from "firebase/firestore";
import { collection, where, getDocs, query } from "firebase/firestore";
import { dbstore } from "../firebase/firebaseStore";


/* function that sends verification email, then checks every 3 seconds for the user
to verify their email. Once verified, it redirects them to the home page automatically. */
async function sendVerification() {
  try {
    const user = auth.currentUser;
    if (user) {
      if (user.emailVerified) { // don't send email if they are already verified, and display msg
        var showAlreadyVMsg = document.getElementById("alreadyVerifiedMsg")
        showAlreadyVMsg.style.display = "block"
      } else {
        sendEmailVerification(auth.currentUser).then(() => {
          const intervalId = setInterval(() => {
            user.reload().then(async () => {
              if (user.emailVerified) {
                clearInterval(intervalId);
                console.log("User email verified");
                const querySnapshot = await getDocs(collection(dbstore, "instructorInvites"));
                const deletePromises = []; // To store deletion promises

                querySnapshot.forEach((doc) => {
                  const data = doc.data();
                  console.log("Checking invite:", data.email, user.email);
                  if (data.email === user.email) {
                    console.log("Deleting invite");
                    const deletePromise = deleteDoc(doc.ref);
                    deletePromises.push(deletePromise); // Add deletion promise to the array
                  }
                });

                // Wait for all deletion promises to resolve
                await Promise.all(deletePromises);
                console.log("Rerouting now");
                window.location.href = "/";
              } else {
                console.log("User email not verified");
              }
            }).catch((error) => {
              console.log(error);
            });
          }, 3000);
        });        
        var showMessage = document.getElementById("emailSentMsg");
        showMessage.style.display = "block";
      }
    } else {
      alert("User not signed in.");
    }
  } catch (error) {
    alert(error.message)
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
              in the email to gain access! Please allow up to 5 minutes, and don't forget
                to check your spam folder!</p>
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