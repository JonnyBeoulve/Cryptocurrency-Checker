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
// before the client state is set to logged in. Additional features will be
// available when signed in.
============================================================================*/
router.post('/signin', function(req, res, next) {
	if (req.body.username && req.body.password) {
	  User.authenticate(req.body.username, req.body.password, function (error, user) {
			if (error || !user) {
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

/*============================================================================
// When a user clicks the follow button on a Crypto Detail Modal, the system
// will attempt to add that cryptocurrency to the user's profile. If the
// cryptocurrency is already followed, then a message will be displayed to
// the user.
============================================================================*/
router.update('/follow', function(req, res, next) {
	if (!req.session.userId) {
		console.log("User isn't currently signed in!");
		return;
	} else {
		User.update(req.body, {
			where: [{ 
				id: req.params.id 
			}]})
			.then(function() {
				res.location('/').status(201).json();
			}).catch(errors => {
				console.log('Error occurred during update.', errors);
				return;
		  });
	}
})

module.exports = router;