import { React, useState } from 'react';
import { doc, getDoc, deleteDoc } from 'firebase/firestore'
import { dbstore } from "../firebase/firebaseStore";
import Navbar from '../navbar/Navbar.jsx'
import './account.css';
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, sendPasswordResetEmail, deleteUser } from 'firebase/auth';

function Account() {
  const [ firstName, setFirstName ] = useState(''); // react state for name
  const [ accountID, setAccountID ] = useState(''); // react state for account uid
  const [ email, setEmail ] = useState('')
  const [ user, setUser ] = useState('')
  
  
  // block of code to check user and set firstName
  onAuthStateChanged(auth, (user) => {
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

  // reset the user's password given uid
  function resetPassword() {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('SENT PASSWORD RESET EMAIL');
      })
      .catch((error) => {
        console.log('Error resetting password:', error);
      });
  };

  
  function deleteAccount() {

    /*
    const userDocRef = doc(dbstore, "users", accountID);

    deleteDoc(userDocRef);

    deleteUser(user, accountID).then(() => {

      auth.signOut()
      console.log(email, "DELETED SUCCESSFULLY");
    }).catch((error) => {
      console.error("Error deleting user:", error);
    });

    Not deleting user document yet, need to fix.
    Also need to add messages that state it has been done
    and popups that ask the user if they are sure
    

*/
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
            <p>What would you like to do with your account? You've got some options...
            </p>
            <button className = "accountButtons submitButton" onClick={() => { resetPassword()}}>Reset Password</button>
            <button className = "accountButtons redButton submitButton" onClick={() => { deleteAccount() }}>Delete Account</button>
          </div>
          
        </div>
      </div>
    );
  };
  
  export default Account;