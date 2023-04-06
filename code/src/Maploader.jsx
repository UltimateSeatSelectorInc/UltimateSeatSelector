// import modules
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, update, child, onValue,  } from "firebase/database";
import firebase from './firebase/firebase.js'; // database usage (don't remove)
import Navbar from './navbar/Navbar.jsx'
import Map from './Map.jsx'
import './map.css'

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

// The svg style styles the entire image on the page.
function updateStyle(index){ 
  setSeatStyle((prev) => (prev === index ? null : index))
}

  return( 
    <div>

        <Navbar isActive = { true } />

        <svg className = "map" viewBox="119 -150 1000 2000">
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