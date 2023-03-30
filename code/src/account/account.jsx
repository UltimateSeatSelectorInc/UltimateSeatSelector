import { React, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore'
import { dbstore } from "../firebase/firebaseStore";
import Navbar from '../navbar/Navbar.jsx'
import './account.css';
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from 'firebase/auth';

function Account() {
  const [ firstName, setFirstName ] = useState(''); // react state for name
  
  // block of code to check user and set firstName
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userRef = doc(dbstore, 'users', user.uid);
      getDoc(userRef).then((doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setFirstName(data.First_Name);
        }
      }).catch((error) => {
        console.error('Error getting account', error);
      });
    }
  });

    return (
  
      <div class = "signupstyle">
  
        <Navbar isActive = { true } />
  
        <div class = "maintitle">
          <h1>Account</h1>
        </div>
  
        <div class = "mainbody">
          <div class = "mainbodytitle">
            <p>Welcome, {firstName}. </p>
          </div>
          <div class = "mainbodysubtitle">
            <p>What would you like to do with your account?
            </p>
          </div>
        </div>
  
      </div>
    );
  };
  
  export default Account;