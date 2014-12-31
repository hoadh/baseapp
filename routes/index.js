var express = require('express');
var router = express.Router();

var users = require('./business_logic/users.js');
var auth = require('./business_logic/auth.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/version', function(req,res) {
	res.status(200).json({
		'version': '0.1'
	});
});

/**
 * Return message "invalid action" (json format)
 */
function return_invalid_action(req,res) {
	res.status(200).json({'message': 'Invalid action'});
};

router.post('/login', auth.login);

/* api_test router */
router.get	('/api/v1/api_test', users.get_all	);
router.post	('/api/v1/api_test', users.create_new	);

/* GET view for client. */
router.get('/test_api', function(req, res) {
	res.render('test', {title : 'Test'});
});
router.get('/login', function(req,res) {
	res.render('login', {title : 'Login'});
});
router.get('/register', function(req,res) {
	res.render('register', {title : 'Register'});
});
router.get('/register_api', function(req,res) {
	res.render('register_api', {title : 'Register'});
});

module.exports = router;