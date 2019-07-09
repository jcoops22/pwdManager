const express = require('express'),
	  mongoose = require('mongoose'),
 	  bodyParser = require('body-parser'),
 	  path = require('path');


const app = express();
const port = process.env.PORT || 4000;
const db = require('./models/entry.js');

// const MongoClient = require('mongodb').MongoClient;

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/pwd-api', {useNewUrlParser: true});


app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '/models')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));






const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('MongoDB connection established successfully.')
});



// routes
app.get('/', (req,res)=>{
	res.sendFile("index.html");
})
// get all documents routes
app.get('/api', (req, res)=>{
	db.EntryModel.find()
    .then(function(entry){
        res.json(entry);
    })
    .catch(function(err){
        res.send(err);
    })
})
app.get('/api/:_id',(req, res)=>{
	db.EntryModel.findOne({_id: req.params._id})
	.then((entry)=>{
		res.json(entry);
		console.log(entry.username);
	})
	.catch((err)=>{
		console.log(err);
	})
})
// post route
app.post('/api', (req, res)=>{
	db.EntryModel.create(req.body)
	res.send(req.body.username  + " posted");
})
// put route
app.put('/api/:_id',(req, res)=>{
		
		db.EntryModel.findOneAndUpdate({_id: req.params._id}, req.body, {useFindAndModify: false})
		
		.then((entry)=>{
			// res.json(entry);
			console.log(`we received the update to ${req.params._id}`);
		})
		.catch((err)=>{
			// res.json(err);
			console.log(err);
		})
		res.send(`${req.body} has been updated.`);
})
// delete route
app.delete('/api/:_id', (req,res)=>{
// get document by username
	db.EntryModel.findOne({_id: req.params._id})
	.then((data)=>{
		console.log(req.params.username);
		data.remove();
		console.log(data.username + ' was removed');
		res.json(data.username + ' was deleted.');
	})
	.catch((err)=>{
		console.log(err);
	})
})







app.listen(port, ()=>{
	console.log("Server is running.");
})










