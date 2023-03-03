import React, { useState } from 'react';
import Modal from 'react-modal';

function Map(props) {
  const [hover, setHover] = useState(false);
  const [wasSelected, setWasSelected] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // function that changes color of the square on hover
  function handleHover() {
    setHover(true);
  }

  // function that changes color of the square on click
  function handleClick(){
    const index = props.index;
    if (!props.chosen || props.seatStyle === index) {
        props.updateStyle(index);
        setModalIsOpen(true);
    }
    if (props.chosen || props.seatStyle === index) {
        props.updateStyle(null);
        setModalIsOpen(false);
    }
    
}

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <>
      <text
        display={hover || props.seatStyle === props.index ? 'block' : 'none'}
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
        onMouseEnter={() => handleHover()} // call functions to handle hover/click
        onMouseLeave={() => setHover(false)}
        onClick={() => handleClick()} // will work even though already chosen... need to change this later
        x={props.x}
        y={props.y}
        height={props.height}
        width={props.width}
        fill={
          // fill color changes depending on selection, hover, occupancy
          props.chosen && hover && props.updateStyle
            ? '#707070'
            : props.chosen && props.seatStyle === props.index
            ? '#707070'
            : props.chosen
            ? 'grey'
            : hover || props.seatStyle === props.index
            ? 'blue'
            : 'black'
        }
      ></rect>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            contentLabel="Example Modal"
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 999
                },
                content: {
                    width: '25%',
                    height: '25%',
                    top: '25%',
                    left: '15%',
                    transform: 'translate(-50%, -50%)'
                }
            }}
        >
            <h2>Seat {props.seat} Selected!</h2>
            <button onClick={() => setModalIsOpen(false)}>Close</button>
        </Modal>
    </>
  );
}

export default Map;

