// navbar component to be rendered on each page
import React, { useState, useEffect } from 'react';
import { useAuth, dbstore } from "../firebase/firebaseStore";
import { doc, getDoc } from "firebase/firestore";
import './Navbar.css';


function Navbar(props) {
  const { isActive = true, showAddInstructor = false } = props;
  const { user, auth, isInstructor  } = useAuth();
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

return (
    <nav className="navbar">
      <div className="navbar-title">Ultimate Seat Selector</div>
        <ul className="navbar-nav">
          {/* Link to add instructor, only visible on Instructor page if user is an instructor */}
          {showAddInstructor && (
            <li className="nav-item">
              <a href="/addinstructor" className={`nav-link ${isActive ? '' : 'disabled'}`}><u>Add Instructor</u></a>
            </li>
          )}
          {/* Other navigation links */}
          <li className="nav-item">
            <a href="/instructor" className={`nav-link ${isActive ? '' : 'disabled'}`}>Instructor</a>
          </li>
          <li className="nav-item">
            <a href="/" className={`nav-link ${isActive ? '' : 'disabled'}`}>Seat Map</a>
          </li>
          <li className="nav-item">
            <a href="/about" className={`nav-link ${isActive ? '' : 'disabled'}`}>About</a>
          </li>
          <li className="nav-item">
<<<<<<< HEAD
            <a href = "/account" className={`nav-link ${isActive ? '' : 'disabled'}`}>{firstName}</a>
=======
            <a href="/login" className={`nav-link ${isActive ? '' : 'disabled'}`} onClick={handleLogout}><u>{user ? 'Logout' : 'Login'}</u></a>
>>>>>>> 6901d54137e658485b0fe350b9c2341f6cabaee3
          </li>
          {user && (
            <li className="nav-item">
              <a  className={`nav-link-user ${isActive ? '' : 'disabled'}`}>{firstName}</a>
            </li>
          )}
        </ul>
    </nav>
  );
}

export default Navbar;