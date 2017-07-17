"use strict"
var express = require('express');
var path = require('path');


//INSTANT EXPRESS OBJECT
var app = express();

// MIDDLEWARE TO DEFINE STATIC FILES OR IMAGES
app.use(express.static('public'));

app.get('*', function(req,res){
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

const myPort = 3000;

app.listen(myPort, () => {
	console.log('app is listening on port: ' + myPort);
});