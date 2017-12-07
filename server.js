var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var app = express();
var path = require('path'); // Import path module
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
			res.status(200).send(doc);
			console.log("doc id: "+doc.id+" doc name: "+doc.name);
		}
	})
});

app.get('/data/type/:id', function(req,res,next){
	var workouts = mdb.collection('workouts');
	var workoutsCursor = workouts.find({type: parseInt(req.params.id)});
	workoutsCursor.toArray(function(err, workoutDocs){
		if(err){
			res.status(500).send("Error fetching workouts from database.");
		}else if(!workoutDocs){
			next();
		}else{
			res.status(200).send(workoutDocs);
		}
	});
});

app.post('/data/new', function(req, res, next){
	var workouts = mdb.collection('workouts');
	length = workouts.count();
	console.log(req);
	if(req.body && req.body.name && req.body.description&& req.body.duration && req.body.intensity && req.body.longdesc && req.body.type){
		workouts.insertOne({
			id: length,
			name: req.body.name,
			description: req.body.description,
			duration: req.body.duration,
			intensity: req.body.intensity,
			longdesc: req.body.longdesc,
			type: parseInt(req.body.type)
		}, function(err, res){
			if(err){
				res.status(500).send("Error inserting photo into database");
			}else{
				res.status(200).send("Success.");
			}
		});
	}else{
		res.status(400).send("Request must have all fields of a workout");
	}
});

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/index.html'));
});
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/index.html'));
});

MongoClient.connect(mongoURL,function(err, db)
{
	if(err)
	{
		throw err;
	}
	mdb = db;

	app.listen(8000, function(){
		console.log("== Server listening on port 8000");
	});
});
