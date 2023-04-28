import { React, useState, useEffect } from 'react';
import { doc, getDoc, deleteDoc } from 'firebase/firestore'
import { dbstore } from "../firebase/firebaseStore";
import Navbar from '../navbar/Navbar.jsx'
import './account.css';
import { auth } from "../firebase/firebase";
import { EmailAuthProvider, onAuthStateChanged, sendPasswordResetEmail, deleteUser, reauthenticateWithCredential } from 'firebase/auth';
function Account() {
  const [ firstName, setFirstName ] = useState(''); // react state for name
  const [ accountID, setAccountID ] = useState(''); // react state for account uid
  const [ reAuthPassword, setReAuthPassword ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ user, setUser ] = useState('')
  
  
  // block of code to check user and set firstName
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        setAccountID(user.uid) // get account uid for other functions
        const userRef = doc(dbstore, 'users', user.uid);
        getDoc(userRef).then((doc) => {
          if (doc.exists()) {
            const data = doc.data();
            setFirstName(data.First_Name); // set the first name
            setEmail(data.Email)
          }
        }).catch((error) => {
          console.error('Error getting account', error);
        });
      }
    });
  
    return () => unsubscribe();
  }, []);

  // reset the user's password given uid
  function resetPassword() {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('SENT PASSWORD RESET EMAIL');
        document.getElementById("successMsg").classList.remove("showNone")
        document.getElementById("confirmDeleteContent").classList.add("showNone")
      })
      .catch((error) => {
        console.log('Error resetting password:', error);
      });
  };

  // show the delete account elements
  function showConfirmDelete() {
    document.getElementById("confirmDeleteContent").classList.remove("showNone")
  }


  // delete both user account and firestore data
  function deleteAccount() {

    // make references
    const userDocRef = doc(dbstore, "users", accountID);
    const credential = EmailAuthProvider.credential(email, reAuthPassword)

    // if there is a password
    if (reAuthPassword != "") {
      // attempt to reauthenticate user for deletion purposes
      reauthenticateWithCredential(user, credential)
        .then(() => {
          console.log("RE-AUTHENTICATION SUCCESSFUL")
          // delete user document
          deleteDoc(userDocRef)
            .then(() => {
              console.log("Firestore document for: ", email, "successfully deleted");
                
              // delete authentication account
              deleteUser(user, accountID)
                .then(() => {
                  console.log("Firebase account for: ", email, "successfully deleted");
                  
                  // sign out the user
                  auth.signOut()
                    .then(() => {
                      window.location.href = "/login";
                      console.log("User signed out successfully");

                    })
                    .catch((error) => {
                      console.log("Error signing out the user:", error);
                    });
                })
                .catch((error) => {
                  console.log("Error deleting account:", error);
                });
            })
            .catch((error) => {
              console.log("Error deleting firestore document:", error);
            });
        })
        .catch((error) => { // set error messaging and styling
          console.log("Error reauthenticating user:", error);
          if (error == "FirebaseError: Firebase: Error (auth/wrong-password).") {
            document.getElementById("confirmPassInput").classList.remove("cellSign")
            document.getElementById("confirmPassInput").classList.add("cellSignError")
            document.getElementById("errorMsg").innerHTML = "Error: Invalid Password"
            document.getElementById("errorMsg").classList.remove("showNone")
        
            document.getElementById("confirmPassInput").addEventListener("input", () => {
              document.getElementById("confirmPassInput").classList.remove("cellSignError")
              document.getElementById("confirmPassInput").classList.add("cellSign")
              document.getElementById("errorMsg").classList.add("showNone")
            });
          }
        })
        
    } else {
      console.log("No password entered");
    }
  }

    return (
  
      <div className = "signupstyle">
  
        <Navbar isActive = { true } />
  
        <div className = "maintitle">
          <h1>Account</h1>
        </div>
  
        <div className = "mainbody">
          <div className = "mainbodytitle">
            <p>Welcome, {firstName}. </p>
          </div>
          <div className = "mainbodysubtitle">
            <p>What would you like to do with your account? Here, you can either reset your password
              or delete your account completely.<br></br><br></br>Warning: Deleting your account is permanent and
              cannot be undone.
            </p>
            <button className = "accountButtons submitButton" onClick={() => { resetPassword()}}>Reset Password</button>
            <button className = "accountButtons submitButton" onClick={() => { showConfirmDelete() }}>Delete Account</button>
          </div>

          <div id = "confirmDeleteContent" className = "showNone" >
     
            <div className = "mainbodysubtitle">
            <table className = "inputTableLog">
            <tr>
              <td id = "confirmPassInput" className = "cellSign">
                <input 
                  className = "inputBoxSign"
                  type = "password"
                  id = "confirmPasswordInput"
                  placeholder = "Confirm Password"
                  maxLength = "100"
                  value = {reAuthPassword}
                  onChange={(e) => setReAuthPassword(e.target.value)} >
                </input>
              </td>
            </tr>
            </table>

            <div className = "centeredContent">
              <button className = " accountButtons redButton submitButton" onClick={() => { deleteAccount() }}>Confirm Delete</button>
            </div>

            </div>
          </div>

          <div class = "mainbodysubtitle">
            <p class = "errorMsg showNone" id = "errorMsg">Error: </p>
          </div>

          <div className = "centeredContent mainbodysubtitle">
            <p class = "successMsg showNone" id = "successMsg">Success: Password reset email sent</p>
          </div>
          
        </div>
      </div>
    );
  };
  
  export default Account;