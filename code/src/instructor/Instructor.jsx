import React, { useState  } from 'react';
import './Instructor.css';
import Navbar from '../navbar/Navbar.jsx'
import { getDatabase, ref, update, child, onValue, auth } from "firebase/database";
import firebase from '../firebase/firebase.js';

function Instructor() {
    function deSelectSeat() {
        const db = ref(getDatabase());
        const updates = {};
        updates['chosen'] = false;
        updates['name'] = '';
        updates['email'] = '';
      
        for (let i = 0; i < 36; i++) {
          const seatRef = child(db, i.toString());
          update(seatRef, updates);
        }
      }

    return( 
        <div>
    
            <Navbar isActive = { true } />
    
            <button onClick = {() => {deSelectSeat()}}>De-select all seats</button>
    
        </div>
      )
}


export default Instructor;