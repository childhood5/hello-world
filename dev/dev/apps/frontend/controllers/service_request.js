var path = global.path;
var serviceDetail = global.daos.service_detail;
var loggingHelper = global.helpers.logging;
var dataTimeHelper = global.helpers.datetime;

module.exports.controller = function(app) {
	app.get('/service-request', function(req, res) {
		
		var user = global.helpers.session.getUser(req.session);
		if(!user || parseInt(user.id, 10) <= 0){
			res.redirect('/user/register');
			return ;
		}
		if(!user.is_detail_updated){
			res.redirect('/user/update-info');
			return ;
		}
		
		serviceDetail.getListServices(function(err, dataServices){
			if(err){
				loggingHelper.writeLog("get list services from table service_details", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
			}			
			serviceDetail.getListRooms({},function(err, dataRooms){				
				if(err){
					loggingHelper.writeLog("get list rooms from table rooms", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
				}
				serviceDetail.getListHolidays(dataTimeHelper.listDaysRequest(global.config.serviceRequest.start_days_apply, global.config.serviceRequest.expire_days),function(err, listHolidays){
					if(err){
						loggingHelper.writeLog("get list holidays from table holiday_calendars", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
					}
					var listDayHolidays = [];		
					var currentDate = new Date();
					for(var i=0; i<listHolidays.length; i++){						
						var formatDate = new Date(listHolidays[i].holiday_date);						
						listDayHolidays[i] = {
							'dayHolidays' : dataTimeHelper.formatDay(formatDate, "", "", false),
							'name' : listHolidays[i].name,
							'weekday' : dataTimeHelper.weekdays(formatDate),
							'dateToday': dataTimeHelper.formatDay(formatDate,dataTimeHelper.weekdays(formatDate),listHolidays[i].name,true)
						}											
					}															
					for(var i=global.config.serviceRequest.start_days_apply; i<=global.config.serviceRequest.expire_days; i++){						
						var nextDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+i);			
						var n = dataTimeHelper.weekdays(nextDate);						
						if(n=="土" || n=="日"){							
							var listDay = dataTimeHelper.formatDay(nextDate,"","",false); 	
							listDayHolidays.push({'dateToday': dataTimeHelper.formatDay(nextDate,n,"",true), 'name' : "", 'weekday' : "", 'dayHolidays': listDay});
						}
					}
					serviceDetail.getListUsers({id : user.id},function(err, limitUsers){
						if(err){
							loggingHelper.writeLog("get user registered from users", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
						}
						res.render('service_request/index',{rooms : dataRooms, 
															services : dataServices, 
															listDays : dataTimeHelper.sortDays(listDayHolidays), 
															limit: limitUsers,
															lastNameUser: user.last_name,
															serviceRequest: global.helpers.session.getServiceRequest(req.session)
						});
					});	
				});
			});
		});	
	});
};