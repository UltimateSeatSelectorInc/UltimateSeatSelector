// Import modules
import { initializeApp } from "firebase/app";
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, update, child, onValue,  } from "firebase/database";
import Map from './Map.jsx'
import Navbar from './Navbar.jsx'

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBehKF152E5XJdsZf-Yzj5PBaX3DOiFeRk",
  authDomain: "ultimate-seat-selector-15f36.firebaseapp.com",
  databaseURL: "https://ultimate-seat-selector-15f36-default-rtdb.firebaseio.com",
  projectId: "ultimate-seat-selector-15f36",
  storageBucket: "ultimate-seat-selector-15f36.appspot.com",
  messagingSenderId: "167830181105",
  appId: "1:167830181105:web:d497c2636b8edba5088550",
  measurementId: "G-G8QNWC8T4R"
};

// function that changes firebase values to seat taken and updates name/email
export function submitChoice(index, name, email) {
  const db = ref(getDatabase());
  const seatRef = child(db, index.toString());
  const updates = {
    chosen: true,
    name: name,
    email: email,
  };
  update(seatRef, updates);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Function that gets the seat data from the database
function Maploader(){

  const [seats, setSeats] = useState([])
  const [seatStyle, setSeatStyle] = useState()


  useEffect(() => {
    const db = ref(getDatabase());
    onValue(db, (snapshot) => {
      let seats = []
      snapshot.forEach(childSnapshot => {
        seats.push(childSnapshot.val())
        setSeats(() => ([
          ...seats
        ]))
      })
    })
}, [])


// changes firebase data to seat not taken, removing name and email
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

// The svg style styles the entire image on the page.
function updateStyle(index){ 
  setSeatStyle((prev) => (prev === index ? null : index))
}

  return( 
    <div>

        <Navbar />

        <button onClick = {() => {deSelectSeat()}}>De-select all seats (DEV)</button>

        <svg style = {{width: "100%", height: "100vh"}} viewBox="114 -150 1000 2000">
        {seats && seats.map((seat, index) => 
            <Map
                key = {index}
                index = {index}
                seatStyle = {seatStyle}
                updateStyle = {updateStyle}
                x = {seat.attributes.x} 
                y = {seat.attributes.y} 
                seat = {seat.seat} 
                chosen = {seat.chosen}
                name = {seat.name}
                email = {seat.email}
                height = {seat.attributes.height} 
                width = {seat.attributes.width}
                />
        )}
        </svg>

    </div>
  )
}

export default Maploader