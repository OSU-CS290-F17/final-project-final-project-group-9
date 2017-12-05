var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var app = express();
app.use(bodyParser.json());
var mdb;
var mongoURL = 'mongodb://student:student@gettingstarted-shard-00-00-2q4vt.mongodb.net:27017,gettingstarted-shard-00-01-2q4vt.mongodb.net:27017,gettingstarted-shard-00-02-2q4vt.mongodb.net:27017/test?ssl=true&replicaSet=GettingStarted-shard-0&authSource=admin'

app.get('/data/:id',function(req,res,next){
	var workouts = mdb.collection('workouts');
	var workoutId = parseInt(req.params.id);
	workoutCursor =workouts.find({id:workoutId});
	workoutCursor.next(function(err,doc){
		if(err){
			res.status(500).send("Error fetching workout from database.");
		} else if(!doc){
			next();
		}else{
			res.send(doc);
			console.log("doc id: "+doc.id+" doc name: "+doc.name);
		}
	})


});

app.get('/test', function(req,res,next){
	console.log("got it");
});

app.get('*',function(req,res,next){
	res.status(404).send("404 file not found");
})

MongoClient.connect(mongoURL,function(err, db)
{
	if(err)
	{
		throw err;
	}
	mdb = db;
	var workouts = mdb.collection('workouts');
	var workoutsCursor = workouts.find({type: 2});
	workoutsCursor.toArray(function(err, workoutDocs){
		if(err){
			res.status(500).send("Error fetching workouts from database.");
		}else{
			console.log("number of workouts: "+workoutDocs.length);
			console.log("workout:"+workoutDocs[0].id);
		}
	})
	app.listen(8000, function(){
		console.log("== Server listening on port 8000");
	});
});

