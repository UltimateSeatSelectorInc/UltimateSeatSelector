const express = require('express');
const { request } = require('http');
const { parse } = require('path');
app = express()

var url = require('url');
var dt = require('./date-time');

const port = process.env.PORT || 3000
const majorVersion = 1
const minorVersion = 2

// Use Express to publish static HTML, CSS, and JavaScript files that run in the browser. 
app.use(express.static(__dirname + '/static'))

// The app.get functions below are being processed in Node.js running on the server.
// Implement a custom About page.
app.get('/about', (request, response) => {
	console.log('Calling "/about" on the Node.js server.')
	response.type('text/plain')
	response.send('About Node.js on Azure Template.')
})

app.get('/version', (request, response) => {
	console.log('Calling "/version" on the Node.js server.')
	response.type('text/plain')
	response.send('Version: '+majorVersion+'.'+minorVersion)
})
app.get('/my-function-0', (request, response) =>{
	console.log('Calling "/,myFunction0" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let xName = (inputs.firstName)
	let yName = (inputs.userName)
	let seatInfo = (xName +" "+ yName)
	response.type('text/plain')
	console.log(xName)
	response.send("Teacher's Seat: <br>"+JSON.stringify(seatInfo));
	
})

app.get('/my-function-1', (request, response) =>{
	console.log('Calling "/,myFunction1" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let xName = (inputs.firstName)
	let yName = (inputs.userName)
	let seatInfo = (xName +" "+ yName)
	response.type('text/plain')
	console.log(xName)
	response.send("Seat 1: <br>"+JSON.stringify(seatInfo));
	
})

app.get('/my-function-2', (request, response) =>{
	console.log('Calling "/,myFunction2" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let xName = (inputs.firstName)
	let yName = (inputs.userName)
	let seatInfo = (xName +" "+ yName)
	response.type('text/plain')
	console.log(xName)
	response.send("Seat 2: <br>"+JSON.stringify(seatInfo));
	
})

app.get('/my-function-3', (request, response) =>{
	console.log('Calling "/,myFunction3" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let xName = (inputs.firstName)
	let yName = (inputs.userName)
	let seatInfo = (xName +" "+ yName)
	response.type('text/plain')
	console.log(xName)
	response.send("Seat 3: <br>"+JSON.stringify(seatInfo));
	
})
app.get('/my-function-4', (request, response) =>{
	console.log('Calling "/,myFunction4" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let xName = (inputs.firstName)
	let yName = (inputs.userName)
	let seatInfo = (xName +" "+ yName)
	response.type('text/plain')
	console.log(xName)
	response.send("Seat 4: <br>"+JSON.stringify(seatInfo));
	
})
app.get('/my-function-5', (request, response) =>{
	console.log('Calling "/,myFunction5" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let xName = (inputs.firstName)
	let yName = (inputs.userName)
	let seatInfo = (xName +" "+ yName)
	response.type('text/plain')
	console.log(xName)
	response.send("Seat 5: <br>"+JSON.stringify(seatInfo));
	
})

app.get('/my-function-6', (request, response) =>{
	console.log('Calling "/,myFunction6" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let xName = (inputs.firstName)
	let yName = (inputs.userName)
	let seatInfo = (xName +" "+ yName)
	response.type('text/plain')
	console.log(xName)
	response.send("Seat 6: <br>"+JSON.stringify(seatInfo));
	
})
app.get('/my-function-7', (request, response) =>{
	console.log('Calling "/,myFunction7" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let xName = (inputs.firstName)
	let yName = (inputs.userName)
	let seatInfo = (xName +" "+ yName)
	response.type('text/plain')
	console.log(xName)
	response.send("Seat 7: <br>"+JSON.stringify(seatInfo));
	
})
app.get('/my-function-8', (request, response) =>{
	console.log('Calling "/,myFunction8" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let xName = (inputs.firstName)
	let yName = (inputs.userName)
	let seatInfo = (xName +" "+ yName)
	response.type('text/plain')
	console.log(xName)
	response.send("Seat 8: <br>"+JSON.stringify(seatInfo));
	
})
app.get('/my-function-9', (request, response) =>{
	console.log('Calling "/,myFunction9" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let xName = (inputs.firstName)
	let yName = (inputs.userName)
	let seatInfo = (xName +" "+ yName)
	response.type('text/plain')
	console.log(xName)
	response.send("Seat 9: <br>"+JSON.stringify(seatInfo));
	
})
app.get('/my-function-10', (request, response) =>{
	console.log('Calling "/,myFunction10" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let xName = (inputs.firstName)
	let yName = (inputs.userName)
	let seatInfo = (xName +" "+ yName)
	response.type('text/plain')
	console.log(xName)
	response.send("Seat 10: <br>"+JSON.stringify(seatInfo));
	
})
app.get('/my-function-11', (request, response) =>{
	console.log('Calling "/,myFunction11" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let xName = (inputs.firstName)
	let yName = (inputs.userName)
	let seatInfo = (xName +" "+ yName)
	response.type('text/plain')
	console.log(xName)
	response.send("Seat 11: <br>"+JSON.stringify(seatInfo));
	
})
app.get('/my-function-12', (request, response) =>{
	console.log('Calling "/,myFunction12" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let xName = (inputs.firstName)
	let yName = (inputs.userName)
	let seatInfo = (xName +" "+ yName)
	response.type('text/plain')
	console.log(xName)
	response.send("Seat 12: <br>"+JSON.stringify(seatInfo));
	
})
app.get('/my-function-13', (request, response) =>{
	console.log('Calling "/,myFunction13" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let xName = (inputs.firstName)
	let yName = (inputs.userName)
	let seatInfo = (xName +" "+ yName)
	response.type('text/plain')
	console.log(xName)
	response.send("Seat 13: <br>"+JSON.stringify(seatInfo));
	
})
app.get('/my-function-14', (request, response) =>{
	console.log('Calling "/,myFunction14" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let xName = (inputs.firstName)
	let yName = (inputs.userName)
	let seatInfo = (xName +" "+ yName)
	response.type('text/plain')
	console.log(xName)
	response.send("Seat 14: <br>"+JSON.stringify(seatInfo));
	
})
app.get('/my-function-15', (request, response) =>{
	console.log('Calling "/,myFunction15" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let xName = (inputs.firstName)
	let yName = (inputs.userName)
	let seatInfo = (xName +" "+ yName)
	response.type('text/plain')
	console.log(xName)
	response.send("Seat 15: <br>"+JSON.stringify(seatInfo));
	
})
app.get('/my-function-16', (request, response) =>{
	console.log('Calling "/,myFunction16" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let xName = (inputs.firstName)
	let yName = (inputs.userName)
	let seatInfo = (xName +" "+ yName)
	response.type('text/plain')
	console.log(xName)
	response.send("Seat 16: <br>"+JSON.stringify(seatInfo));
	
})
app.get('/my-function-17', (request, response) =>{
	console.log('Calling "/,myFunction17" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let xName = (inputs.firstName)
	let yName = (inputs.userName)
	let seatInfo = (xName +" "+ yName)
	response.type('text/plain')
	console.log(xName)
	response.send("Seat 17: <br>"+JSON.stringify(seatInfo));
	
})
app.get('/my-function-18', (request, response) =>{
	console.log('Calling "/,myFunction18" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let xName = (inputs.firstName)
	let yName = (inputs.userName)
	let seatInfo = (xName +" "+ yName)
	response.type('text/plain')
	console.log(xName)
	response.send("Seat 18: <br>"+JSON.stringify(seatInfo));
	
})
app.get('/my-function-19', (request, response) =>{
	console.log('Calling "/,myFunction19" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let xName = (inputs.firstName)
	let yName = (inputs.userName)
	let seatInfo = (xName +" "+ yName)
	response.type('text/plain')
	console.log(xName)
	response.send("Seat 19: <br>"+JSON.stringify(seatInfo));
	
})
app.get('/my-function-20', (request, response) =>{
	console.log('Calling "/,myFunction20" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let xName = (inputs.firstName)
	let yName = (inputs.userName)
	let seatInfo = (xName +" "+ yName)
	response.type('text/plain')
	console.log(xName)
	response.send("Seat 20: <br>"+JSON.stringify(seatInfo));
	
})
app.get('/my-function-21', (request, response) =>{
	console.log('Calling "/,myFunction21" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let xName = (inputs.firstName)
	let yName = (inputs.userName)
	let seatInfo = (xName +" "+ yName)
	response.type('text/plain')
	console.log(xName)
	response.send("Seat 21: <br>"+JSON.stringify(seatInfo));
	
})
app.get('/my-function-22', (request, response) =>{
	console.log('Calling "/,myFunction22" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let xName = (inputs.firstName)
	let yName = (inputs.userName)
	let seatInfo = (xName +" "+ yName)
	response.type('text/plain')
	console.log(xName)
	response.send("Seat 22: <br>"+JSON.stringify(seatInfo));
	
})
app.get('/my-function-23', (request, response) =>{
	console.log('Calling "/,myFunction23" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let xName = (inputs.firstName)
	let yName = (inputs.userName)
	let seatInfo = (xName +" "+ yName)
	response.type('text/plain')
	console.log(xName)
	response.send("Seat 23: <br>"+JSON.stringify(seatInfo));
	
})
app.get('/my-function-24', (request, response) =>{
	console.log('Calling "/,myFunction24" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let xName = (inputs.firstName)
	let yName = (inputs.userName)
	let seatInfo = (xName +" "+ yName)
	response.type('text/plain')
	console.log(xName)
	response.send("Seat 24: <br>"+JSON.stringify(seatInfo));
	
})
app.get('/my-function-25', (request, response) =>{
	console.log('Calling "/,myFunction25" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let xName = (inputs.firstName)
	let yName = (inputs.userName)
	let seatInfo = (xName +" "+ yName)
	response.type('text/plain')
	console.log(xName)
	response.send("Seat 25: <br>"+JSON.stringify(seatInfo));
	
})
app.get('/my-function-26', (request, response) =>{
	console.log('Calling "/,myFunction26" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let xName = (inputs.firstName)
	let yName = (inputs.userName)
	let seatInfo = (xName +" "+ yName)
	response.type('text/plain')
	console.log(xName)
	response.send("Seat 26: <br>"+JSON.stringify(seatInfo));
	
})
app.get('/my-function-27', (request, response) =>{
	console.log('Calling "/,myFunction27" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let xName = (inputs.firstName)
	let yName = (inputs.userName)
	let seatInfo = (xName +" "+ yName)
	response.type('text/plain')
	console.log(xName)
	response.send("Seat 27: <br>"+JSON.stringify(seatInfo));
	
})
app.get('/my-function-28', (request, response) =>{
	console.log('Calling "/,myFunction28" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let xName = (inputs.firstName)
	let yName = (inputs.userName)
	let seatInfo = (xName +" "+ yName)
	response.type('text/plain')
	console.log(xName)
	response.send("Seat 28: <br>"+JSON.stringify(seatInfo));
	
})
app.get('/my-function-29', (request, response) =>{
	console.log('Calling "/,myFunction29" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let xName = (inputs.firstName)
	let yName = (inputs.userName)
	let seatInfo = (xName +" "+ yName)
	response.type('text/plain')
	console.log(xName)
	response.send("Seat 29: <br>"+JSON.stringify(seatInfo));
	
})
app.get('/my-function-30', (request, response) =>{
	console.log('Calling "/,myFunction30" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let xName = (inputs.firstName)
	let yName = (inputs.userName)
	let seatInfo = (xName + " "+ yName)
	response.type('text/plain')
	console.log(xName)
	response.send("Seat 30: <br>"+JSON.stringify(seatInfo));
	
})


app.get('/fetch-virtual-result', (request, response) =>{
	console.log('Calling "/,myFunction30" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let xName = (inputs.firstName)
	let yName = (inputs.userName)
	let seatInfo = (xName + " "+ yName)
	response.type('text/plain')
	console.log(xName)
	response.send("<br>"+JSON.stringify(seatInfo));
	
})


// Test a variety of functions.
app.get('/test', (request, response) => {
    // Write the request to the log. 
    console.log(request);

    // Return HTML.
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('<h3>Testing Function</h3>')

    // Access function from a separate JavaScript module.
    response.write("The date and time are currently: " + dt.myDateTime() + "<br><br>");

    // Show the full url from the request. 
    response.write("req.url="+request.url+"<br><br>");

    // Suggest adding something tl the url so that we can parse it. 
    response.write("Consider adding '/test?year=2017&month=July' to the URL.<br><br>");
    
	// Parse the query string for values that are being passed on the URL.
	var q = url.parse(request.url, true).query;
    var txt = q.year + " " + q.month;
    response.write("txt="+txt);

    // Close the response
    response.end('<h3>The End.</h3>');
})

// Custom 404 page.
app.use((request, response) => {
  response.type('text/plain')
  response.status(404)
  response.send('404 - Not Found')
})

// Custom 500 page.
app.use((err, request, response, next) => {
  console.error(err.message)
  response.type('text/plain')
  response.status(500)
  response.send('500 - Server Error')
})

app.listen(port, () => console.log(
  `Express started at \"http://localhost:${port}\"\n` +
  `press Ctrl-C to terminate.`)
)