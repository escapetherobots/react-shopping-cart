"use strict"
var express = require('express');
var path = require('path');


//INSTANT EXPRESS OBJECT
var app = express();

// MIDDLEWARE TO DEFINE STATIC FILES OR IMAGES
app.use(express.static('public'));

app.get('/', function(req,res){
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

app.listen(3000, () => {
	console.log('app is listening on port 3000');
});