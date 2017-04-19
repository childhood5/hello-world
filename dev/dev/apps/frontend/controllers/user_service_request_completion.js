var path = global.path;
var webpay = global.helpers.webpay;
var user_service = global.daos.user_service_history;
var service_info = global.daos.service_info;
var userDao = global.daos.user;
var sessionHelper = global.helpers.session;
var mailHelper = global.helpers.mail;
var uuid = require('uuid');
var loggingHelper = global.helpers.logging;
var datetimeHelper = global.helpers.datetime;

module.exports.controller = function(app) {
	app.get('/user-service-request-completion', function(req, res) {
        var u = sessionHelper.getUser(req.session);
        if(!u.id || parseInt(u.id, 10) <= 0) {
        	res.redirect('/user');
        	return;
        }

        if(!sessionHelper.getServiceRequest(req.session)) {
        	res.redirect('/service-request');
        	return;
        }

		userDao.getUserById(u.id, function(user) {
			var expire_time = new Date();
			expire_time.setDate(expire_time.getDate() + global.config.webpay.expire_days);
			expire_time = Math.floor(expire_time.getTime()/1000);
			webpay.createCharge(sessionHelper.getServiceRequest(req.session).price, global.config.webpay.currency, expire_time, user.customer_id, false, function(err, charge) {
				if(err) {
					loggingHelper.writeLog("Error create webpay", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
					var obj = {
						content: err.message,
						type: global.config.message['type-error'],
						link: '/service-request',
						label: req.i18n.__('error-webpay-create-charge')
					};
					global.helpers.session.setFlash(obj, req.session);
					res.redirect('/error-page');
				}
				else {
					var user_id = user.id;
					var sessionId = uuid.v1();
			        var serviceRequest = sessionHelper.getServiceRequest(req.session);
					var service_info_data = {
						demain: serviceRequest.demain,
						user_id: u.id,
						worker_id: null,
						session_id: sessionId,
						status_id: 00,
						user_payment_status_id: 00,
						worker_payment_status_id: 00,
						contract_date: null,
						term_end_date: null,
						price: serviceRequest.price,
						ch_code: charge.id,
						user_service_rating: null,
						user_price_rating: null,
						user_pursuer_rating: null,
						worker_satisfy_rating: null,
						sort_order: 0,
						create_date: new Date(),
						update_date: new Date(),
						update_by: 'hkuser',
						is_delete: 0,
						is_hidden: 0 
					};
					service_info.insert(service_info_data, function(service_info_data_res) {
						// Sending confirm email
						
						var count = 0;
                        for(var i=0; i< serviceRequest.service.length; i++) {
							var service_id = serviceRequest.service[i].split('. ')[0];
							for(var j=0; j<serviceRequest.room.length; j++) {
								var room_id = serviceRequest.room[j].split('. ')[0];
								for(var k=0; k<serviceRequest.time.length; k++) {
									var request_time = serviceRequest.time[k].split('(')[0];
									var user_service_data = {
							            user_id: user_id,
							            service_id: service_id,
							            room_id: room_id,
							            term_start_day: new Date(serviceRequest.date.split(' ')[0]),
							            term_request_time: request_time.split(' ')[0],
							            offer_date: new Date(),
							            session_id: sessionId,
							            status: 0,
							            is_delete: 0,
							            is_hidden: 0,
							            sort_order: 0,
							            create_date: new Date(),
							            update_date: new Date(),
							            update_by: 'hkuser'
						        	};
									user_service.insert(user_service_data, function(user_service_data_res) {			
										count++;	
				                        if(count >= serviceRequest.service.length*serviceRequest.room.length*serviceRequest.time.length) 
				                        {	
				                        	var requestDate = new Date(serviceRequest.date.split(' ')[0]);
				                        	var obj = {
				                        		mailTo: user.email_address,
					                            firstname: user.first_name,
					                            lastname: user.last_name,
					                            emailaddress: user.email_address,
					                            requesttime: serviceRequest.time[0].split('(')[0].split(' ')[0],
					                            requestdate: datetimeHelper.toJapaneseDate2(requestDate.getDate(), requestDate.getMonth()+1, requestDate.getFullYear()),
					                            servicename: serviceRequest.service.join().replace(/,/g, ' / ').replace(/\d\.\s/g, ''),
					                            roomname: serviceRequest.room.join().replace(/,/g, ' / ').replace(/\d\.\s/g, '')
					                        };
					                        //send to user
				                        	try{
					                        	mailHelper.sendMail(global.config.mail_config['template_service_reg_success'], obj, function(error, info) {
					                        		if(error) {
					                        			console.log(error);
					                        			var errObj = {
															content: error,
															type: global.config.message['type-error'],
															link: '/service-request',
															label: req.i18n.__('error-sendmail-service-request')
														};
														global.helpers.session.setFlash(errObj, req.session);

														// write log
														loggingHelper.writeLog("sendmail", global.config.log_service.com_frontend, global.config.log_service.error_type, error.message);

														res.redirect('/error-page');
														return
					                        		}
					                        		else {
					                        			console.log(info.response);
					                        		}
					                        	});
					                        }catch(ex){
												loggingHelper.writeLog("Error send mail register", global.config.log_service.com_frontend, global.config.log_service.error_type, ex.message);
											}

											// send to admin
					                        var prefectureDao = global.daos.prefecture;
					                        prefectureDao.getPrefectureById(user.prefecture_id, function(prefecture) {
					                        	var offerdate = user_service_data_res.offer_date;
					                        	var termstartday = user_service_data_res.term_start_day;
					                        	var user_stationDao = global.daos.user_station;
												user_stationDao.getStationNameByUserId(user.id, function(stations) {
													var stationNameArray = [];
													for(var i=0;i<stations.length;i++) {
														stationNameArray.push(stations[i].station_name);
													};
													var houseDao = global.daos.house;
													houseDao.getHouseById(user.house_id, function(house) {
														var buildingDao = global.daos.building_type;
														buildingDao.getBuildingById(user.building_type, function(building) {
															var toAdmin = {
							                        			mailTo: global.config.mail_config.operator_user_email,
									                        	lastname: user.last_name,
									                        	firstname: user.first_name,
									                        	lastnamekana: user.last_name_kana,
									                        	firstnamekana: user.first_name_kana,
									                        	zipcode: user.zip_code,
									                        	prefectureid: prefecture.name,
									                        	address1: user.address1,
									                        	address2: user.address2,
									                        	address3: user.address3,
									                        	emailaddress: user.email_address,
									                        	tel: user.tel,
									                        	buildingtype: building.name,
									                        	housename: house.name,
									                        	isautolock: (user.is_auto_lock === true ? 'はい' : 'いいえ'),
									                        	isexistpet: (user.is_exist_pet === true ? 'はい' : 'いいえ'),
									                        	demain: user.demain,
									                        	servicename: serviceRequest.service.join().replace(/\d\.\s/g, ' / ').replace(',', ''),
									                        	roomname: serviceRequest.room.join().replace(/\d\.\s/g, ' / ').replace(',', ''),
									                        	termstartday: datetimeHelper.toJapaneseDate2(termstartday.getDate(), termstartday.getMonth()+1, termstartday.getFullYear()),
									                        	termrequesttime: user_service_data_res.term_request_time.split('(')[0].split(' ')[0],
									                        	offerdate: datetimeHelper.toJapaneseDate2(offerdate.getDate(), offerdate.getMonth()+1, offerdate.getFullYear()),
									                        	stationname: stationNameArray.join().replace(',', ' / '),
									                        	bus_stop: user.bus_stop,
									                        	price: service_info_data_res.price
								                        	};
									                        mailHelper.sendMail(global.config.mail_config['template_service_reg_to_admin'], toAdmin, function (err, info) {
									                            if(err) {
									                                console.log(err);
									                            	var obj = {
																		content: err,
																		type: global.config.message['type-error'],
																		link: '/service-request',
																		label: req.i18n.__('error-sendmail-service-request')
																	};
																	global.helpers.session.setFlash(obj, req.session);

																	// write log
																	loggingHelper.writeLog("sendmail", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);

																	res.redirect('/error-page');
																}
									                            else {
									                                console.log(info.response);
									                            }
															});
														});
													});
												});
						                    });
				                        }
									});
								}
							}
						}
						sessionHelper.setServiceRequest(null, req.session);
						res.redirect('/user-service-request-completion-success');
					});
				}
			});
		});
	});
    
    app.get('/user-service-request-completion-success', function(req, res) {
    	res.render('user_service_request_completion/index');
    });
};

