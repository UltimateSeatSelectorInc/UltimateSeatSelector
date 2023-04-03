// navbar component to be rendered on each page
import React, { useState, useEffect } from 'react';
import { useAuth, dbstore } from "../firebase/firebaseStore";
import { doc, getDoc } from "firebase/firestore";
import './Navbar.css';
const { Link } = require("react-router-dom");

const Navbar = (props) => {
  const { isActive = true } = props;
  const { user, auth, isInstructor } = useAuth();
  const [ firstName, setFirstName ] = useState('');
  const [ email, setEmail ] = useState('');
  
  // simple hook to get the firstname from the current user utilizing useAuth
  useEffect(() => {
    if (user) {
      const userRef = doc(dbstore, 'users', user.uid);
      getDoc(userRef).then((doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setFirstName(data.First_Name);
          setEmail(data.Email); // declared for console logs
        }
      }).catch((error) => {
        console.error('Error getting account', error);
      });
    }
  }, [user]);

  // function to use authobject to signout utilizing useAuth
  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log(email + " has been signed out"); // log user's email that has signed out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  const showInstructor = isInstructor;

return (
    <nav className="navbar">
    <div className="navbar-title">Ultimate Seat Selector</div>
    <ul className="navbar-nav">
    <li className="nav-item">
      <Link to="/instructor" className="nav-link" style={{ display: showInstructor ? "block" : "none" }}>Instructor</Link>
    </li>    
    <li className="nav-item">
      <Link to="/" className="nav-link">Seat Map</Link>
    </li>
    <li className="nav-item">
      <Link to="/about" className="nav-link">About</Link>
    </li>
    <li className="nav-item">
      <Link to="/login" className="nav-link" onClick={handleLogout}><u>{user ? 'Logout' : 'Login'}</u></Link>
    </li>
    <li className="nav-item">
        <Link to="/account" className = "nav-link">{firstName}</Link>
    </li>
    </ul>
    </nav>          
  );
};

export default Navbar;