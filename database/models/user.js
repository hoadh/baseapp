var mongoose = require('mongoose');

var User = mongoose.model(
		'User',
		new mongoose.Schema({
		  email:  String,
		  name: String,
		  password:   String
		})
);

module.exports = User;