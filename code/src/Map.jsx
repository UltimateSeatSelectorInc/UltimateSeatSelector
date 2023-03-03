import React, { useState } from "react";
import Modal from "react-modal";

function Map(props) {
  const [hover, setHover] = useState(false);
  const [wasSelected, setWasSelected] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [lecternModalIsOpen, setlecternModalIsOpen] = useState(false);

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
    }
    if (props.chosen || props.seatStyle === index) {// Checks if lectern seat is being deselected
      if(props.index===30){
        console.log(props.index)
        props.updateStyle(null);
        setlecternModalIsOpen(false);
      }
      else{
        props.updateStyle(null);
        console.log("Seat deselected!");
        setModalIsOpen(false);
      }

    }
  }

  function closeModal() {
    setModalIsOpen(false);
    setlecternModalIsOpen(false);
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
        height={props.height}
        width={props.width}
        fill={
          props.chosen && hover && props.updateStyle
            ? "#707070"
            : props.chosen && props.seatStyle === props.index
            ? "#707070"
            : props.chosen
            ? "grey"
            : hover || props.seatStyle === props.index
            ? "blue"
            : "black"
        }
      ></rect>
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
              width: "25%",
              height: "25%",
              top: "25%",
              left: "15%",
              transform: "translate(-50%, -50%)",
            },
          }}
        >
          <h2>Seat {props.seat} Selected!</h2>
          <button onClick={() => closeModal()}>Close</button>
        </Modal>
      )}
    </>
  );
}

export default Map;
