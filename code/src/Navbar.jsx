// navbar component to be rendered on each page

import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div class = "navbar-title">Ultimate Seat Selector</div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <a href="/" className="nav-link">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a href="/login" className="nav-link">
            Login
          </a>
        </li>
        <li className="nav-item">
          <a href="/signup" className="nav-link">
            Signup
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;