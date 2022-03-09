const express = require('express');
const app = express();


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://TestPerson1:MongoDB@cluster0.khzym.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const seat = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
seat.connect(err => {
  const collection = seat.db("USS").collection("seatCreation");
  // perform actions on the collection object


  //seat.close();
});



//const {MongoClient} = require('mongodb')

//async function main(){
    //const uri="mongodb+srv://TestPerson1:MongoDB@cluster0.khzym.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

  //  const seat = new MongoClient(uri);
//	try{
  //      await seat.connect();
//		await updateSeatbyNumber(seat, "Seat 1", {studentName: "Timmy G", userName: "TG"});


//    } catch (e){
  //      console.error(e)
   // } finally {
    //    await seat.close();
    //}
    


//}
//main().catch(console.error);

// Define the port.
const port = process.env.PORT || 8080;


// Define directory where static files will be served to run in the browser.
app.use(express.static(__dirname + '/public'));

app.use(express.static(__dirname + '/public.display'), (req, res) => {
	updateSeatbyNumber(seat, "Seat 1", {studentName: "Timmy G", userName: "TG"});
	res.send(document.getElementById("Box1").innerText = studentName + "/n"+userName)
//	document.getElementById("box1").innerText = studentName + "/n"+userName;


})

app.use('/mongo/', (req, res) => {
	res.send('MongoDB! - JU');
    doMongo();
    

})

const logMessage = 'Application listening at http://localhost:' + port;
app.listen(port, () => {
	console.log(logMessage);
	console.log('...press  Ctrl-C to terminate.\n');
})

function doMongo() {
    console.log("Do Mongo");
}


function updateSeatbyNumber(seat, name, updatedInfo){
    const result = seat.db("USS").collection("seatCreation").updateOne({name: name}, {$set: updatedInfo})

    console.log(`${result.matchedCount} documents matched the search`);
    console.log(`${result.modifiedCount} documents were updated`);
	//var correctText = document.getElementById("box1").innerText = studentName + "/n"+userName;

}