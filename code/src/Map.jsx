import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { submitChoice } from "./Maploader";
import { collection, getDoc, doc } from "firebase/firestore"; 
import { dbstore, useAuth } from "./firebase/firebaseStore";
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

function Map(props) {
  const [hover, setHover] = useState(false);
  const [wasSelected, setWasSelected] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [lecternModalIsOpen, setlecternModalIsOpen] = useState(false);
  const [chosenModalIsOpen, setChosenModalIsOpen] = useState(false);
  const [tableModalIsOpen, setTableModalIsOpen] = useState(false);
  const [alertModalIsOpen, setAlertModalIsOpen] = useState(false);
  
  // checks status of user and redirects them accordingly
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (user.emailVerified) {
        // do nothing, user is logged in and verified
      } else {
        window.location.replace("/verify") // account not verified
      }
    } else {
        window.location.replace("/login") // account not logged in
    }
  });

  function handleHover() {
    setHover(true);
  }

  async function handleClick() {
    // Get Lewis University's coordinates (latitude and longitude)
    const lewisUniversityLat = 41.6053;
    const lewisUniversityLon = -88.0798;
    const index = props.index;
    setWasSelected(!wasSelected)
  
    // Get the user's current location
    //try { **GEO IMPLEMENTATION**
      //const location = await getCurrentLocation();
      //const distance = getDistance(
        //location.latitude,
        //location.longitude,
        //lewisUniversityLat,
        //lewisUniversityLon
     //);**GEO IMPLEMENTATION**

      // Set an allowed distance range in kilometers (e.g., 1 km)
      const allowedDistance = 1000;
      if (props.seat.includes("TABLE")) { // if table is selected
        props.updateStyle(index, 'blue')
        setTableModalIsOpen(true)
        console.log("TABLE SELECTED")
    
      }   
      //else if (distance <= allowedDistance) {**GEO IMPLEMENTATION**
        // If the user is within range, display the modal to claim a seat
      else if (props.seat === "Lectern") { // Checks if lectern seat is clicked for lectern popup
        props.updateStyle(index);
        setlecternModalIsOpen(true)
        console.log("LECTERN SELECTED");
    
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
      //} else {**GEO IMPLEMENTATION**
          //setAlertModalIsOpen(true);
      //}
    //} catch (error) {
      //alert("Unable to get your location. Please check your location settings.");
    //}**GEO IMPLEMENTATION**
  }
 
  function closeModal() {
    setModalIsOpen(false);
    setlecternModalIsOpen(false);
    setChosenModalIsOpen(false)
    setTableModalIsOpen(false)
  }

  function submitInfo() {

    // make a call here to check all seats to make sure
    // that user hasn't already selected a seat. if they haven't allow below

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

          <button class = "submitButton" onClick={() => {submitInfo(); closeModal() }}>Claim</button>
          <button class = "submitButton" onClick={() => closeModal()}>Close</button>

        </div>
        </Modal>
      )}
    </>
  );
}

export default Map;