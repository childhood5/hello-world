
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var session = require('express-session');
var fs = require('fs');
var server = express();
var pagination = require('pagination');

// all environments
server.set('port', process.env.PORT || 80);
server.use(express.favicon());
server.use(express.logger('dev'));
server.use(express.multipart());
server.use(express.bodyParser({ uploadDir: path.join(__dirname, '/public/upload') }));
server.use(express.methodOverride());
server.use(server.router);


// development only
if ('development' == server.get('env')) {
  server.use(express.errorHandler());
}

global.validator = require('validator');
global.config = require('./config/config.json');
global.base_root = __dirname;
global.path = path;
global.fs = fs;
global.pagination = pagination;
global.base_dao = path.join(global.base_root, '/lib/models/dao');
server.use(session({
	secret: global.config.session.security_code, 
	saveUninitialized: true, 
	resave: true,
	cookie: { maxAge: (parseInt(global.config.session.timeout, 10) * 1000) }
}));

//load helpers
console.log('----------Begin load global helpers');
var jsonHelpers = '{';
var sepaHelpers = '';
global.helpers = {};
fs.readdirSync(path.join(__dirname, 'lib/helpers')).forEach(function (file) {
  if(file.substr(-3) == '.js') {
	  jsonHelpers += sepaHelpers + '"' + file.substr(0, file.length-9) + '": "' + file + '"';
	  sepaHelpers = ',';
  }
});
jsonHelpers += '}';
global.helpers = JSON.parse(jsonHelpers);

for(var file in global.helpers){
	console.log(global.helpers[file]);
	global.helpers[file] = require(path.join(__dirname,'lib/helpers', global.helpers[file]));
}
console.log('------------END load global helpers');

//Webpay
var WebPay = require('webpay');
global.webpay = new WebPay(global.config.webpay.api_private_key);

//load database to models
var waterline = require('waterline');
var mysqlAdapter = require('sails-mysql');
var mongoAdapter = require('sails-mongo');

var sORM = new waterline();
var mORM = new waterline();
var sMongoORM = new waterline();
var mMongoORM = new waterline();

var db_config = require('./config/database.json');

global.db = {
		'mysqlConfig': {
			'master': {
				'adapters': {
					 'mysql': mysqlAdapter
				},
				'connections': {
					'masterMySql': db_config.mysql.master
				}
			},
			'slave': {
				'adapters': {
					 'mysql': mysqlAdapter
				},
				'connections': {
					'slaveMySql': db_config.mysql.slave
				}
			}
		},
		'mongoConfig': {
			'master': {
				'adapters': {
					 'mongo': mongoAdapter
				},
				'connections': {
					'masterMongo': db_config.mongo.master
				}
			},
			'slave': {
				'adapters': {
					 'mongo': mongoAdapter
				},
				'connections': {
					'slaveMongo': db_config.mongo.slave
				}
			}
		},
		'waterline': waterline,
		'sModel': '',
		'mModel': '',
		'sMongoModel': '',
		'mMongoModel': ''
	};
console.log('-----BEGIN LOAD MODEL -----');
fs.readdirSync(path.join(__dirname, 'lib/models')).forEach(function (file) {
	if(file.substr(-3) == '.js' && file.indexOf('Model') > 0) {
		  var model = require(path.join(__dirname,'lib/models', file));
          console.log(file);
		  if(model.dbType == global.config.database_type.mysql){          
			  sORM.loadCollection(model.sModel);
			  mORM.loadCollection(model.mModel);              
		  }else if(model.dbType == global.config.database_type.mongo){
			  sMongoORM.loadCollection(model.sModel);
			  mMongoORM.loadCollection(model.mModel);
		  }	  
	}
});
console.log('-----END LOAD MODEL -----');
console.log('-----BEGIN CONNECTION TO DATABASE -----');
sORM.initialize(global.db.mysqlConfig.slave, function(err, models) {
    if(err) {
        console.log(err);    
    }else{
    	console.log('Open connection from mysql slave');
        global.db.sModel = models;
        mORM.initialize(global.db.mysqlConfig.master, function(err, models) {
            if(err) {
                console.log(err);    
            }else{
                console.log('Open connection from mysql master');
                global.db.mModel = models;
                sMongoORM.initialize(global.db.mongoConfig.slave, function(err, models) {
                    if(err) {
                        console.log(err);    
                    }else{
                        console.log('Open connection mongo slave');
                        global.db.sMongoModel = models;
                        mMongoORM.initialize(global.db.mongoConfig.master, function(err, models) {
                            if(err) {
                                console.log(err);    
                            }else{
                                console.log('Open connection mongo master');
                                global.db.mMongoModel = models;
                                
                                console.log('-----END CONNECTION TO DATBASE -----');
                                console.log('-----FINISHED LOADING-----');
                            }
                        });
                    }
                });
            }
        });
    }
});

//load dao
console.log('----------Begin load global DAOs');
var jsonDAOs = '{';
var sepaDAOs = '';
global.daos = {};
fs.readdirSync(global.base_dao).forEach(function (file) {
  if(file.substr(-3) == '.js') {
	  jsonDAOs += sepaDAOs + '"' + file.substr(0, file.length-3) + '": "' + file + '"';
	  sepaDAOs = ',';
  }
});
jsonDAOs += '}';
global.daos = JSON.parse(jsonDAOs);

for(var file in global.daos){
	global.daos[file] = require(path.join(global.base_dao, global.daos[file]));
}
console.log('------------END load global DAOs');

console.log('-----BEGIN LOAD APPLICATION -----');
//load app
//we can add more app at here
console.log('-----BEGIN LOAD OPERATOR -----');
server.use('/operator', require(path.join(__dirname, 'apps/operator/app.js')));

console.log('-----BEGIN LOAD FRONTEND -----');
server.use('/', require(path.join(__dirname, 'apps/frontend/app.js')));

console.log('-----END LOAD APPLICATION -----');

//set url for ./public folder
server.use('/css', express.static(path.join(__dirname , '/public/css')));
server.use('/js', express.static(path.join(__dirname , '/public/js')));
server.use('/plugin', express.static(path.join(__dirname , '/public/plugin')));
server.use('/html', express.static(path.join(__dirname , '/public/html')));
server.use('/imgs', express.static(path.join(__dirname , '/public/imgs')));
server.use('/term_policy', express.static(path.join(__dirname , '/public/term_policy')));
server.use('/export', express.static(path.join(__dirname , '/public/share/export')));


//global error handler
// server.use(function(err, req, res, next) {
// 	if(res.status !== 200 || err) {
// 		res.render(path.join(global.base_root + '/public/html/error.jade'), {error: err});	
// 	}
// });

//start server
http.createServer(server).listen(3000, function(){
  console.log('Express server listening on port ' + server.get('port'));
});
