import React from 'react';
import Navbar from '../navbar/Navbar.jsx'
import './About.css';

function About() {
    return (
  
      <div class = "signupstyle">
  
        <Navbar />
  
        <div class = "maintitle">
          <h1>About</h1>
        </div>
  
        <div class = "mainbody">
          <div class = "mainbodytitle">
            <p>About us</p>
          </div>
          <div class = "mainbodysubtitle">
            <p>Ultimate Seat Selector is an interactive web app developed by "Eric's Angels"
              for a 2023 Capstone course that allows students and instructors to select their
              seat for the classroom. <br></br> <br></br> The app utilizes the front-end library 
              React to help generate interactive and reusable components. Firebase's realtime 
              database and authentication is used to update values of the seats and create/maintain
              users. <br></br> <br></br>Please visit our <strong><a target = "_blank" href="https://github.com/UltimateSeatSelectorInc/UltimateSeatSelector">
              Github </a></strong> or you can <strong><a href="/signup">Sign Up</a></strong> to try Ultimate Seat Selector. <br></br> <br></br>
              This page was last updated <strong><span style = {{color: "light-grey"}}>3/10/2023.</span></strong>
            </p>
          </div>
        </div>
  
      </div>
    );
  };
  
  export default About;