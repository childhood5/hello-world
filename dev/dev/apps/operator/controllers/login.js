var path = require('path');
var model = require(path.join(global.base_root + '/lib/models/dao/operator.js'));
var loggingHelper = global.helpers.logging;
//var User = require(path.join(global.server.base_root, 'lib/mysql_models/user.js'));
//var mysqlConn = global.server.mysql_connection;
module.exports.controller = function(app) {
	app.get('/login', function(req, res) {
		res.render('auth/login');
	});

	app.post('/login', function(req, res) {
		var login_times = global.helpers.session.getUserLoginTimes(req.session) || {times: 0, logged_date: new Date().getTime()};
		var d = new Date().getTime() - login_times.logged_date;
		if( d > global.config.login_times.timeout * 1000){
			login_times.times = 0;
		}

		var max_login = parseInt(global.config.login_times.times, 10);
		if(login_times.times > max_login){
			login_times.times = max_login;
		}
		var status = {
        		status: 0,
        		message: req.i18n.__('admin_welcome'),
        		data: {}
		};
		if(login_times.times >= max_login){
			status.status = 1;
			status.message = req.i18n.__('operator_login_over_times');
			status.data = {'login_times': login_times.times};
			res.send(status);
			return;
		}else{
			console.log(req.body);
			model.login(req.body, function(err, data){
				if(err){
					loggingHelper.writeLog("Error login", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
	        		status.status = 2;
	    			status.message = req.i18n.__('operator_login_invalid_password');
	    			status.data = {'login_times': (login_times.times + 1)};
	    			global.helpers.session.setUserLoginTimes(login_times.times + 1, req.session);
	            }else if(data && parseInt(data.id, 10) > 0){	
	            	global.helpers.session.setUserLoginTimes(0, req.session);
	            	global.helpers.session.setOperator(data, req.session);
	            	status.data.redirect = '/operator/user';

            	}else{
            		status.status = 1;
	    			status.message = req.i18n.__('operator_login_invalid_password');
	    			status.data = {'login_times': (login_times.times + 1)};
	    			global.helpers.session.setUserLoginTimes(login_times.times + 1, req.session);
            	}
	            res.send(status);
			});
		}
	});
};

