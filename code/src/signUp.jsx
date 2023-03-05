import React from 'react';
import './Signup.css';
import Navbar from './Navbar.jsx'

// basic sign up page

function SignUp() {
  return (

    // ** Just example code **
    <div class = "signupstyle">

          <Navbar />
        
      <h1>Sign Up</h1>
      <form> 
        <label>
          First Name:
          <input type="text" name="firstName" />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" name="lastName" />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;