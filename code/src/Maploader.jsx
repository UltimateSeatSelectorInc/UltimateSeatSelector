// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set, child, onValue,  } from "firebase/database";
import Map from './Map.jsx'

// Our web app's Firebase configuration
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

// function that handles a seat selection w/ firebase
function submitChoice(index) {
  const db = getDatabase(); // reference to database
  const chosenRef = child(ref(db), `${index}/chosen`); // child node of seat
  set(chosenRef, true); // set chosen value to true
  
}

// The svg style styles the entire image on the page.
  function updateStyle(index){ 
    setSeatStyle((prev) => (prev === index ? null : index))
  }

  return( 
    <div> 
        <svg style = {{width: "100%", height: "100vh"}} viewBox="100 -150 1000 2000">
        {seats && seats.map((seat, index) => 
            <Map 
                index = {index}
                seatStyle = {seatStyle}
                updateStyle = {updateStyle}
                x = {seat.attributes.x} 
                y = {seat.attributes.y} 
                seat = {seat.seat} 
                chosen = {seat.chosen} 
                height = {seat.attributes.height} 
                width = {seat.attributes.width}
                />
        )}
        </svg>
        <button onClick = {() => submitChoice(seatStyle)}>Submit</button>
    </div>
  )
}

export default Maploader