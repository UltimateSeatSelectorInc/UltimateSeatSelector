// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import React from 'react';
import firebase from firebase;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Our web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBehKF152E5XJdsZf-Yzj5PBaX3DOiFeRk",
  authDomain: "ultimate-seat-selector-15f36.firebaseapp.com",
  databaseURL: "https://ultimate-seat-selector-15f36-default-rtdb.firebaseio.com",
  projectId: "ultimate-seat-selector-15f36",
  storageBucket: "ultimate-seat-selector-15f36.appspot.com",
  messagingSenderId: "167830181105",
  appId: "1:167830181105:web:d497c2636b8edba5088550",
  measurementId: "G-G8QNWC8T4R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function Maploader(){
    return(
        <div>
 
       </div>
   )
}
 
export default Maploader