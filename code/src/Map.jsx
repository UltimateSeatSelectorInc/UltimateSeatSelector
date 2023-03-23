import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { submitChoice } from "./Maploader";
import { collection, getDoc, doc } from "firebase/firestore"; 
import { dbstore } from "./firebase/firebaseStore";
import './index.css';

/* IMPORTANT */

/* This function below checks if someone is logged in. If they are, it calls
getUser to retrieve the fullname and email of the user that is logged in by
passing in the userID (where each user in firestore has the same exact userID)
It then logs that information. 

The next step will be to use this onAuth to determine if this page is accessible
and to display the name or email in the corner to show who is logged in. 

getUser will be called each time a user clicks on the "submit" button in the popupModals.
The full name and email will be passed in automatically so that each seat then holds
that information */

/* IMPORTANT */

onAuthStateChanged(auth, (user) => {
  if (user) {
    getUser(user.uid).then((result) => {
      if (result) {
        const fullName = result.fullName;
        const email = result.email
        console.log(fullName);
        console.log(email)
      } else {
        console.log("No user is logged in");
      }
    });
  }
});

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

function Map(props) {
  const [hover, setHover] = useState(false);
  const [wasSelected, setWasSelected] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [lecternModalIsOpen, setlecternModalIsOpen] = useState(false);
  const [chosenModalIsOpen, setChosenModalIsOpen] = useState(false);
  const [tableModalIsOpen, setTableModalIsOpen] = useState(false);

  function handleHover() {
    setHover(true);
  }

  function handleClick() {
    const index = props.index;
    if (props.seat === "Lectern") { // Checks if lectern seat is clicked for lectern popup
      props.updateStyle(index);
      setlecternModalIsOpen(true)
      console.log("LECTERN SELECTED");

    } else if (props.seat.includes("TABLE")) { // if table is selected
      props.updateStyle(index, 'blue')
      setTableModalIsOpen(true)
      console.log("TABLE SELECTED")

    } else if (!props.chosen) { // If not, display regular popup
      props.updateStyle(index);
      console.log("SEAT SELECTED");
      setModalIsOpen(true);

    } else if (props.chosen) { // If already chosen, display information popup
      props.updateStyle(index);
      setModalIsOpen(false)
      setChosenModalIsOpen(true);
      console.log("CHOSEN SEAT SELECTED")
    }
  }

  function closeModal() {
    setModalIsOpen(false);
    setlecternModalIsOpen(false);
    setChosenModalIsOpen(false)
    setTableModalIsOpen(false)
  }

  function submitInfo() {
    const inputName = document.getElementById("inputName").value;
    const inputEmail = document.getElementById("inputEmail").value;
    submitChoice(props.seatStyle, inputName, inputEmail)
    props.updateStyle()
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
        {props.seat}
      </text>
      <rect
        onMouseEnter={() => handleHover()}
        onMouseLeave={() => setHover(false)}
        onClick={() => handleClick()}
        x={props.x}
        y={props.y}
        height={props.height + 4} // adjust height to make outline slightly bigger
        width={props.width + 4} // adjust width to make outline slightly bigger
        fill= {
            props.chosen
            ? (hover && props.updateStyle ? "grey" : "white")
            : "transparent"
        }
        stroke={
          props.chosen && hover && props.updateStyle
            ? "grey"
            : props.chosen
            ? "white"
            : hover || props.seatStyle === props.index
            ? "yellow"
            : "white"
        }
        strokeWidth="5" // make the lines thicker
      ></rect>

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
          <div class = "popupStyle">
            <h2>Table {props.seat[0]}, Seat {props.seat} </h2>
  
            <table class = "inputTable">
                  <tr>
                      <td><p>Seat Claimed by: {props.name}</p></td>
                  </tr>
                  <tr>
                      <td></td>
                  </tr>
                      
                  
            </table>
            <button class = "submitButton" onClick={() => closeModal()}>Close</button>
          </div>
          </Modal>
        ) : null}

          {tableModalIsOpen ? (
            <Modal // Table seat model, just contains the table name
            isOpen={tableModalIsOpen}
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
          <div class = "popupStyle">
            <h2>Table {props.seat[5]} </h2>

            <button class = "submitButton" onClick={() => closeModal()}>Close</button>
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
        <div class = "popupStyle">
          <h2>Lectern (Instructor) </h2>

          <table class = "inputTable">
                <tr>
                    <td class = "cell"><input class = "inputBox" type = "text" id = "inputName"
                        placeholder = "Full Name" maxlength = "100"></input></td>
                </tr>
                <tr>
                    <td class = "cell"><input class = "inputBox" type = "text" id = "inputEmail"
                        placeholder = "Email" maxlength = "100"></input></td>
                </tr>
                    
                
            </table>
          <button class = "submitButton" onClick={() => {submitInfo(); closeModal() }}>Submit</button>
          <button class = "submitButton" onClick={() => closeModal()}>Close</button>
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
        <div class = "popupStyle">
          <h2>Table {props.seat[0]}, Seat {props.seat} </h2>

          <table class = "inputTable">
                <tr>
                    <td class = "cell"><input class = "inputBox" type = "text" id = "inputName"
                        placeholder = "Full Name" maxlength = "100"></input></td>
                </tr>
                <tr>
                    <td class = "cell"><input class = "inputBox" type = "text" id = "inputEmail"
                        placeholder = "Email" maxlength = "100"></input></td>
                </tr>

          </table>
          <button class = "submitButton" onClick={() => {submitInfo(); closeModal() }}>Submit</button>
          <button class = "submitButton" onClick={() => closeModal()}>Close</button>
        </div>
        </Modal>
      )}
    </>
  );
}

export default Map;