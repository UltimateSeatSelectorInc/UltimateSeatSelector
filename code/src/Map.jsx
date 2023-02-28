import React, {useState} from 'react'

function Map(props){

    const [hover, setHover] = useState(false)

    // function that changes color of the square on hover
    function handleHover(){
        setHover(true);
    }

    // function that changes color of the square on click
    function handleClick(){
        const index = props.index
        props.updateStyle(index)
    }

    return( 
        <>
            <text 
                display = {hover || props.seatStyle === props.index ? "block" : "none"}
                x = {props.x}
                y = {props.y + 50}
                fontSize = "10"
                fill = "black"
                height = {props.height}
                width = {props.width}>
                    {props.seat}
            </text>
            <rect // styling for the rectangle objects
                onMouseEnter = {() => handleHover()} // call functions to handle hover/click
                onMouseLeave = {() => setHover(false)}
                onClick = { () => handleClick() } // will work even tho already chosen... need to change this later
                x = {props.x}
                y = {props.y}
                height = {props.height}
                width = {props.width}
                fill = {
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
                    }>
                        
            </rect>
        </>
    )
}

export default Map