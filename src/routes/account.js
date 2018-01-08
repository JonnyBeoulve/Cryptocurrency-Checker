const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const {User} = require('./../models/user');

router.use(bodyParser.json());

/*============================================================================
// Upon submitting a registration request, this will post the user's username,
// password, and email address to the Mongo database.
============================================================================*/
router.post('/register', function(req, res, next) {
	var user = {
		username: req.body.username,
		password: req.body.password,
		emailAddress: req.body.emailAddress
	};

	User.create(user, (err, user) => {
		if (err) {
			res.status(400);
			return next(err);
		} else {
			res.location('/')
			.status(201).json();
		}
	});
})

/*============================================================================
// Upon entering signin information, a user's credentials will be verified
// before the client state is set to logged in. Several features will be
// available using login.
============================================================================*/
router.post('/signin', function(req, res, next) {
	if (req.body.username && req.body.password) {
	  User.authenticate(req.body.username, req.body.password, function (error, user) {
			if (error || !user) {npm 
		  	var err = new Error('Wrong email or password.');
		  	err.status = 401;
		  	return next(err);
		} else {
				req.session.userId = user._id;
				res.location('/').status(201).json();
			}
	  });
	} else {
			var err = new Error('Email and password are required.');
			err.status = 401;
			return next(err);
	};
})

module.exports = router;