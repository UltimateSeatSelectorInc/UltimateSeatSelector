// create app with express
const express = require('express')
const app = express()
var url = require('url')
app.use(express.static(__dirname + '/static'))
const port = process.env.PORT || 8080;

// initializing the database
var admin = require("firebase-admin");

var serviceAccount = require(__dirname + '/firebase-private-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ultimate-seat-selector-15f36-default-rtdb.firebaseio.com"
});

var db = admin.database()
var ref = db.ref()

// import libraries required for reading/parsing SVGs
const fs = require('fs')
const { parse } = require('svgson');

// read the SVG file
var readStream = fs.createReadStream('static/images/seatselect.svg', 'utf-8')

// create an array of seat names for the svg file
seats = [
  '2A', '2B', '2C', '2D', '2E', '2F',
  '4A', '4B', '4C', '4D', '4E', '4F',
  '5A', '5B', '5C', '5D', '5E', '5F',
  '1B', '1A', '1E', '4N', '2N', '1D', 
  '1C', '3B', '3A', '3E', '3D', '3C', 
  '1F', '3F','Lectern', '3N', '1N', '5N'
]

/* These values are not ordered alphabetically or numerically, they are 
ordered in the way that the svg file ordered the rectangles. If the seat name
contains an 'N', it will later not be considered and thrown out because it is
not a seat but rather an element that had not been compressed */

var data = ""

// Parse the SVG file
readStream.on("data", chunk => {
  data += chunk
}).on('end', () => {
  parse(data).then(json => {
      svg = json
      // only get objects we need from data stream and then filter for rectangles
      rectObjects = svg.children[2].children[0]
      let result = rectObjects.children.filter(item => item.name === 'rect')

      // for loop to give attributes to each seat
      for(let i = 0; i < result.length; i++){
              result[i].seat = seats[i] // assign the seat names
              result[i].chosen = false
              result[i].attributes.height = Number(result[i].attributes.height)
              result[i].attributes.width = Number(result[i].attributes.width)
              result[i].attributes.x = Number(result[i].attributes.x)
              result[i].attributes.y = Number(result[i].attributes.y)
              // height, width, x and y coords changed to nums to make them easier to change
         }

      // Use filter to remove seats with 'N' in the name (not a seat)
      let resultF = result.filter(function(noN) {
        return (!noN.seat.includes("N")) // result elements without 'N' in the name
      });

    //Sending the result to the database.  
    //ref.set(resultF)

  })
  .catch((err) => console.log(err))
})

// listen on the port
app.listen(port, () => console.log(
  `Express started on http://localhost:${port}; ` +
  `press Ctrl-C to terminate.`))