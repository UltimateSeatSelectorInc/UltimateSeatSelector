// navbar component to be rendered on each page

import React from 'react';
import './Navbar.css';

function Navbar(props) {
  const { isActive = true} = props;
  
  return (
    <nav className = "navbar">
      <div className = "navbar-title">Ultimate Seat Selector</div>
      <ul className = "navbar-nav">
        <li className = "nav-item">
          <a href="/" className = {`nav-link ${props.isActive ? '' : 'disabled'}`}>Seat Map</a></li>
        <li className = "nav-item">
          <a href="/login" className = {`nav-link ${props.isActive ? '' : 'disabled'}`}>Login</a></li>
        <li className="nav-item">
          <a href="/about" className = {`nav-link ${props.isActive ? '' : 'disabled'}`}>About</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;