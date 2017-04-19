var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var fs = require('fs');
var app = express();

//import information database
var database = require('./database/config_database.json');

//declare variable global
global.dirname = __dirname;
global.database = database;
global.path = path;


//config database
var waterline = require('waterline');
var mysqlAdapter = require('sails-mysql');
var mORM = new waterline();

global.db = {
	'master': {
		'adapters': {
			 'mysql': mysqlAdapter
		},
		'connections': {
			'databaseSql': database
		}
	},
	'waterline': waterline,
	'model': ''
}

//load all modelDto
fs.readdirSync(path.join(__dirname, 'dto')).forEach(function(file){
	if(file.substr(-3) == '.js'){
		var dto = require(path.join(__dirname,'dto',file));
		mORM.loadCollection(dto.modelDto);
	}
});

//connection to database
mORM.initialize(global.db.master, function(err, models){
	if(err){
		console.log(err);
	}
	global.db.model = models;
});

//load all controllers
fs.readdirSync(path.join(__dirname, 'controllers')).forEach(function(file){
	if(file.substr(-3) == '.js'){
		var router = require(path.join(__dirname,'controllers',file));
		console.log(file);
		router.controller(app);
	}
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  err.myError = 'Add my error';
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, function () {
  console.log('Sample app listening on port 3000!')
})

module.exports = app;
