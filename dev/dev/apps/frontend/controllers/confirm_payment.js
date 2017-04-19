/*
 * GET users listing.
 */

var path = global.path;
var serviceDetail = global.daos.service_detail;
var sessionHelper = global.helpers.session;
var webpayHelper = global.helpers.webpay;
var userDao = global.daos.user;
var loggingHelper = global.helpers.logging;
var dataTimeHelper = global.helpers.datetime;

module.exports.controller = function(app) {
	app.post('/confirm-payment', function(req, res) {
		var user = global.helpers.session.getUser(req.session);
		if(!user){
			res.redirect('/user/register');
			return ;
		}
		if(!user.is_detail_updated){
			res.redirect('/user/update-info');
			return ;
		}		
		var service = req.param('service');
		var room = req.param('room');
		var time = req.param('time');
		var date = req.param('date');
		var demain = req.param('demain');
		var serviceRequest = {'demain' : demain};
		
		if(!room || !time || !date){
			res.redirect('/service-request');
			return ;
		}
		
		if(service){
			if(Array.isArray(service)) {
				while(service.indexOf('') >= 0) {
					service.splice(service.indexOf(''), 1);
				}
				serviceRequest.service = service;
			}
			else {
				serviceRequest.service = [service];
			}
		}
		else {
			serviceRequest.service = [];
		}	
		if(room){
			if(Array.isArray(room)) {
				while(room.indexOf('') >= 0) {
					room.splice(room.indexOf(''), 1);
				}
				serviceRequest.room = room;
			}
			else {
				serviceRequest.room = [room];
			}
		}

		if(time){
			if(Array.isArray(time)) {
				while(time.indexOf('') >= 0) {
					time.splice(time.indexOf(''), 1);
				}
				serviceRequest.time = time;
			}
			else {
				serviceRequest.time = [time];
			}
		}

		if(date) {
			serviceRequest.date = date;
		}
	
		if( serviceRequest.time != '' &&
			serviceRequest.room != '' &&
			serviceRequest.date != '') {
			sessionHelper.setServiceRequest(serviceRequest, req.session);
		}
		else {
        	res.redirect('/service-request');
		}

		//get session serviceRequest
		var session = sessionHelper.getServiceRequest(req.session);	
		var sumPrice = 0;
		var arrayListId = global.listServiceId(session.service);
		var formatCurrentDate = dataTimeHelper.formatDay(new Date(), "", "", false);
		serviceDetail.getListServices(function(err, dataServices){	
			if(err){
				loggingHelper.writeLog("Error get list id service details", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
			}
			for(var l=0; l<dataServices.length; l++){
				if(dataServices[l].is_basic == 1){
					arrayListId.push(dataServices[l].id);
					sessionHelper.getServiceRequest(req.session).service.push(dataServices[l].id + '. ' + dataServices[l].service_name);
				}
			}		
			//get sum price for service select
			serviceDetail.getListPrice({companyId: user.company_id, serviceId: arrayListId},function(err, listPrice){	
				if(err){
					loggingHelper.writeLog("Error get list prices", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
				}			
				serviceDetail.getListPriceCampaigns({companyId: user.company_id, serviceId: arrayListId},function(err, priceCampaigns){		
					if(err){
						loggingHelper.writeLog("Error get list prices campaigns", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
					}				
					for(var j=0; j<listPrice.length; j++){					
						var idService =  listPrice[j].service_id;
						var price =  listPrice[j].price;
						sumPrice += price;			
						for(var k=0; k<priceCampaigns.length; k++){						
							var formatDayMonthYearStart = "" + priceCampaigns[k].start_date.getFullYear() + (((priceCampaigns[k].start_date.getMonth()+1) < 10 ? '0' : '') + (priceCampaigns[k].start_date.getMonth()+1)) + ((priceCampaigns[k].start_date.getDate()<10?'0':'')+(priceCampaigns[k].start_date.getDate()));
							var formatDayMonthYearEnd = "" + priceCampaigns[k].end_date.getFullYear() +  (((priceCampaigns[k].end_date.getMonth()+1) < 10 ? '0' : '') + (priceCampaigns[k].end_date.getMonth()+1)) + ((priceCampaigns[k].end_date.getDate()<10?'0':'')+(priceCampaigns[k].end_date.getDate()));							
							if(formatCurrentDate>=formatDayMonthYearStart && formatCurrentDate<=formatDayMonthYearEnd){							
								if(priceCampaigns[k].service_id === idService){							
									if(priceCampaigns[k].price_off !== null){
										sumPrice = ((100 - priceCampaigns[k].price_off) * sumPrice)/100;	
									}	
									if(priceCampaigns[k].price_minus !== null){
										sumPrice = sumPrice - priceCampaigns[k].price_minus;	
									}							
								}						
							}						
						}
					}
					serviceDetail.checkExistUser(user.id, function(err, listUserHistory){
						if(err){
							loggingHelper.writeLog("Check exist user", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
						}
						if(listUserHistory.length==0){
							sumPrice = (global.config.prices.price_off_first_time * sumPrice)/100;
						}else if(listUserHistory.length==1){
							sumPrice = ((100 - global.config.prices.price_off_second_time) * sumPrice)/100;
						}		
						session['price'] = global.config.prices.amount * sumPrice;
						sessionHelper.setServiceRequest(session, req.session);
						var obj = {
							serviceRequest: {
								"service": session.service,
								"room": session.room,
								"time": session.time,
								"date": session.date,
								"sumPrices" : global.config.prices.amount * sumPrice
							},
							customer: {}
						}

						var cusToken = undefined;
						userDao.getUserById(user.id, function(data) {
							cusToken = data.customer_id;
							if(cusToken) {
								webpayHelper.getCustomerById(cusToken, function(err, cusData) {
									if(err) {
										loggingHelper.writeLog("Error not found by id webpay", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
									}
									else {
										obj.customer.card = cusData;
									}
									res.render('confirm_payment/index', obj);
								});
							}
							else {
								res.render('confirm_payment/index', obj);
							}
						});
					});
				});
			});
		});
	});

	app.post('/process-card', function(req, res) {
		var webpayToken = req.param('webpay-token');
		webpayHelper.createCustomer(webpayToken, function(err, customer) {
			if(err) {
				loggingHelper.writeLog("Error webpay", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
			}
			else {
				sessionHelper.getUser(req.session).customer_id = customer.id;
				userDao.updateDetail(sessionHelper.getUser(req.session), function(customer) {
					var obj = {
						serviceRequest: {
							"service": sessionHelper.getServiceRequest(req.session).service,
							"room": sessionHelper.getServiceRequest(req.session).room,
							"time": sessionHelper.getServiceRequest(req.session).time,
							"date": sessionHelper.getServiceRequest(req.session).date,
							"sumPrices" : sessionHelper.getServiceRequest(req.session).price
						},
						customer: {}
					}
					var cusToken = undefined;
					userDao.getUserById(sessionHelper.getUser(req.session).id, function(data) {
						cusToken = data.customer_id;
						if(cusToken) {
							webpayHelper.getCustomerById(cusToken, function(err, cusData) {
								if(err) {
									loggingHelper.writeLog("Error not found token webpay", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
								}
								else {
									obj.customer.card = cusData;
								}
								res.render('confirm_payment/index', obj);
							});
						}
						else {
							res.render('confirm_payment/index', obj);
						}
					});
				});
			}
		});
	});
};

global.listServiceId = function(service){
	var array = [];	
	if(service){		
		for(var i=0; i< service.length; i++){			
			array[i] =  service[i].split('. ')[0];				
		}		
	}
	return array;
}