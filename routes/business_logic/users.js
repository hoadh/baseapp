/****************************
 * users.js
 * Author: hoad
 * Created on: 2014-12-28
 * Description:
 * 		contains all api_test functions 
 ****************************/
var User = require('../../database/models/user');

var users = {
	/**
	 * Get all users from db
	 * @param req
	 * @param res
	 */
	get_all: function (req, res) {
		User.find({}, function(err, user) {
			if (err) {
				res.status(500).json({
				'message': 'Internal server error from getting all users. Please contact support@yourproject.com.'
				});
			}
			res.status(200).json(user);
		});
	},
	
	/**
	 * Create new user
	 * @param
	 * @return message: [string]
	 */
	create_new: function (req,res) {
			var body = req.body;
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
		}
};

module.exports = users;