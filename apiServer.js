var env = require('node-env-file');

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

// store user sessions in mongoDB
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

try {
	env(__dirname + '/config/productionDB.env');
} catch (e) {
	console.log('no config file found');
}

//=======================================
//=======================================
// APIs 
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/bookshop');
mongoose.connect(process.env.PRODUCTION_DB);

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Setup Sessions Middleware
var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));

// create session
app.use(session({
	secret: 'mySecretString',
	saveUninitialized: false,
	resave: false,
	cookie: {maxAge: 250 * 60 * 60 * 24 * 2},
	store: new MongoStore({mongooseConnection: db, ttl: 1 * 1 * 60 * 60})
	//ttl: 1 days * 1 hours * 60 min * 60 sec
	// ecommerce could store up to 2 weeks
}));

// save to session API
app.post('/cart', function(req, res){
	var cart = req.body;
	req.session.cart = cart;
	req.session.save(function(err){
		if(err){
			console.log('### API POST CART SESSION: ', err);
		}
			console.log('### API POST CART SESSION:::', req.session.cart);
		res.json(req.session.cart);
	})
});

// get the session API
app.get('/cart', function(req, res){
	console.warn('express get request');
	if(typeof req.session.cart !== 'undefined'){
		res.json(req.session.cart);
	}
});


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// IMAGES API
app.get('/images', function(req, res){
	const imgFolder = __dirname + '/public/images';
	// require file system from node
	const fs = require('fs');
	fs.readdir(imgFolder, function(err, files){
		if(err){
			return console.log('File Reader Error:',err);
		}
		
		const filesArr = files.map( function(item){
			return {name: item};
		});

		res.json(filesArr);
	});
});



//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// API schema
var Books = require('./models/books.js');


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Post Books
app.post('/books', function(req, res){
	var book = req.body;

	Books.create(book, function(err, books){
		if(err){
			throw err;
		}
		console.log('Express BOOKS:::',books);
		res.json(books);
	})
});


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Get Books
app.get('/books', function(req, res){
	Books.find(function(err, books){
		if(err){
			throw err;
		}
		res.json(books);
	})
});


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Update Books
app.put('/books/:_id', function(req, res){
	var book = req.body;
	var query = {_id: req.params._id};
	//if the field doesn't exist $set will create a new field for the record
	var update = {
		'$set': {
			title: book.title,
			description: book.description,
			image: book.image,
			price: book.price
		}
	};
	//when true returns the updated document
	var options = {new: true};

	Books.findOneAndUpdate(query, update, options, function(err, books){
		if(err){
			throw err;
		}
		// allows you to see the json result of the action to MongoDB
		res.json(books);
	});
});


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Delete Books - when this request is made
app.delete('/books/:_id', function(req, res){
	var query = {_id: req.params._id};
	//Mongo Method
	Books.remove(query, function(err, books){
		if(err){
			//throw err;
			console.log('# API Delete Books', err);
		}
		res.json(books);
	});
});

// END API
//=======================================
//=======================================

// Original:
// app.use('/', index);
// app.use('/users', users);

app.listen(3001, function(err){
	if(err){
		return console.log(err);
	}
	console.log('API Server is listening on http://localhost:3001');
});

