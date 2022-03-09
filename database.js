var mongodb= require('mongodb');
var URL = "mongodb+srv://TestPerson1:MongoDB@cluster0.khzym.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
var db;
var error;
var waiting=[];

MongoClient.connect(URL, function(err, database){
	error = err;
	db = database;
	waiting.forEach(function(callback){
		callback(err, database);
	});
});

module.exports = function(callback) {
    if (db || error) {
        callback(error, db);
    } else {
        waiting.push(callback)
    }
}