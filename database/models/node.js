var mongoose = require('mongoose');

var nodeSchema = new mongoose.Schema({
	  content: String,
	  children: []
});

// create model
var Node = mongoose.model(
		'Node',
		new mongoose.Schema({
		  content: String,
		  children: [nodeSchema]
		})
);
//

module.exports = Node;