import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, update, child, onValue, get } from "firebase/database";
import { submitChoice } from "./Maploader";
import { collection, getDoc, doc  } from "firebase/firestore"; 
import { dbstore,useAuth } from "./firebase/firebaseStore";
import { motion } from 'framer-motion';
import './index.css';

// function that gets the user's location
function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
}

// function that gets the distance between two coords
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}

// function that accesses the users collection and returns fullName and userID
async function getUser(userID) {
  const usersRef = collection(dbstore, "users");
  const userDocRef = doc(usersRef, userID);

  return getDoc(userDocRef)
    .then((doc) => {
      if (doc.exists()) {
        const fullName = doc.data().First_Name + " " + doc.data().Last_Name;
        const email = doc.data().Email
        return { fullName, email };
      } else {
        console.log("No data exists for current user or no user logged in");
        return null;
      }
    })
}

// function that checks currently logged-in user's email address against all
// email addresses in the seat database. If there is a match, return true
async function checkUser() {
  const db = ref(getDatabase()); // reference to database
  return new Promise((resolve, reject) => { // return a promise
    auth.onAuthStateChanged(function(user) { // check user
      if (user) {
        const seatPromises = [];
        for (let i = 0; i < 36; i++) { // loop through all the seats
          const seatRef = child(db, i.toString());
          seatPromises.push(get(seatRef).then((snapshot) => {
            const seat = snapshot.val();
            if (seat.email == user.email) { // for each seat, check email against email
              return true;
            } else {
              return false;
            }
          }));
        }
        Promise.all(seatPromises).then((results) => { // use promise.all to wait for all checks
          if (results.some((result) => result === true)) {
            resolve(true);
          } else {
            resolve(false); // return true or false based on return of all promise checks
          }
        });
      }
    });
  });
}

function Map(props) {
  const [hover, setHover] = useState(false);
  const [wasSelected, setWasSelected] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [lecternModalIsOpen, setlecternModalIsOpen] = useState(false);
  const [lecternChosenModalIsOpen, setlecternChosenModalIsOpen] = useState(false);
  const [lecternDeselectModalIsOpen, setlecternDeselectModalIsOpen] = useState(false);
  const [chosenModalIsOpen, setChosenModalIsOpen] = useState(false);
  const [table1ModalIsOpen, setTable1ModalIsOpen] = useState(false);
  const [table2ModalIsOpen, setTable2ModalIsOpen] = useState(false);
  const [table3ModalIsOpen, setTable3ModalIsOpen] = useState(false);
  const [table4ModalIsOpen, setTable4ModalIsOpen] = useState(false);
  const [table5ModalIsOpen, setTable5ModalIsOpen] = useState(false);
  const [alertModalIsOpen, setAlertModalIsOpen] = useState(false);
  const [deselectModalIsOpen, setDeselectModalIsOpen] = useState(false);
  const [alreadyChosenSeatIsOpen, setAlreadyChosenSeatIsOpen] = useState(false);

  // makes the instructor lectern only selectable by instructors
  const {isInstructor } = useAuth();
  const showInstructor = isInstructor;

  // function that deselects users seat, called from deselect Modal
  function deselectSeat() {
    const db = ref(getDatabase());
    const updates = {};
    updates["chosen"] = false;
    updates["name"] = "";
    updates["email"] = "";
    const seatRef = child(db, props.index.toString());
    update(seatRef, updates);
    console.log("CHOSEN SEAT DESELECTED");
    closeModal()
  }

  function handleHover() {
    setHover(true);
  }

  async function handleClick() {
    const index = props.index
    const userEmail = auth.currentUser.email;
    if (props.seat.includes("TABLE")) { // If table selected
        props.updateStyle(index, 'blue')
        if (index == "8") {
          setTable1ModalIsOpen(true);
        } else if (index == "10") {
          setTable2ModalIsOpen(true);
        } else if (index == "5") {
          setTable3ModalIsOpen(true);
        } else if (index == "35") {
          setTable4ModalIsOpen(true);
        } else if (index == "11") {
          setTable5ModalIsOpen(true);
        }
        console.log("TABLE SELECTED");
    } else if (props.seat === "Lectern") { // Checks if lectern seat is clicked for lectern popup
        props.updateStyle(index);
        if (!props.chosen) {

          checkUser().then((result) => {
            if (result == false) { // if no match, allow user to select seat
              props.updateStyle(index);
              console.log("SEAT SELECTED");
              setlecternModalIsOpen(true);
            }
            else { // if user already selected a seat, don't display popup
              setAlreadyChosenSeatIsOpen(true);
              console.log("USER ALREADY SELECTED A SEAT")
            }
          })
        } else if (props.chosen && props.email === userEmail) {
          setlecternDeselectModalIsOpen(true);
        } else {
          setlecternChosenModalIsOpen(true);
        }
        console.log("LECTERN SELECTED");
    } else if (props.chosen && props.email === userEmail) {
        setDeselectModalIsOpen(true);
    } else if (!props.chosen) { // If not, display regular popup
        // calls function to check if user has already selected a seat
        checkUser().then((result) => {
          if (result == false) { // if no match, allow user to select seat
            props.updateStyle(index);
            console.log("SEAT SELECTED");
            setModalIsOpen(true);
          }
          else { // if user already selected a seat, don't display popup
            setAlreadyChosenSeatIsOpen(true);
            console.log("USER ALREADY SELECTED A SEAT")
          }
        })
    } else if (props.chosen) { // If already chosen, display information popup
        props.updateStyle(index);
        setModalIsOpen(false);
        setChosenModalIsOpen(true);
        console.log("CHOSEN SEAT SELECTED");
    }
  }

function getTableOccupants(id = 0) {
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
    if (document.getElementById(`table${id}`)) {
      let testElement = document.getElementById(`table${id}`);
        let studentList = "";
        for (let j = 0; j < processingStudents.length; j++) {
            let seat = processingStudents[j].seat;
            if (seat.charAt(0) == id) {
                let name = processingStudents[j].name;
                studentList += `${seat} - ${name}<br> `;
            }
        }
        if (studentList) {
          console.log(studentList)
          testElement.innerHTML = studentList;
        } else {
          testElement.classList.add("noStudentsMsg")
          testElement.innerHTML = "Empty Table";
        }
    } 
  }
    )
}


  function closeModal() {
    setModalIsOpen(false);
    setlecternModalIsOpen(false);
    setlecternChosenModalIsOpen(false);
    setlecternDeselectModalIsOpen(false);
    setChosenModalIsOpen(false)
    setTable1ModalIsOpen(false)
    setTable2ModalIsOpen(false)
    setTable3ModalIsOpen(false)
    setTable4ModalIsOpen(false)
    setTable5ModalIsOpen(false)
    setDeselectModalIsOpen(false)
    setAlreadyChosenSeatIsOpen(false)
  }

  function submitInfo() {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        getUser(user.uid).then((result) => {
          if (result) {
            const fullName = result.fullName;
            const email = result.email
            submitChoice(props.seatStyle, fullName, email)
            props.updateStyle()
          } else {
            console.log("No user is logged in");
          }
        });
      }
    });
  }

  return (
      <>
        <text
          display={hover || props.seatStyle === props.index ? "block" : "none"}
          x={props.x}
          y={props.y + 50}
          fontSize="10"
          fill="black"
          height={props.height}
          width={props.width}
        >
        </text>
        <motion.rect
          initial={false}
          whileHover={
            !props.seat.includes("TABLE")
              ? {
                scale: [1, 0.95, 1],
                transition: { duration: 0.2, ease: "easeOut" },
                }
              : {}
          }
          onMouseEnter={() => handleHover()}
          onMouseLeave={() => setHover(false)}
          onClick={() => handleClick()}
          x={props.x}
          y={props.y}
          height={props.height + 4}
          width={props.width + 4}
          fill={
            props.chosen
              ? hover && props.updateStyle
                ? "grey"
                : "white"
              // check for user here
              : "transparent"
          }
          stroke={
            props.chosen && hover && props.updateStyle
              ? "grey"
              : props.chosen && !props.seat.includes("TABLE")
              ? "white"
              : hover || props.seatStyle === props.index
              ? "yellow"
              : "white"
          }
          strokeWidth="5"
        ></motion.rect>
          {deselectModalIsOpen ? (
              <Modal
                isOpen={deselectModalIsOpen}
                onRequestClose={() => closeModal()}
                contentLabel="Deselect Modal"
                className = "chosenModal"
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
              <h2>Table {props.seat[0]}, Seat {props.seat} </h2>

              <table className = "inputTable">
                  <tr>
                      <td><p>Seat Claimed by: {props.name} (You!)</p></td>
                  </tr>
              </table>
              <button className = "submitButton" onClick={() => {deselectSeat(); closeModal() }}>Deselect</button>
              <button className = "submitButton" onClick={() => closeModal()}>Close</button>

                </div>
              </Modal>
          ) : null}

          {alreadyChosenSeatIsOpen ? (
              <Modal
                isOpen={alreadyChosenSeatIsOpen}
                onRequestClose={() => closeModal()}
                contentLabel="Seat Already Chosen Modal"
                className = "chosenModal"
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
              <h2>Table {props.seat[0]}, Seat {props.seat} </h2>

              <table className = "inputTable">
                  <tr>
                      <td><p>You have already chosen a seat! Please deselect it before choosing another.</p></td>
                  </tr>
              </table>
              <button className = "submitButton" onClick={() => closeModal()}>Close</button>

                </div>
              </Modal>
          ) : null}

          {chosenModalIsOpen ? (
              <Modal // Chosen seat modal - popup, just displays who claimed seat.
              isOpen={chosenModalIsOpen}
              onRequestClose={() => closeModal()}
              contentLabel="Example Modal"
              className = "chosenModal"
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
              <h2>Table {props.seat[0]}, Seat {props.seat} </h2>

              <table className = "inputTable">
                  <tr>
                      <td><p>Seat Claimed by: {props.name}</p></td>
                  </tr>
              </table>

              <button className = "submitButton" onClick={() => closeModal()}>Close</button>
            </div>
            </Modal>
          ) : null}

          {alertModalIsOpen ? (
            <Modal
              isOpen={alertModalIsOpen}
              onRequestClose={() => setAlertModalIsOpen(false)}
              contentLabel="Alert Modal"
              style={{
                overlay: {
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: 999,

                },
                content: {
                  position: "fixed",
                  top: "35%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "25%",
                  height: "20%",
                  fontSize: "16px",
                  backgroundColor: "#1a1d29",
                  border: "black",
                  borderRadius: "10px",
                  outline: "none",
                  padding: "20px",
                },
              }}
            >
              <div className="popupStyle">
                <h2>You must be at Lewis University to claim a seat.</h2>
                <button className="submitButton" onClick={() => setAlertModalIsOpen(false)}>
                  Close
                </button>
              </div>
            </Modal>
          ) : null}

      {table1ModalIsOpen ? (
            <Modal // Table seat model
            isOpen={table1ModalIsOpen}
            onAfterOpen={getTableOccupants(1)}
            onRequestClose={() => closeModal()}
            contentLabel="Example Modal"
            className = "tableModal"
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
                outline: "none"
              },
            }}
            
          >
          <div className = "popupStyle">
            <h2>Table 1 </h2>
            <p id="table1">Empty</p>

            <button className = "submitButton" onClick={() => closeModal()}>Close</button>
          </div>
          </Modal>
        ) : null}

      {table2ModalIsOpen ? (
            <Modal // Table seat model
            isOpen={table2ModalIsOpen}
            onAfterOpen={getTableOccupants(2)}
            onRequestClose={() => closeModal()}
            contentLabel="Example Modal"
            className = "tableModal"
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
                outline: "none"
              },
            }}
            
          >
          <div className = "popupStyle">
            <h2>Table 2 </h2>
            <p id="table2">Empty</p>

            <button className = "submitButton" onClick={() => closeModal()}>Close</button>
          </div>
          </Modal>
        ) : null}
      
      {table3ModalIsOpen ? (
            <Modal // Table seat model
            isOpen={table3ModalIsOpen}
            onAfterOpen={getTableOccupants(3)}
            onRequestClose={() => closeModal()}
            contentLabel="Example Modal"
            className = "tableModal"
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
                outline: "none"
              },
            }}
            
          >
          <div className = "popupStyle">
            <h2>Table 3 </h2>
            <p id="table3">Empty</p>

            <button className = "submitButton" onClick={() => closeModal()}>Close</button>
          </div>
          </Modal>
        ) : null}

      {table4ModalIsOpen ? (
            <Modal // Table seat model
            isOpen={table4ModalIsOpen}
            onAfterOpen={getTableOccupants(4)}
            onRequestClose={() => closeModal()}
            contentLabel="Example Modal"
            className = "tableModal"
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
                outline: "none"
              },
            }}
            
          >
          <div className = "popupStyle">
            <h2>Table 4 </h2>
            <p id="table4">Empty</p>

            <button className = "submitButton" onClick={() => closeModal()}>Close</button>
          </div>
          </Modal>
        ) : null}

      {table5ModalIsOpen ? (
            <Modal // Table seat model
            isOpen={table5ModalIsOpen}
            onAfterOpen={getTableOccupants(5)}
            onRequestClose={() => closeModal()}
            contentLabel="Example Modal"
            className = "tableModal"
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
                outline: "none"
              },
            }}
            
          >
          <div className = "popupStyle">
            <h2>Table 5 </h2>
            <p id="table5">Empty</p>

            <button className = "submitButton" onClick={() => closeModal()}>Close</button>
          </div>
          </Modal>
        ) : null}

          {lecternModalIsOpen ? (
            <Modal // Regular Modal - popup
              isOpen={lecternModalIsOpen}
              onRequestClose={() => closeModal()}
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
              <h2>Lectern (Instructor) </h2>
              <button style={{ display: showInstructor ? "inline-block" : "none" }} className = "submitButton" onClick={() => {submitInfo(); closeModal() }}>Claim</button>
              <button className = "submitButton" onClick={() => closeModal()}>Close</button>
            </div>
            </Modal>
          ) : null}

          {lecternChosenModalIsOpen ? (
            <Modal // Regular Modal - popup
              isOpen={lecternChosenModalIsOpen}
              onRequestClose={() => closeModal()}
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
              <h2>Lectern (Instructor) </h2>
              <table className = "inputTable">
                  <tr>
                      <td><p>Lectern Claimed by: {props.name}</p></td>
                  </tr>
              </table>
              <button className = "submitButton" onClick={() => closeModal()}>Close</button>
            </div>
            </Modal>

          ) : null}        
          {lecternDeselectModalIsOpen ? (
            <Modal // Regular Modal - popup
              isOpen={lecternDeselectModalIsOpen}
              onRequestClose={() => closeModal()}
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
              <h2>Lectern (Instructor) </h2>
              <table className = "inputTable">
                  <tr>
                      <td><p>Lectern Claimed by: {props.name} (You!)</p></td>
                  </tr>
              </table>
              <button className = "submitButton" onClick={() => {deselectSeat(); closeModal() }}>Deselect</button>
              <button className = "submitButton" onClick={() => closeModal()}>Close</button>
            </div>
            </Modal>
          ) : (
            <Modal // Regular Modal - popup
              isOpen={modalIsOpen}
              onRequestClose={() => closeModal()}
              contentLabel="Example Modal"
              className = "regModal"
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
              <h2>Table {props.seat[0]}, Seat {props.seat} </h2>

              <button className = "submitButton" onClick={() => {submitInfo(); closeModal() }}>Claim</button>
              <button className = "submitButton" onClick={() => closeModal()}>Close</button>

            </div>
            </Modal>
          )}
      </>
  );
}

export default Map;