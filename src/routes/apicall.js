const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const request = require('request');

router.use(bodyParser.json());

const {User} = require('./../models/user');

/*============================================================================
// This will get all users in the MongoDB. This is only for test purposes.
============================================================================*/
router.get('/', function(req, res, next) {
	User.find( {}, '', function(err, users) {
		if (err) {
			return next(err);
		}
		res.send(users);
	});
})

/*============================================================================
// Upon visiting the Homepage, a GET request will be sent to CoinMarketCap
// to grab data for the top 100 cryptos by marketshare. These will be passed 
// down to the front end to be displayed to the user.
============================================================================*/
router.get('/api/listcryptos', function(req, res, next) {
	request(`https://api.coinmarketcap.com/v1/ticker/?limit=100`, function (error, response, body) {
	  if (!error) {
			res.send(body);
	  } else {
			console.log(error);
	  }
	})
})

/*============================================================================
// Upon searching or clicking on a crypto, a GET request will be sent to 
// CoinMarketCapInstagram to grab data for that crypto. This data will then
// be passed down to the front end to be displayed to the user.
============================================================================*/
router.get('/api/searchcrypto', function(req, res, next) {
	request(`https://api.coinmarketcap.com/v1/ticker/${query}/`, function (error, response, body) {
	  if (!error) {
			res.send(body);
	  } else {
			console.log(error);
	  }
	})
})

module.exports = router;