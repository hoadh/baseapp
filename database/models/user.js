var mongoose = require('mongoose');

// create model
var User = mongoose.model(
		'User',
		new mongoose.Schema({
		  name: String,
		  email:  {type: String, unique: true},
		  password:   String
		})
);
// email:  {type: String, unique: true}. Note that this approach also defies a MongoDB index on the email field

module.exports = User;