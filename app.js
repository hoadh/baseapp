var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.set('env', 'development');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

// setup the logger
// Reference: https://github.com/expressjs/morgan#short
var fs = require('fs');
var accessLogStream = fs.createWriteStream(__dirname + '/logs/access.log', {flags: 'a'});
//app.use(logger('dev'));
app.use(logger('combined', {stream: accessLogStream}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// router setup
//code code: var routerDirectory = __dirname + '/routes/';
//	app.use('/', 			    require(routerDirectory + 'index'));
//olde code: app.use('/users', 		require('./routes/index'));
var require_router = function (router) {
	var routerDirectory = __dirname + '/routes/';
	return require(routerDirectory + router);
};
app.use('/', 			require_router('index'));
app.use('/users', 		require_router('users'));
app.use('/login', 		require_router('login'));
app.use('/register', 	require_router('register'));

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
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;