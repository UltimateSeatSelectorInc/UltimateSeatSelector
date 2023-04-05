import React, { useState, useEffect  } from 'react';
import './Instructor.css';
import Navbar from '../navbar/Navbar.jsx'
import { getDatabase, ref, update, child, onValue, auth } from "firebase/database";
import firebase from '../firebase/firebase.js';
import { useAuth } from '../firebase/firebaseStore';

// function that opens or closes the popup based on passed variable
function confirmationPopup(openOrClosed) {
    document.getElementById("hidden").style.display = openOrClosed;
}

// function that deselects all seats in the database
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
    confirmationPopup("none")  // close the confirmation popup
}

function getDate() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${month}-${day}-${year}`;
    document.getElementById("attendanceTitle").innerHTML = "Attendance for: " + currentDate;
}

function Instructor() {

    const { isInstructor } = useAuth();

    function displayAttendance() {
        
        const db = ref(getDatabase());
        onValue(db, (snapshot) => {
        let seats = []
        const occupiedSeats = [];
        const processingStudents = [];
        snapshot.forEach(childSnapshot => {
        seats.push(childSnapshot.val())
        })

        // iterate through each seat and push each chosen seat to an array
        for (let i = 0; i < 36; i++) {
            const seat = seats[i];
            if (seat.chosen === true) {
            occupiedSeats.push(i);
            }
        }

        // if we have some occupied seats, push each seat object to the processing array
        if (occupiedSeats.length != 0) {
            for (let i = 0; i < occupiedSeats.length; i++) {
                processingStudents.push(seats[occupiedSeats[i]]);
            }
            occupiedSeats.length = 0; // reset
        }
        

        // display the list of students for each table unless it's empty, display message
        for (let i = 1; i <= 5; i++) {
            let attendanceElement = document.getElementById(`attendance${i}`);
            let studentList = "";
            for (let j = 0; j < processingStudents.length; j++) {
                let seat = processingStudents[j].seat;
                if (seat.charAt(0) == i) {
                    let name = processingStudents[j].name;
                    let email = processingStudents[j].email;
                    studentList += `${seat} - <a href="mailto:${email}">${name}</a><br>`;
                }
            }
            if (studentList) {
                attendanceElement.innerHTML = studentList;
            } else {
                attendanceElement.classList.add("noStudentsMsg")
                attendanceElement.innerHTML = "Empty Table";
            }
        }

    }  
        )
    }

    useEffect(() => {
        displayAttendance();
        getDate();
    }, []);

    return(

        <div>
            <Navbar isActive = { true } showAddInstructor={isInstructor} />

            <div class = "maintitle">
                <h1>Instructor</h1>
            </div>

            <div className = "mainbodyInstructor">
                <p id = "attendanceTitle" className = "bodytitle"></p>
                <p className = "tableName">Table 1</p>
                    <div className="displayAttendance" id="attendance1"></div>
                <p className = "tableName">Table 2</p>
                    <div className="displayAttendance" id="attendance2"></div> 
                <p className = "tableName">Table 3</p>
                    <div className="displayAttendance" id="attendance3"></div> 
                <p className = "tableName">Table 4</p>
                    <div className="displayAttendance" id="attendance4"></div> 
                <p className = "tableName">Table 5</p>
                    <div className="displayAttendance" id="attendance5"></div> 
            </div>
        


            <button className="Deselector" onClick = {() => {confirmationPopup("block")}}>Clear all seats</button>
            <br></br><br></br>
            <p className="text" id="text"></p>
            <div className="confirmation" id="hidden" style={{display: "none"}}>
                <p className="center"><b>Are you sure?</b></p>
                <p className="center">This will clear the seating chart and cannot be undone. Make sure you take a copy of the chart before you do this.</p>
                <button className="confirmationYes" id="button" onClick = {() => {deSelectSeat()}}>Yes</button> <button className="confirmationNo" id="button" onClick = {() => {confirmationPopup("none")}}>No</button>
            </div>
        </div>
      )
}
    


export default Instructor;