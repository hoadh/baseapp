var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var db = require('./database/db'); // load db connection

var app = express();

app.set('env', 'development');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

// [begin] setup the logger
// Reference: https://github.com/expressjs/morgan#short
var fs = require('fs');
var accessLogStream = fs.createWriteStream(__dirname + '/logs/access.log', {flags: 'a'});
//app.use(logger('dev'));
app.use(logger('combined', {stream: accessLogStream}));
// [end] setup the logger

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CORS header
// ref: http://thejackalofjavascript.com/architecting-a-restful-node-js-app/
app.all('/*', function(req, res, next) {
	// CORS headers
	res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	// Set custom headers for CORS
	res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
	if (req.method == 'OPTIONS') {
		res.status(200).end();
	} else {
		next();
	}
});
//Auth Middleware - This will check if the token is valid
//Only the requests that start with /api/v1/* will be checked for the token.
//Any URL's that do not follow the below pattern should be avoided unless you 
//are sure that authentication is not needed
app.all('/api/v1/*', [require('./middlewares/validateRequest')]);

//Routers
app.use('/', require('./routes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use('/api', function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
        	message: err.message,
            error: err
		});
    });
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user

app.use('/api', function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
    	message: err.message,
    	error: {}
	});
});
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
