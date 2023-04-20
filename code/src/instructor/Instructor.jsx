import React, { useState, useEffect  } from 'react';
import './Instructor.css';
import Navbar from '../navbar/Navbar.jsx'
import { getDatabase, ref, update, child, onValue, auth } from "firebase/database";
import firebase from '../firebase/firebase.js';
import { useAuth } from '../firebase/firebaseStore';
import Modal from "react-modal";
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';


function getDate() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${month}-${day}-${year}`;
    document.getElementById("attendanceTitle").innerHTML = "Attendance for: " + currentDate;
    return currentDate;
}

function Instructor() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);
    const { Link } = require("react-router-dom")
    const { isInstructor } = useAuth();

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
        setIsModalOpen(false)
    }

    function exportToExcel() {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const currentDate = getDate();
        const fileName = currentDate;

        let excelTableData = document.getElementById(`attendance1`).textContent;
        let excelTableData2 = document.getElementById(`attendance2`).textContent;
        let excelTableData3 = document.getElementById(`attendance3`).textContent;
        let excelTableData4 = document.getElementById(`attendance4`).textContent;
        let excelTableData5 = document.getElementById(`attendance5`).textContent;
        console.log(excelTableData5)
        let excelData = [
          { Table_1: excelTableData},
          { Table_2: excelTableData2},
          { Table_3: excelTableData3},
          { Table_4: excelTableData4},
          { Table_5: excelTableData5},
        ]
        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = { Sheets: { 'data': ws}, SheetNames: ['data']};
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension)
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
                    studentList += `${seat} - <a href="mailto:${email}">${name}</a><br> `;
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
            <Modal // Regular Modal - popup
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Example Modal"
                className = "lecternModal"
                style={{
                    overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 999,
                    },
                    content: {
                    position: "fixed",
                    top: "35%",
                    left: "50%",
                    backgroundColor: "#1a1d29",
                    transform: "translate(-50%, -50%)",
                    color: "white",
                    backgroundColor: "#1a1d29",
                    border: "black",
                    borderRadius: "10px",
                    outline: "none",
                    padding: "10px"
                    },
                }}
                >
              <div className = "popupStyle">
              <h2>Are you sure? </h2>

              <table className = "inputTable">
                  <tr>
                      <td><p>This action cannot be undone. Please download a copy for your records.</p></td>
                  </tr>
              </table>
              <button className = "submitButton" onClick={() => { deSelectSeat() }}>Confirm</button>
              <button className = "submitButton" onClick={() => { setIsModalOpen(false)}}>Close</button>
              </div>
            </Modal>

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

            </div><br></br>

            <div className = "centerButton mainbodyInstructor">
                <button className = "submitButton" onClick={() => { setIsModalOpen(true) }}>Clear Seat Chart</button>
                <button className = "greenSubmitButton submitButton" onClick={() => { setIsExcelModalOpen(true) }}>Download Excel</button>
                <button className="submitButton">
                <Link to="/addinstructor">Add Instructor</Link>
                </button>


            </div>
            <Modal // Excel Modal - popup
                isOpen={isExcelModalOpen}
                onRequestClose={() => setIsExcelModalOpen(false)}
                contentLabel="Example Modal"
                className = "lecternModal"
                style={{
                    overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 999,
                    },
                    content: {
                    position: "fixed",
                    top: "35%",
                    left: "50%",
                    backgroundColor: "#1a1d29",
                    transform: "translate(-50%, -50%)",
                    color: "white",
                    backgroundColor: "#1a1d29",
                    border: "black",
                    borderRadius: "10px",
                    outline: "none",
                    padding: "10px"
                    },
                }}
                >
              <div className = "popupStyle">
              <h2>Are you sure? </h2>

              <table className = "inputTable">
                  <tr>
                      <td><p>This will download a Microsoft Excel file containing a record of today's seat map as of this moment.</p></td>
                  </tr>
              </table>
              <button className = "submitButton" onClick={() => { exportToExcel() }}>Download</button>
              <button className = "submitButton" onClick={() => { setIsExcelModalOpen(false)}}>Close</button>
              </div>
            </Modal>

        </div>
      )
}

export default Instructor;