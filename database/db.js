var mongoose = require('mongoose');

var dbURI = 'mongodb://localhost:27017/test';
mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
	console.log('Mongoose connected to '+ dbURI);
});
mongoose.connection.on('error', function (err) {
	console.log('Mongoose connection error :'+ err);
});
mongoose.connection.on('disconnected', function () {
	console.log('Mongoose disconnected!');
});

process.on('SIGINT', function() {
	mongoose.connection.close(function() {
		console.log('Mongoose disconnected on through application termination');
		process.exit(0);
	});
});