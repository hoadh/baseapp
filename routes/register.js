var router = require('express').Router();
var User = require('../database/models/user');
var mongoose = require('mongoose');

router.get('/', function(req,res) {
	res.render('register', {title : 'Register'});
});

router.post('/', function(req,res) {
	var body = req.body;
	
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
		
		// Check to see if the user already exists
		User.findOne({
			email : body.email
		}, function(err, user) {
			if (err) {
				console.log('Couldn\'t create new user ' + body.email);
				res.status(500).json({
					'message': 'Internal server error from signing up new user. Please contact support@yourproject.com.'
				});
			}
			
			// If the user doesn't exist then create one
			if (!user) {
				
				var regUser = new User({
					email: body.email,
					name : body.name,
					password: body.password
				});
				
				regUser.save(function (err, regUser, numberAffected) {
					if (err) {
						console.log(err);
						res.status(500).json({
							'message': 'Database error trying to sign up. Please contact support@yourproject.com.'
						});
					}
					
					// res.send('Registered email: '+body.email);
					res.status(201).json({
						'message': 'Successfully created new user'
					});
				});
			}
			// If the user already exists...
			else {
				res.status(409).json({
					'message': body.email + ' already exists!'
				});
			}
		});
	});
	
});

module.exports = router;