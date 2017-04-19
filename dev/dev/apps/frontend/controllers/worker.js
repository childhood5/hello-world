var path = global.path;
var model = global.daos.worker;
var model_history = global.daos.worker_service_history;
var mailHelper = global.helpers.mail;
var loggingHelper = global.helpers.logging;

module.exports.controller = function(app) {	
	
	app.post('/staff/recover-password', function(req, res){
		console.log(req.body);
		var forgot = global.helpers.session.getWorkerRecoverPassword(req.session);
		var jsend = {	status: 1,
				message: req.i18n.__('recover_password_authentication_failed'),
			};
		if( forgot && parseInt(forgot, 10) == 2){
			var tel = req.body.tel || '';
			var code = req.body.code || '';
			var login_password = req.body.login_password || '';
			if(tel=='' || code =='' || login_password == ''){
				res.send(jsend);
				return;
			}
			model.getWorkerByEmailOrTel(tel, function(err, data){
				if(err || !data || parseInt(data.id, 10) <=0){
					if(err){
						loggingHelper.writeLog("Error worker recover password update", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
		        	}
					res.send(jsend);
					return;
				}
				if(code != global.helpers.encrypt.getPasswordFromString(data.recover_password)){
					res.send(jsend);
					return;
				}
				var t = new Date().getTime() - data.recover_password;
				if(t > 24*60*60*1000*parseInt(global.config.recover_password.time_expire, 10)){
					jsend.message = req.i18n.__('recover_password_time_expired');
					res.send(jsend);
					return;
				}
				data.login_password = global.helpers.encrypt.getPasswordFromSha1(login_password);
				model.updatePassword(data, function(erru, datau){
					if(erru || !datau || parseInt(datau.id, 10) <=0){
						if(erru){
							loggingHelper.writeLog("Error worker recover password update", global.config.log_service.com_frontend, global.config.log_service.error_type, erru.message);
			        	}
						res.send(jsend);
						return;
					}
					global.helpers.session.setWorker(datau, req.session);
					global.helpers.session.setWorkerRecoverPassword(0, req.session);
					datau.recover_password = '0';
					try{
						mailHelper.sendMail(global.config.mail_config['template_worker_recover_password_changed'], {	'name': datau.last_name,
																						'emailaddress': datau.email_address}, function (errs, info) {
		                    if(errs){
		                    	loggingHelper.writeLog("Send mail recover password changed: ", global.config.log_service.com_frontend, global.config.log_service.error_type, errs.message);
		                    }
		                });
					}catch(ex){
						loggingHelper.writeLog("Send mail recover password changed: ", global.config.log_service.com_frontend, global.config.log_service.error_type, ex.message);
					}
					model.updateRecoverPassword(datau, function(errr, datar){
						if(errr){
							loggingHelper.writeLog("Error worker recover password update", global.config.log_service.com_frontend, global.config.log_service.error_type, errr.message);
			        	}
						jsend = {
								status: 0,
								message: req.i18n.__('recover_password_update_success'),
						};
						res.send(jsend);
						return
					});
				});
			});
			return;
    	}
		res.redirect('/staff');
	});
	app.get('/staff/recover-password', function(req, res){
		var tel = req.query.tel || '';
		var code = req.query.code || '';
		if(tel=='' || code ==''){
			res.redirect('/staff');
			return;
		}
		var error_obj = {
				content: '',
				type: global.config.message['type-error'],
				link: '/staff',
				label: req.i18n.__('recover_password_tel_or_email_find_not_found')
			};
			
			
		model.getWorkerByEmailOrTel(tel, function(err, data){			
			if(err || !data || parseInt(data.id, 10) <=0){
				if(err){
					loggingHelper.writeLog("Error worker recover password", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
	        	}
				error_obj.content = req.i18n.__('recover_password_tel_or_email_find_not_found');
				global.helpers.session.setFlash(error_obj, req.session);
				res.redirect('/error-page');
				return;
			}
			if(code != global.helpers.encrypt.getPasswordFromString(data.recover_password)){				
				error_obj.content = req.i18n.__('recover_password_authentication_failed');
				global.helpers.session.setFlash(error_obj, req.session);
				res.redirect('/error-page');
				return;
			}
			var t = new Date().getTime() - data.recover_password;
			if(t > 24*60*60*1000*parseInt(global.config.recover_password.time_expire, 10)){
				error_obj.content = req.i18n.__('recover_password_time_expired');
				global.helpers.session.setFlash(error_obj, req.session);
				res.redirect('/error-page');
				return;
			}
			global.helpers.session.setWorkerRecoverPassword(2, req.session);
			res.render('staff/recover_password', {'worker_tel': tel, 'worker_code': code});
		});
	});
	app.get('/staff/forgot-password-success', function(req, res){
		var forgot = global.helpers.session.getWorkerRecoverPassword(req.session);
		if( forgot && parseInt(forgot, 10) == 1){
			global.helpers.session.setWorkerRecoverPassword(0, req.session);
			res.render('staff/forgot_password_success');
			return;
    	}
		res.redirect('/staff');
	});
	app.post('/staff/forgot-password', function(req, res){
		var jsend = {	status: 1,
						message: req.i18n.__('recover_password_tel_or_email_find_not_found')
					};
		
		model.getWorkerByEmailOrTel(req.body.email, function(err, data){
			if(err || !data || parseInt(data.id, 10) <=0){
				if(err){
					loggingHelper.writeLog("Error worker forgot password", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
	        	}
				global.helpers.session.setWorkerRecoverPassword(0, req.session);
				res.send(jsend);
				return;
			}
			var rdatetime = new Date().getTime();
			data.recover_password = rdatetime.toString();
			model.updateRecoverPassword(data, function(erru, datau){
				if(erru || !datau || parseInt(datau.id, 10) <=0){
					if(erru){
						loggingHelper.writeLog("Error worker forgot password", global.config.log_service.com_frontend, global.config.log_service.error_type, erru.message);
		        	}
					global.helpers.session.setWorkerRecoverPassword(0, req.session);
					res.send(jsend);
					return;
				}
				try{
					var recover_link = 'https://shocola.jp/staff/recover-password?tel='+data.tel+'&code='+global.helpers.encrypt.getPasswordFromString(datau.recover_password);
					mailHelper.sendMail(global.config.mail_config['template_worker_recover_password'], {	'name': data.last_name, 
																					'recover_link': recover_link,
																					'emailaddress': data.email_address}, function (errs, info) {
	                    if(errs){
	                    	loggingHelper.writeLog("Send mail worker recover password: ", global.config.log_service.com_frontend, global.config.log_service.error_type, errs.message);
		                    res.send(jsend);
							return;
	                    }
	                    global.helpers.session.setWorkerRecoverPassword(1, req.session);
	                    jsend = {
	                    		status: 0,
	                    		message: req.i18n.__('recover_password_update_success')
	                    }
	                    res.send(jsend);
	                    return;
	                });
				}catch(ex){
					loggingHelper.writeLog("Send mail worker catch recover password: ", global.config.log_service.com_frontend, global.config.log_service.error_type, ex.message);
					res.send(jsend);
					return;
				}
			});
		});
	});
	app.get('/staff/forgot-password', function(req, res){
		res.render('staff/forgot_password');
	});
	
	app.use('/worker/register', function(req, res){
		var stf = req.query.stfno || '';
		var str = '/staff/register?stfno=' + stf;
		res.redirect(str);
	});
	app.get('/staff', function(req, res){	
		
		global.helpers.session.setWorker(null, req.session);
		res.render('staff/index');
	});
	app.post('/staff', function(req, res){
		var login_times = global.helpers.session.getWorkerLoginTimes(req.session) || {times: 0, logged_date: new Date().getTime()};
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
        		message: req.i18n.__('worker_welcome')
		};
		if(login_times.times >= max_login){
			status.status = 1;
			status.message = req.i18n.__('worker_login_over_times');
			status.data = {'login_times': login_times.times};
			res.send(status);
		}else{
			model.login(req.body, function(err, data){
				if(err){
					loggingHelper.writeLog("Error login for worker", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
	        		status.status = 2;
	    			status.message = req.i18n.__('worker_login_invalid_password');
	    			status.data = {'login_times': (login_times.times + 1)};
	    			global.helpers.session.setWorkerLoginTimes(login_times.times + 1, req.session);
	            }else if(data){
	            	global.helpers.session.setWorkerLoginTimes(0, req.session);
	            	global.helpers.session.setWorker(data, req.session);
            	}else{
            		status.status = 1;
	    			status.message = req.i18n.__('worker_login_invalid_password');
	    			status.data = {'login_times': (login_times.times + 1)};
	    			global.helpers.session.setWorkerLoginTimes(login_times.times + 1, req.session);
            	}
	            res.send(status);
			});
		}
	});
	
	app.get('/staff/register', function(req, res) {
		global.helpers.session.setWorker(null, req.session);
		var staff_code = req.query.stfno || 'none';
		res.render('staff/register',{'staff_code': staff_code});
	});
    
    app.post('/staff/register', function(req, res){ 
    	var encryptHelper = global.helpers.encrypt;
    	req.body.staff_code = encryptHelper.aesDecrypt(req.body.staff_code, global.config.encryptDecrypt.secretKey);

    	model.insert(req.body, function(err, data){
            var status = {
            		status: 0,
            		message: req.i18n.__('worker_register_thanks')
            };
        	if(err || !data || parseInt(data.id, 10) <= 0){
				if(err){
					loggingHelper.writeLog("Error insert database", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);					
				}
				
        		if(err.details.indexOf('already exists') >= 0) {
        			status.message = err.details.split('already exists')[1] + req.i18n.__('worker_register_already_exist');
        		}
        		else {
        			status.message = err.details;
        		}
            	status.status = 1;
            }else{
            	// Sending confirm email
            	try{
            		//send to staff
					var obj = {
						mailTo: data.email_address,
						emailaddress: data.email_address,
						tel: data.tel
					};
					mailHelper.sendMail(global.config.mail_config['template_worker_reg_success'], obj, function(err, info) {
						if(err)
							loggingHelper.writeLog("Error send mail for worker register", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
						else 
							console.log(info.response);
					});
					//send to admin
					var mailToAdmin = {
						mailTo: global.config.mail_config.operator_worker_email,
						emailaddress: data.email_address,
						tel: data.tel,
						staffcode: data.staff_code,
						firstname: data.first_name,
						lastname: data.last_name,
						firstnamekana: data.first_name_kana,
						lastnamekana: data.last_name_kana
					};
					mailHelper.sendMail(global.config.mail_config['template_worker_reg_to_admin'], mailToAdmin, function(err, info) {
						if(err)
							loggingHelper.writeLog("Error sendMail register to admin", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
						else 
							console.log(info.response);
					});
            	}catch(ex){
            		loggingHelper.writeLog("Error sendMail for worker", global.config.log_service.com_frontend, global.config.log_service.error_type, ex.message);
            	}
            	global.helpers.session.setWorker(data, req.session);
            }
            res.send(status);
        });
    });
	
    app.get('/staff/complete',function(req, res){
    	var w = global.helpers.session.getWorker(req.session);
    	if(w && parseInt(w.id, 10) > 0){
    		res.render('staff/complete');
    	}else{
    		res.redirect('/staff/register');
    	}
        
    });
    
    app.get('/staff/dashboard',function(req, res){
    	var w = global.helpers.session.getWorker(req.session);
    	if(w && parseInt(w.id, 10) > 0){
    		res.render('staff/dashboard');
    	}else{
    		res.redirect('/staff/register');
    	}
        
    });
};