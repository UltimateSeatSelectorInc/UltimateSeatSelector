import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Maploader from './Maploader.jsx';
import SignUp from './signup/Signup.jsx';
import Login from './login/Login.jsx';
import About from './about/About.jsx';
import Verify from './verify/Verify.jsx';
import Account from './account/account.jsx';
import Instructor from './instructor/Instructor.jsx';
import Addinstructor from './addinstructor/AddInstructor.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Protected, Protected2 } from './protected/protected.jsx'
import { useAuth, dbstore } from "./firebase/firebaseStore";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from 'react'

function App() {
  const { user, isInstructor } = useAuth();
  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
    if (user) {
      const userRef = doc(dbstore, 'users', user.uid);
      getDoc(userRef).then((doc) => {
        if (doc.exists()) {
          const data = doc.data();
          if (data.First_Name != null) {
            setIsSignedIn(true);
          }
        } else {
          setIsSignedIn(false);
        }
      })
    }
  }, [user]);

  return (
  <BrowserRouter>
        <Routes>
          <Route path="/about" element={<About/>} />
          <Route
            path="/login"
            element={
              <Protected2 isSignedIn={isSignedIn}>
                <Login />
              </Protected2>
            }
          />
          <Route
            path="/signup"
            element={
              <Protected2 isSignedIn={isSignedIn}>
                <SignUp />
              </Protected2>
            }
          />
          <Route
            path="/"
            element={
              <Protected isSignedIn={isSignedIn}>
                <Maploader />
              </Protected>
            }
          />
            <Route
            path="/account"
            element={
              <Protected isSignedIn={isSignedIn}>
                <Account />
              </Protected>
            }
          />
          <Route
            path="/verify"
            element={
              <Protected isSignedIn={isSignedIn}>
                <Verify />
              </Protected>
            }
          />
          <Route
            path="/instructor"
            element={
              <Protected isInstructor={isInstructor}>
                <Instructor />
              </Protected>
            }
          />
          <Route
            path="/addinstructor"
            element={
              <Protected isInstructor={isInstructor}>
                <Addinstructor />
              </Protected>
            }
          />
        </Routes>
  </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
//  <React.StrictMode>
    <App />
//  </React.StrictMode>
);
export default App;