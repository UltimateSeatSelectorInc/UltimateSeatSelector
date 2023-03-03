import React, { useState } from "react";
import Modal from "react-modal";
import { submitChoice } from "./Maploader";

function Map(props) {
  const [hover, setHover] = useState(false);
  const [wasSelected, setWasSelected] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [lecternModalIsOpen, setlecternModalIsOpen] = useState(false);
  const [chosenModalIsOpen, setChosenModalIsOpen] = useState(false);

  function handleHover() {
    setHover(true);
  }

  function handleClick() {
    const index = props.index;
    if (props.index === 30) { // Checks if lectern seat is clicked for lectern popup
      props.updateStyle(index);
      console.log("lectern seat selected!");
      setlecternModalIsOpen(true);
    } else if (!props.chosen || props.seatStyle === index) { // If not, display regular popup
      props.updateStyle(index);
      console.log("Regular seat selected!");
      setModalIsOpen(true);
    } else if (props.chosen) { // If already chosen, display information popup
      props.updateStyle(index);
      setModalIsOpen(false);
      setlecternModalIsOpen(false);
      setChosenModalIsOpen(true);
    }
    if (props.chosen || props.seatStyle === index) {// Checks if lectern seat is being deselected
      if(props.index===30){
        console.log(props.index)
        props.updateStyle(null);
        setlecternModalIsOpen(false);
      }
    }
  }

  function closeModal() {
    setModalIsOpen(false);
    setlecternModalIsOpen(false);
    setChosenModalIsOpen(false)
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
            isOpen={modalIsOpen}
            onRequestClose={() => closeModal()}
            contentLabel="Example Modal"
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 999,
  
              },
              content: {
                width: "30%",
                height: "30%",
                top: "35%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "light-grey",
                border: "black"
              },
            }}
          >
          <div class = "popupStyle">
            <h2>Table {props.seat[0]}, Seat {props.seat} </h2>
  
            <table class = "inputTable">
                  <tr>
                      <td>Seat Claimed by: {props.name}</td>
                  </tr>
                  <tr>
                      <td></td>
                  </tr>
                      
                  
              </table>
            <button class = "submitButton" onClick={() => closeModal()}>Close</button>
          </div>
          </Modal>
        ) : null}

      {lecternModalIsOpen ? (
        <Modal // Lectern Modal - popup
          isOpen={lecternModalIsOpen}
          onRequestClose={() => setlecternModalIsOpen(false)}
          contentLabel="Lectern Modal"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 999,
            },
            content: {
              width: "25%",
              height: "25%",
              top: "25%",
              left: "15%",
              transform: "translate(-50%, -50%)",
            },
          }}
        >
          <h2>This is a lectern seat!</h2>
          <h3>Professor Credentials: </h3>
          Name: <input type="text"></input><br></br><br></br>
          Email: <input type="email"></input><br></br><br></br><br></br>

          <button onClick={() => closeModal()}>Close</button>
        </Modal>
      ) : (
        <Modal // Regular Modal - popup
          isOpen={modalIsOpen}
          onRequestClose={() => closeModal()}
          contentLabel="Example Modal"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 999,

            },
            content: {
              width: "30%",
              height: "30%",
              top: "35%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "light-grey",
              border: "black"
            },
          }}
        >
        <div class = "popupStyle">
          <h2>Table {props.seat[0]}, Seat {props.seat} </h2>

          <table class = "inputTable">
                <tr>
                    <td class = "cell"><input class = "InputBox" type = "text" id = "inputName"
                        placeholder = "Full Name" maxlength = "100"></input></td>
                </tr>
                <tr>
                    <td class = "cell"><input class = "InputBox" type = "text" id = "inputEmail"
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