/**
* 2015-06-04
* tong.pham 
**/
var path = global.path;
var loggingHelper = global.helpers.logging;

exports.getListServices = function(cb){
	var serviceDetails = global.db.sModel.collections.service_details;
	serviceDetails.find().exec(function(err, data){           
		if(err){
			loggingHelper.writeLog("Error get all list service details", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
		}
		return cb(err, data);
	});	
}

exports.getListHolidays = function(requestData, cb){
	var holiday = global.db.sModel.collections.holiday_calendars;
	holiday.find({holiday_date: {'>=' : requestData[0], '<=' : requestData[1]}}).exec(function(err, data){           
		if(err){
			loggingHelper.writeLog("Error about query table holiday_calendars", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
		}
		return cb(err, data);
	});	
}

exports.getListRooms = function(data, cb){
	var serviceDetails = global.db.sModel.collections.rooms;
	serviceDetails.find().exec(function(err, data){           
		if(err){
			loggingHelper.writeLog("Error about query table rooms", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
		}
		return cb(err, data);
	});	
}

exports.getListPrice = function(requestData, cb){			
	
	var price = global.db.sModel.collections.prices;
	price.find({company_id: requestData["companyId"], service_id: requestData["serviceId"]}).exec(function(err, listPrice){			
		if(err){
			loggingHelper.writeLog("Error about query table prices", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
		}
		return cb(err, listPrice);			
	});
}

exports.getListPriceCampaigns = function(requestData, cb){

	var objectCampaigns = global.db.sModel.collections.campaigns;		
	objectCampaigns.find({company_id: requestData["companyId"], service_id: requestData["serviceId"]}).exec(function(err, listPriceCampaigns){			
		if(err){
			loggingHelper.writeLog("Error about query table campaigns", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
		}
		return cb(err, listPriceCampaigns);
	});
	
}

exports.checkExistUser = function(requestUserId, cb){
	var userServiceInfos = global.db.sMongoModel.collections.service_infos;
	userServiceInfos.find({user_id: requestUserId}).exec(function(err, data){           
		if(err){
			loggingHelper.writeLog("Error about query table service_infos", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
		}
		return cb(err, data);
	});	
}

exports.getListUsers = function(data, cb){

	var users = global.db.sModel.collections.users;
	users.find(data["id"]).exec(function(err, dataUser){
		if(err){
			loggingHelper.writeLog("Error about query table users", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
		}
		if(dataUser.length > 0){
			var areaLimits = global.db.sModel.collections.area_limits;
			areaLimits.find({area_id : dataUser[0]["area_id"], request_time : global.config.register_time.time_10}).exec(function(err, listLimitOne){
				areaLimits.find({area_id : dataUser[0]["area_id"], request_time : global.config.register_time.time_13}).exec(function(err, listLimitTwo){					
					areaLimits.find({area_id : dataUser[0]["area_id"], request_time : global.config.register_time.time_16}).exec(function(err, listLimitThree){
						areaLimits.find({area_id : dataUser[0]["area_id"], request_time : global.config.register_time.time_19}).exec(function(err, listLimitFour){
							
							if(err){
								loggingHelper.writeLog("Error about query table area_limits", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
							}
							var limitsOne = 0;
							var limitsTwo = 0;
							var limitsThree = 0;
							var limitsFour = 0;
							
							if(listLimitOne.length > 0){
								limitsOne = listLimitOne[0]["request_limit"];
							}else{
								limitsOne = global.config.limit_register_default.limit;
							}		
							if(listLimitTwo.length > 0){
								limitsTwo = listLimitTwo[0]["request_limit"];
							}else{	
								limitsTwo = global.config.limit_register_default.limit;
							}	
							if(listLimitThree.length > 0){
								limitsThree = listLimitThree[0]["request_limit"];
							}else{								
								limitsThree = global.config.limit_register_default.limit;
							}	
							if(listLimitFour.length > 0){
								limitsFour = listLimitFour[0]["request_limit"];
							}else{	
								limitsFour = global.config.limit_register_default.limit;
							}
								
							var userServiceHistories = global.db.sMongoModel.collections.user_service_histories;
							userServiceHistories.find({request_time : global.config.register_time.time_10, user_id : data["id"], status : '0'}).exec(function(err, historyUserOne){         
								userServiceHistories.find({request_time : global.config.register_time.time_13, user_id : data["id"], status : '0'}).exec(function(err, historyUserTwo){         
									userServiceHistories.find({request_time : global.config.register_time.time_16, user_id : data["id"], status : '0'}).exec(function(err, historyUserThree){         
										userServiceHistories.find({request_time : global.config.register_time.time_19, user_id : data["id"], status : '0'}).exec(function(err, historyUserFour){         											
											if(err){
												loggingHelper.writeLog("Error about query table user_service_histories", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
											}
											return cb(err, {first : limitsOne - historyUserOne.length, second : limitsTwo - historyUserTwo.length, third : limitsThree - historyUserThree.length, fourth : limitsFour - historyUserFour.length});						
										});						
									});						
								});							
							});										
						})								
					})
				})			

			});
		}
		return cb(err, {first : global.config.limit_register_default.limit, second : global.config.limit_register_default.limit, third : global.config.limit_register_default.limit, fourth : global.config.limit_register_default.limit});
	});
	
}

exports.getAllStaff = function(cb){
	var staff = global.db.sModel.collections.workers;
	staff.find({'is_delete': false}).exec(function(err, listStaff){
		if(err){
			loggingHelper.writeLog("Error staff", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
		}
		return cb(err, listStaff);
	});
}

exports.delete = function(requestData, cb){
	
	var staff = global.db.mModel.collections.workers;
	staff.update({'id': requestData}, {'is_delete': true}, function(err, listDeleteStaff){
		if(err){
			loggingHelper.writeLog("Error staff", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
		}
		staff.find({'is_delete': false}).exec(function(err, listStaff){
			if(err){
				loggingHelper.writeLog("Error staff", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
			}
			return cb(err, listStaff);
		});
	});
}

exports.updateStaff = function(id, cb){
	var staff = global.db.sModel.collections.workers;
	staff.find({'id' : id}).exec(function(err, listStaff){
		if(err){
			loggingHelper.writeLog("Error staff", global.com_frontend, global.config.log_service.error_type, err.message);
		}
		var prefecture = global.db.sModel.collections.prefectures;
		prefecture.find({'id' : listStaff[0].prefecture_id}).exec(function(err, listPrefectures){
			if(err){
				loggingHelper.writeLog("Error prefectures", global.com_frontend, global.config.log_service.error_type, err.message);
			}
			return cb(err, {'staff' : listStaff[0], 'prefectures' : listPrefectures[0]});
		});
		
	});
}
exports.getListPrefectures = function(cb){
	var prefecture = global.db.sModel.collections.prefectures;
	prefecture.find().exec(function(err, listPrefectures){
		if(err){
			loggingHelper.writeLog("Error prefectures", global.com_frontend, global.config.log_service.error_type, err.message);
		}
		return cb(err, listPrefectures);
	});
}





exports.getStationByName = function(stationName, cb){
	var station = global.db.sModel.collections.stations;
	station.find({'station_name' : stationName}).exec(function(err, listStations){
		if(err){
			loggingHelper.writeLog("Error Stations", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
		}
		return cb(err, listStations);
	});
}


exports.getListStationCd = function(listStationCd, cb){
	var station = global.db.sModel.collections.stations;
	station.find({'station_cd' : listStationCd}).exec(function(err, listStations){
		if(err){
			loggingHelper.writeLog("Error Stations", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
		}
		return cb(err, listStations);
	});
}


exports.getListStation = function(cb){
	var station = global.db.sModel.collections.stations;
	station.find().exec(function(err, listStations){
		if(err){
			loggingHelper.writeLog("Error Stations", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
		}
		return cb(err, listStations);
	});
}

exports.getListStaffStation = function(requestData, cb){
	
	var station = global.db.sModel.collections.stations;
	station.find({'station_name' : requestData.station_name}).exec(function(err, listStations){
		if(err){
			loggingHelper.writeLog("Error Stations", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
		}
		var arrStations = [];
		if(listStations.length>0){
			for(var i=0; i<listStations.length; i++){
				arrStations.push(listStations[i].station_cd);
			}
		}
		var workerStations = global.db.sModel.collections.worker_stations;
		workerStations.find({'station_cd' : arrStations}).exec(function(err, listWorkerStations){
			if(err){
				loggingHelper.writeLog("Error Worker Stations", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
			}
			var arrBoolean = [];
			var condition = {'is_delete' : false};
			var keyword = requestData.keyword;
			
			if(requestData.female==='true'){
				arrBoolean.push('FEM');
			}
			if(requestData.male==='true'){
				arrBoolean.push('MAL');
			}
			if(arrBoolean.length>0){
				condition.sex = arrBoolean;
			}
			if(requestData.station_name !==''){
				var arrWorkerStations = [];
				if(listWorkerStations.length>0){
					for(var i=0; i<listWorkerStations.length; i++){
						arrWorkerStations.push(listWorkerStations[i].worker_id);
					}
				}
				condition.id = arrWorkerStations;
			}
			
			if(keyword !==''){
			
				var jsonFilter = [];
				if(requestData.first_name=='false' && requestData.email_address=='false' && requestData.tel=='false'
					&& requestData.zip_code=='false' && requestData.address1=='false' ){
						jsonFilter.push({'first_name' : keyword});
						jsonFilter.push({'email_address' : keyword});
						jsonFilter.push({'tel' : keyword});
						jsonFilter.push({'zip_code' : keyword});
						jsonFilter.push({'address1' : keyword});
				}else{
					if(requestData.first_name=='true'){
						jsonFilter.push({'first_name' : keyword});
					}
					if(requestData.email_address=='true'){
						jsonFilter.push({'email_address' : keyword});
					}
					if(requestData.tel=='true'){
						jsonFilter.push({'tel' : keyword});
					}
					if(requestData.zip_code=='true'){
						jsonFilter.push({'zip_code' : keyword});
					}
					if(requestData.address1=='true'){
						jsonFilter.push({'address1' : keyword});
					}
				}
				condition.or = jsonFilter;
			}
			var worker = global.db.sModel.collections.workers;
			worker.find(condition).exec(function(err, listWorker){
				if(err){
					loggingHelper.writeLog("Error Worker", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
				}
				return cb(err, listWorker);
			});
		});
	});
}
