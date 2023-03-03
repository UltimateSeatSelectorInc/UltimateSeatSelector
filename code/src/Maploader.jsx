// Import modules
import { initializeApp } from "firebase/app";
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, update, child, onValue,  } from "firebase/database";
import Map from './Map.jsx'

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Function that gets the seat data from the database
function Maploader(){

  const [seats, setSeats] = useState([])
  const [seatStyle, setSeatStyle] = useState()
  const [inputName, setInputName] = useState('')
  const [inputEmail, setInputEmail] = useState('')

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

// function that changes firebase values to seat taken and updates name/email
function submitChoice(index, name, email) {
  const db = ref(getDatabase());
  const seatRef = child(db, index.toString());
  const updates = {
    chosen: true,
    name: name,
    email: email,
  };
  update(seatRef, updates);
}

// changes firebase data to seat not taken, removing name and email
function deSelectSeat(index) {
  const db = ref(getDatabase());
  const seatRef = child(db, index.toString());
  const updates = {
    chosen: false,
    name: '',
    email: '',
  };
  update(seatRef, updates);
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
                popupClick={popupClick}
                />
        )}
        </svg>

      <label>
        Name: <input type="text" value={inputName} onChange={e => setInputName(e.target.value)} /> </label>
      <label>
        Email: <input type="email" value={inputEmail} onChange={e => setInputEmail(e.target.value)} /> </label>
      <button onClick = {() => {submitChoice(seatStyle, inputName, inputEmail); setInputName(''); setInputEmail('')}}>Submit</button>
      <button onClick = {() => {deSelectSeat(seatStyle)}}>De-select seat</button>
    </div>
    // buttons call functions that update database values
  )
}

export default Maploader