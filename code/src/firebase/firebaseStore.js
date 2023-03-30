//This database integration is used for the user data storage.

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { auth } from "./firebase.js";
import { doc, getDoc } from 'firebase/firestore';

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
const dbstore = getFirestore(app);


export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [isInstructor, setIsInstructor] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      setUser(user);

      // check if user is signed in and email is verified
      if (user && user.emailVerified) {
        setEmailVerified(true);

        // Get the isInstructor flag from the Firestore database
        const docRef = doc(dbstore, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        setIsInstructor(docSnap.data().isInstructor);
        
      } else {
        setEmailVerified(false);
        setIsInstructor(false);
      }
    });

    return unsubscribe;
  }, [auth]);

  return { user, emailVerified, auth, isInstructor };
};

export { app, dbstore };