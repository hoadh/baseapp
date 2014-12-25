var router = require('express').Router();

router.get('/', function(req,res) {
	res.render('register', {title : 'Register'});
});

router.post('/', function(req,res) {
	var body = req.body;
	res.send('Registered Information: '+body.email);
	console.log(req.body);
});

module.exports = router;