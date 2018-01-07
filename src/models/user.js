const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const validator = require('validator');

/*============================================================================
// User schema.
============================================================================*/
var UserSchema = new mongoose.Schema ({
	username: {
		type: String, 
		required: true,
		unique: true,
		minlength: 5,
		maxlength: 15
	},
	password: {
		type: String, 
		required: true,
		minlength: 5,
		maxlength: 15
	},
	emailAddress: {
		type: String, 
		required: true, 
		unique: true, 
		validate: {
			isAsync: false,
			validator: validator.isEmail, 
				message: 'Not a valid email.'
		},
	followedCryptos: {
		type: Array,
		required: false,
		unique: false,
		maxlength: 10
		}
	}
})

/*============================================================================
// Authenticate input against database documents
============================================================================*/
UserSchema.statics.authenticate = function(emailAddress, password, callback) {
	User.findOne({ emailAddress: emailAddress })
		.exec(function (error, user) {
		  if (error) {
			return callback(error);
		  } else if ( !user ) {
			var err = new Error('User not found.');
			err.status = 401;
			return callback(err);
		  }

		  bcrypt.compare(password, user.password , function(error, result) {
			if (result === true) {
			  return callback(null, user);
			} else {
			  return callback();
			}
		  })
		});
  }

/*============================================================================
// Hash password before saving to database
============================================================================*/
UserSchema.pre('save', function(next) {
	var user = this;
	bcrypt.hash(user.password, 10, function(err, hash) {
		if (err) {
		return next(err);
		}
		user.password = hash;
		next();
	})
});

var User = mongoose.model('User', UserSchema);

module.exports = {User};