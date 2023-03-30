import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Modal from 'react-modal';
import Maploader from './Maploader.jsx';
import SignUp from './signup/Signup.jsx';
import Login from './login/Login.jsx';
import Verify from './verify/Verify.jsx';
import Account from './account/account.jsx';
import Instructor from './instructor/Instructor.jsx';
import Addinstructor from './addinstructor/AddInstructor.jsx'

// simple routing
function App() {
  // Get the current URL path
  const path = window.location.pathname;

  if (path === '/') {
    return <Maploader />;
  } else if (path === '/login') {
    return <Login />;
  } else if (path === '/signup') {
    return <SignUp />;
  } else if (path === '/verify') {
    return <Verify />;
  } else if (path === '/account') {
    return <Account />;
  } else if (path === '/instructor') {
    return <Instructor />;
  } else if (path === '/addinstructor') {
    return <Addinstructor />; 
  } else {
    return <div>404 Not Found</div>;
  }
}

Modal.setAppElement(document.body); // <-- add this line
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
//  <React.StrictMode>
    <App />
//  </React.StrictMode>
);