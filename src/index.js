'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const session = require('express-session');
const path = require('path');

const accountRoutes = require('./routes/account');
const apicallRoutes = require('./routes/apicall');
const {User} = require('./models/user');

/*============================================================================
// Establish connection to Mongo database and set port as well as database. 
// By default it will connect to a private mLab MongoDB database. If running
// locally, a local MongoDB will be utilized (you will need to set this up). 
// If a database error occurs, throw object to console.
============================================================================*/
mongoose.Promise = global.Promise;
mongoose.connect((process.env.MONGOLAB_URI || 'mongodb://localhost:27017/crypto'), {useMongoClient: true});
const port = (process.env.PORT || 5000);
var db = mongoose.connection;

db.on('error', function(err) {
	console.log(err);
})

/*============================================================================
// HTTP methodology to import the Api Call and Contact routes.
============================================================================*/
app.use('/', accountRoutes);
app.use('/', apicallRoutes);

/*============================================================================
// Set port to 5000 and initiate Morgan logging functionality.
============================================================================*/
app.set('port', port);
app.use(morgan('dev'));

/*============================================================================
// Static route initiated for public files. These files include the
// post build files from Create React App.
============================================================================*/
app.use(express.static(path.join(__dirname, '/static')));

/*============================================================================
// Error handling.
============================================================================*/
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
})

app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message
		}
	});
})

/*============================================================================
// Begin listenserver. The server port will be used by default, and 5000
// is used when run locally.
============================================================================*/
app.listen((process.env.PORT || 5000), function() {
  	console.log('Server is now running!');
})

module.exports = {app};
