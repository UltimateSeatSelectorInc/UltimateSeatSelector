import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Modal from 'react-modal';
import Maploader from './Maploader.jsx';
import SignUp from './Signup.jsx';
import Login from './Login.jsx';
import Verify from './Verify.jsx';

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
  } else {
    return <div>404 Not Found</div>;
  }
}

Modal.setAppElement(document.body); // <-- add this line
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);