var jwt = require('jwt-simple');
var User = require('../../database/models/user');

var auth = {
	login: function(req, res) {
		var username = req.body.username || '';
		var password = req.body.password || '';
		
		if (username == '' || password == '') {
			res.status(401);
			res.json({
				"status":	401,
				"message":	"Invalid credentials"
			});
			return;
		};
		
		// Fire a query to your DB and check if the credentials are valid
		var dbUserObj = auth.validate(username, password);
		
		// If authentication fails, we send a 401 back
		if (!dbUserObj) {
			res.status(401);
			res.json({
				"status": 401,
				"message": "Invalid credentials"
			});
			return;
		}
		
		// If authentication is success, we will generate a token
		// and dispatch it to the client
		else {
			res.json(getToken(dbUserObj));
		}
	},
	
	validate: function (username, password) {
		
		/*
		// spoofing the DB response for simplicity
		
		User.find({
			username: username
		}, function(err, user) {
			if (err) {
				return '';
			};
			
			var dbUserObj = { // spoofing a userobject from the DB. 
				name: 'arvind',
				role: 'admin',
				username: 'arvind@myapp.com'
			};
			
			return dbUserObj;
		});
		*/
		
		var dbUserObj = { // spoofing a userobject from the DB. 
			name: 'arvind',
			role: 'admin',
			username: 'arvind@myapp.com'
		};
		
		return dbUserObj;
	},
	
	validateUser: function (username) {
		// spoofing the DB response for simplicity
		var dbUserObj = { // spoofing a userobject from the DB. 
			name: 'arvind',
			role: 'admin',
			username: 'arvind@myapp.com'
		};
		
		return dbUserObj;
	}
};

//private method
function getToken(user) {
	var expires = expiresIn(7); // 7 days
	var token = jwt.encode({
		exp: expires
	}, require('../../config/secret')());
	
	return {
		token: token,
		expires: expires,
		user: user
	};
}

function expiresIn(numDays) {
	var dateObj = new Date();
	return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = auth;