// create app with express
const express = require('express')
const app = express()
var url = require('url')
app.use(express.static(__dirname + '/static'))
const port = process.env.PORT || 8080;


/////////////////////////////////TESTING PURPOSES///////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// function to test receiving data from front-end, then to database, then to front-end
app.get('/testDatabase', (request, response) => {
  
  // parse the text data from the front-end
  var inputs = url.parse(request.url, true).query
  const theTextData = (inputs.textData)

  // here is where you can test sending it to database, and only send back to front
  // end if it comes back successfully

  // send it back to the front end
  response.send(theTextData)
})

/////////////////////////////////TESTING PURPOSES///////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// listen on the port
app.listen(port, () => console.log(
  `Express started on http://localhost:${port}; ` +
  `press Ctrl-C to terminate.`))