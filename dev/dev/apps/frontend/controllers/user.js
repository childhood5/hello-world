var path = global.path;
var fs = global.fs; 
var model = global.daos.user;
var modelFamily = global.daos.family;
var mailHelper = global.helpers.mail;
var loggingHelper = global.helpers.logging;

module.exports.controller = function(app) {	
	app.post('/user/recover-password', function(req, res){
		var forgot = global.helpers.session.getUserRecoverPassword(req.session);
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
			model.getUserByEmailOrTel(tel, function(err, data){
				if(err || !data || parseInt(data.id, 10) <=0){
					if(err){
						loggingHelper.writeLog("Error recover password update", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
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
							loggingHelper.writeLog("Error recover password update", global.config.log_service.com_frontend, global.config.log_service.error_type, erru.message);
			        	}
						res.send(jsend);
						return;
					}
					global.helpers.session.setUser(datau, req.session);
					global.helpers.session.setUserRecoverPassword(0, req.session);
					datau.recover_password = '0';
					try{
						mailHelper.sendMail(global.config.mail_config['template_user_recover_password_changed'], {	'name': datau.last_name,
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
							loggingHelper.writeLog("Error recover password update", global.config.log_service.com_frontend, global.config.log_service.error_type, errr.message);
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
		res.redirect('/user');
	});
	app.get('/user/recover-password', function(req, res){
		var tel = req.query.tel || '';
		var code = req.query.code || '';
		if(tel=='' || code ==''){
			res.redirect('/user');
			return;
		}
		var error_obj = {
				content: '',
				type: global.config.message['type-error'],
				link: '/user',
				label: req.i18n.__('recover_password_tel_or_email_find_not_found')
			};
			
			
		model.getUserByEmailOrTel(tel, function(err, data){
			if(err || !data || parseInt(data.id, 10) <=0){
				if(err){
					loggingHelper.writeLog("Error recover password", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
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
			global.helpers.session.setUserRecoverPassword(2, req.session);
			res.render('user/recover_password', {'user_tel': tel, 'user_code': code});
		});
	});
	app.get('/user/forgot-password-success', function(req, res){
		var forgot = global.helpers.session.getUserRecoverPassword(req.session);
		if( forgot && parseInt(forgot, 10) == 1){
			global.helpers.session.setUserRecoverPassword(0, req.session);
			res.render('user/forgot_password_success');
			return;
    	}
		res.redirect('/user');
	});
	app.post('/user/forgot-password', function(req, res){
		var jsend = {	status: 1,
						message: req.i18n.__('recover_password_tel_or_email_find_not_found')
					};
		
		model.getUserByEmailOrTel(req.body.email, function(err, data){
			if(err || !data || parseInt(data.id, 10) <=0){
				if(err){
					loggingHelper.writeLog("Error forgot password", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
	        	}
				global.helpers.session.setUserRecoverPassword(0, req.session);
				res.send(jsend);
				return;
			}
			var rdatetime = new Date().getTime();
			data.recover_password = rdatetime.toString();
			model.updateRecoverPassword(data, function(erru, datau){
				if(erru || !datau || parseInt(datau.id, 10) <=0){
					if(erru){
						loggingHelper.writeLog("Error forgot password", global.config.log_service.com_frontend, global.config.log_service.error_type, erru.message);
		        	}
					global.helpers.session.setUserRecoverPassword(0, req.session);
					res.send(jsend);
					return;
				}
				
				try{
					var recover_link = 'https://shocola.jp/user/recover-password?tel='+data.tel+'&code='+global.helpers.encrypt.getPasswordFromString(datau.recover_password);
					mailHelper.sendMail(global.config.mail_config['template_user_recover_password'], {	'name': data.last_name, 
																					'recover_link': recover_link,
																					'emailaddress': data.email_address}, function (errs, info) {
	                    if(errs){
	                    	loggingHelper.writeLog("Send mail recover password: ", global.config.log_service.com_frontend, global.config.log_service.error_type, errs.message);
		                    res.send(jsend);
							return;
	                    }
	                    global.helpers.session.setUserRecoverPassword(1, req.session);
	                    jsend = {
	                    		status: 0,
	                    		message: req.i18n.__('recover_password_update_success')
	                    }
	                    res.send(jsend);
	                    return;
	                });
				}catch(ex){
					loggingHelper.writeLog("Send mail recover password: ", global.config.log_service.com_frontend, global.config.log_service.error_type, ex.message);
					res.send(jsend);
					return;
				}
			});
		});
	});
	app.get('/user/forgot-password', function(req, res){
		res.render('user/forgot_password');
	});
	
	app.get('/user', function(req, res){
		global.helpers.session.setUser(null, req.session);
		global.helpers.session.setServiceRequest(null, req.session);
        
		res.render('user/index');
	});
	app.post('/user', function(req, res){
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
        		message: req.i18n.__('user_welcome'),
        		data: {}
		};
		if(login_times.times >= max_login){
			status.status = 1;
			status.message = req.i18n.__('user_login_over_times');
			status.data = {'login_times': login_times.times};
			res.send(status);
			return;
		}else{
			model.login(req.body, function(err, data){
				if(err){
					loggingHelper.writeLog("Error login", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
	        		status.status = 2;
	    			status.message = req.i18n.__('user_login_invalid_password');
	    			status.data = {'login_times': (login_times.times + 1)};
	    			global.helpers.session.setUserLoginTimes(login_times.times + 1, req.session);
	            }else if(data && parseInt(data.id, 10) > 0){	
	            	global.helpers.session.setUserLoginTimes(0, req.session);
	            	global.helpers.session.setUser(data, req.session);
	            	if(data.is_detail_updated){
	            		status.data.redirect = '/service-request';
	            	}else{
	            		status.data.redirect = '/user/update-info';
	            	}
            	}else{
            		status.status = 1;
	    			status.message = req.i18n.__('user_login_invalid_password');
	    			status.data = {'login_times': (login_times.times + 1)};
	    			global.helpers.session.setUserLoginTimes(login_times.times + 1, req.session);
            	}
	            res.send(status);
			});
		}
	});
	
	app.get('/user/register', function(req, res) {
		var u = global.helpers.session.getUser(req.session);
		if( u && parseInt(u.id, 10) > 0){
			res.redirect('/user/update-info');
    	}else{
    		res.render('user/register');
    	}
	});
    
    app.post('/user/register', function(req, res){
    	console.log(req.body);
    	model.insert(req.body, function(err, data){
            var status = {
            		status: 0,
            		message: req.i18n.__('user_register_thanks')
            };
        	if(err){
				loggingHelper.writeLog("Error insert user", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
                if(err.details.indexOf('foreign key') >= 0) {
                    status.message = req.i18n.__('user_register_invalid_company_code');
                }
                if(err.details.indexOf('already exists') >= 0) {
                    status.message = err.details.split('already exists')[1] + req.i18n.__('user_register_already_exist');
                }
                else {
                    status.message = err.details;
                }
                status.status = 1;
            }else{
            	global.helpers.session.setUser(data, req.session);
                // Sending confirm email
            	try{
                    var obj = {
                        firstname: data.first_name,
                        lastname: data.last_name,
                        emailaddress: data.email_address,
                        tel: data.tel
                    };
					mailHelper.sendMail(global.config.mail_config['template_user_reg_success'], obj, function (err, info) {
                        if(err)
                            loggingHelper.writeLog("Error send mail", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
                        else {
                            console.log(info.response);
                        }
                    });          
            	}catch(ex){
            		loggingHelper.writeLog("Error send mail: ", global.config.log_service.com_frontend, global.config.log_service.error_type, ex.message);
            	}
            }
            res.send(status);
        });
    });
   
    app.get('/user/update-info', function(req, res){
    	var u = global.helpers.session.getUser(req.session);
    	if(u && parseInt(u.id, 10) > 0){
    		if(u.is_detail_updated){
    			res.redirect('/service-request');
    			return;
    		}
    		modelFamily.getList(function(err, data){
    			if(err){
    				loggingHelper.writeLog("Error family", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
    			}
    			var max_year = new Date().getFullYear();
    			var min_year = max_year - parseInt(global.config.yearAgo, 10);
    			res.render('user/update_info', {
    				'families': data, 
    				'min_year': min_year, 
    				'max_year': max_year,
    				'year_selected': global.config.user.birthday_year_default});
    		});
    	}else{
    		res.redirect('/user/register');
    		return;
    	}
    	
    });
    app.post('/user/upload-profile', function(req, res){
    	var user = global.helpers.session.getUser(req.session);
    	
    	if(user && parseInt(user.id, 10) > 0){
    		var name = 'profile-'+ user.id + '-' + Date.now() + req.files.file.name.substring(req.files.file.name.indexOf('.'), req.files.file.name.length);
        	fs.rename(req.files.file.path,path.join(__dirname, '../public/upload/', name),function(error) {
                    if(error) {
						loggingHelper.writeLog("Error read file", global.config.log_service.com_frontend, global.config.log_service.error_type, error.message);
                    	res.send({ 'status': 1, 'message': req.i18n.__('user_update_info_update_failed')});
                    }else{
                    	res.send({ 'status': 0, 'message': '', 'data': {
            				'path': path.join('/content/upload/', name), 
            				'name': name }
                		});
                    }   
        	});
    	}else{
    		res.send({ 'status': 1, 'message': req.i18n.__('user_update_info_update_failed')});
    	}
    });
	app.post('/user/update-info', function(req, res){
		var u = global.helpers.session.getUser(req.session);
		var status = {
        		status: 0,
        		message: req.i18n.__('user_update_info_success')
        };
    	if(u && parseInt(u.id, 10) > 0){
    		var modelStation = global.daos.station;
    		modelStation.getByName(req.body.station_name, function(errs, dtStation){
    			if(errs || !dtStation || parseInt(dtStation.id, 10) <= 0){
					if(errs){
						loggingHelper.writeLog("Error not found name station", global.config.log_service.com_frontend, global.config.log_service.error_type, errs.message);
					}   				
    				status.message = req.i18n.__('user_update_info_not_found_station');
                	status.status = 1;
                	res.send(status);
                	return;
    			}
    			
				model.getUserById(u.id, function(user){
					if(!user || parseInt(user.id, 10) <= 0){
                    	status.message = req.i18n.__('user_update_info_update_failed');
                    	status.status = 1;
                    	res.send(status);
                    	return;
					}
					user.profile_image_url = req.body.profile_image_url;
	        		
	        		user.prefecture_id = req.body.prefecture_id;
	        		user.house_id = req.body.house_id;
	        		
	        		user.birthday = req.body.birthday;
	        		user.zip_code = req.body.zip_code;
	        		user.sex = req.body.sex;
	        		
	        		user.address1 = req.body.address1;
	        		user.address2 = req.body.address2;
	        		user.address3 = req.body.address3;
	        		
	        		user.building_type = req.body.building_type;
	        		user.is_auto_lock = (parseInt(req.body.is_auto_lock,10) == 1);
	        		user.is_exist_pet = (parseInt(req.body.is_exist_pet,10) == 1);
	        		
	        		user.bus_stop = req.body.bus_stop;
	        		
	        		user.demain = req.body.demain;
	        		user.is_detail_updated = true;
	        		
	        		model.updateDetail(user, function(erru, dtUser){
	                	if(erru || !dtUser || parseInt(dtUser.id, 10) <= 0){							
							if(erru){
								loggingHelper.writeLog("Error user update", global.config.log_service.com_frontend, global.config.log_service.error_type, erru.message);
							} 							
	                    	status.message = req.i18n.__('user_update_info_update_failed');
	                    	status.status = 1;
	                    	res.send(status);
	                    	return;
	                    }
	                	global.helpers.session.setUser(dtUser, req.session);
                    	var families = req.body.families;
                    	var modelUF = global.daos.user_family;
                    	for(var i=0; i<families.length; i++){
                    		if(parseInt(families[i], 10) > 0){
                    			modelUF.insert({'user_id': dtUser.id, 'family_id': families[i]}, function(errm, dt){
                        			if(errm){
                        				loggingHelper.writeLog("Error insert", global.config.log_service.com_frontend, global.config.log_service.error_type, errm.message);
                        			}
                        		});
                    		}
                    	}
                    	var modelUS = global.daos.user_station;
                    	modelUS.insert({'user_id': dtUser.id, 'station_cd': dtStation.station_cd, 'station_group_cd': dtStation.station_group_cd}, function(err2, dt2){
            				if(err2){
                				loggingHelper.writeLog("Error insert user station", global.config.log_service.com_frontend, global.config.log_service.error_type, err2.message);
                			}
            			});
	                    res.send(status);
	        		});
	    		});
    			
    		});	
    	}else{
			res.send({ 'status': 1, 'message': req.i18n.__('user_update_info_update_failed')});
		}
	});
	
    app.get('/user/complete',function(req, res){
    	var u = global.helpers.session.getUser(req.session);
    	if(u && parseInt(u.id, 10) > 0){	
            res.render('user/complete');
    	}else{
    		res.redirect('/user/register');
    	}
    });
    

    app.get('/user/dashboard',function(req, res){
    	var u = global.helpers.session.getUser(req.session);
    	if(u && parseInt(u.id, 10) > 0){	
    		res.render('user/dashboard');
    	}else{
    		res.redirect('/user/register');
    	}
    });
};