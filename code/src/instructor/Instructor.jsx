import React, { useState, useEffect  } from 'react';
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
    function displayAttendance() {
            const db = ref(getDatabase());
            onValue(db, (snapshot) => {
            let seats = []
            const occupiedSeats = [];
            const processingStudents = [];
            snapshot.forEach(childSnapshot => {
            seats.push(childSnapshot.val())
            })
                for (let i=0; i < 36; i++) {
                    const items = seats[i];
                    const keys = Object.keys(items)
                    for (let k = 0; k < 36; k++) {
                        //console.log('this is a key-> ' + keys[k] + ' & this is its value-> ' + items[keys[k]]);
                        if (keys[k] === "chosen" && items[keys[k]] === true) {
                            occupiedSeats.push(i);
                        }
                    }
                    if (occupiedSeats.length != 0) {
                        processingStudents.push(seats[occupiedSeats[0]]);
                        occupiedSeats.length = 0;
                    }
                }
                for (let i = 0; i < processingStudents.length; i++) {
                    let name = processingStudents[i].name 
                    let seat = processingStudents[i].seat
                    let email = processingStudents[i].email
                    if (seat.includes("1")) {
                        document.getElementById("attendance1").insertAdjacentHTML('beforeend', "Name: " +  name + " Seat: " + seat + " Email: " + email + "<br>"); }
                    else if (seat.includes("2")) {
                        document.getElementById("attendance2").insertAdjacentHTML('beforeend', "Name: " +  name + " Seat: " + seat + " Email: " + email + "<br>"); }
                    else if (seat.includes("3")) {
                        document.getElementById("attendance3").insertAdjacentHTML('beforeend', "Name: " +  name + " Seat: " + seat + " Email: " + email + "<br>"); }
                    else if (seat.includes("4")) {
                        document.getElementById("attendance4").insertAdjacentHTML('beforeend', "Name: " +  name + " Seat: " + seat + " Email: " + email + "<br>"); }
                    else if (seat.includes("5")) {
                        document.getElementById("attendance5").insertAdjacentHTML('beforeend', "Name: " +  name + " Seat: " + seat + " Email: " + email + "<br>"); }
                }
                    }                   
            )}
        function getDate() {
            const date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let currentDate = `${month}-${day}-${year}`;
            document.getElementById("text").innerHTML = "Current attendance for: " + currentDate;
        }
        useEffect(() => {
            displayAttendance();
            getDate();
        }, []);
    return( 
        <div>
            <Navbar isActive = { true } />
    
            <button className="Deselector" onClick = {() => {deSelectSeat()}}>Clear all seats</button>
            <p className="text" id="text"></p>
            <header className="displayAttendance1header">Table 1</header>
            <div className="displayAttendance1" id="attendance1"></div>
            <header className="displayAttendance2header">Table 2</header>
            <div className="displayAttendance2" id="attendance2"></div>
            <header className="displayAttendance3header">Table 3</header>
            <div className="displayAttendance3" id="attendance3"></div> 
            <header className="displayAttendance4header">Table 4</header>
            <div className="displayAttendance4" id="attendance4"></div> 
            <header className="displayAttendance5header">Table 5</header> 
            <div className="displayAttendance5" id="attendance5"></div>  
        </div>
      )
    }


export default Instructor;