var serviceDetail = require(global.base_root + '/lib/models/dao/service_detail.js');
var workerStation = require(global.base_root + '/lib/models/dao/worker_station.js');
var staffInformation = require(global.base_root + '/lib/models/dao/worker.js');
var prefecture = require(global.base_root + '/lib/models/dao/prefecture.js');
var loggingHelper = global.helpers.logging;
var dateFormat = require('dateformat');

module.exports.controller = function(app) {

	app.use('/staff/detail', function(req, res) {
		var id = global.helpers.session.getIdStaff(req.session);
		
		serviceDetail.getListStation(function(err, listStations){
			if(err){
				loggingHelper.writeLog("get list Stations error", global.com_frontend, global.config.log_service.error_type, err.message);
				return;
			}
			serviceDetail.getListPrefectures(function(err, listPrefectures){
				if(err){
					loggingHelper.writeLog("get list Prefectures error", global.com_frontend, global.config.log_service.error_type, err.message);
					return;
				}
				if(id){
					workerStation.getWorkerStationPriority({'worker_id' : id, 'priority' : [1,2]}, function(err, listWorkerStation){
						if(err){
							loggingHelper.writeLog("get data Worker Station error", global.com_frontend, global.config.log_service.error_type, err.message);
							return;
						}
						var arrayStationCd = [];
						var stationNamePriorityFirst = null;
						var stationNamePrioritySecond = null;
						
						for(var i=0; i<listWorkerStation.length; i++){
							arrayStationCd.push(listWorkerStation[i].station_cd);
						}
						serviceDetail.getListStationCd(arrayStationCd, function(err, listStationsCd){
							if(err){
								loggingHelper.writeLog("get data Station error", global.com_frontend, global.config.log_service.error_type, err.message);
								return;
							}
							for(var j=0; j<listWorkerStation.length; j++){
								for(var i=0; i<listStationsCd.length; i++){
									if(listWorkerStation[j].priority==1){
										if(listWorkerStation[j].station_cd == listStationsCd[i].station_cd){
											stationNamePriorityFirst = listStationsCd[i].station_name;
										}
									}else if(listWorkerStation[j].priority==2){
										if(listWorkerStation[j].station_cd == listStationsCd[i].station_cd){
											stationNamePrioritySecond = listStationsCd[i].station_name;
										}
									}
								}
							}
							serviceDetail.updateStaff(id, function(err, list){
								if(err){
									loggingHelper.writeLog("Error update Staff", global.com_frontend, global.config.log_service.error_type, err.message);
									return;
								}
								res.render('staff_detail/index', {
											'breadcrumbs': req.breadcrumbs(),
											'list' : list , 
											'date' : dateFormat(list.staff.birthday, "yyyy-mm-dd"), 
											'listStations' : listStations, 
											'listPrefectures' : listPrefectures, 
											'stationNamePriorityFirst' : stationNamePriorityFirst, 
											'stationNamePrioritySecond' : stationNamePrioritySecond });    
							});
						});
						
					});
				}else{
					res.render('staff_detail/index', {
								'breadcrumbs': req.breadcrumbs(),
								'list' : {'staff' : {}},
								'listStations' : listStations,
								'listPrefectures' : listPrefectures });
				}
			});
		});
	});
	app.use('/information-update', function(req, res) {
		var id = global.helpers.session.getStaff(req.session);
		var sex = null;
			if(req.body.json.male=='true'){
				sex = 'MAL';
			}
			if(req.body.json.female=='true'){
				sex = 'FEM';
			}
			if(req.body.json.unknown=='true'){
				sex = null;
			}
			var objStaff = {
				'staff_code' : req.body.json.staff_code,
				'sex' : sex,
				'first_name' : req.body.json.first_name,
				'last_name' : req.body.json.last_name,
				'first_name_kana' : req.body.json.first_name_kana,
				'last_name_kana' : req.body.json.last_name_kana,
				'nickname' : req.body.json.nick_name,
				'birthday' : req.body.json.birthday,
				'tel' : req.body.json.phone_number,
				'email_address' : req.body.json.email,
				'address1' : req.body.json.address1,
				'address2' : req.body.json.address2,
				'demain' : req.body.json.textarea
			}
			
			prefecture.getPrefecturesByName(req.body.json.prefecture, function(err, prefectures){
				if(prefectures.length>0){
					objStaff.prefecture_id = prefectures[0].id;
				}				
				staffInformation.updateStaff({'id' : id, 'json' : objStaff}, function(err, listStaff){
					if(err){
						loggingHelper.writeLog("get list Stations error", global.com_frontend, global.config.log_service.error_type, err.message);
						return;
					}
					var obj = {'worker_id': id, 'priority': 1};
		            var obj1 = {'worker_id': id, 'priority': 2};
					workerStation.getWorkerStationPriority(obj, function(err, workerStationPriorityFirst){
						serviceDetail.getStationByName(req.body.json.station1, function(err, stations){
							if(workerStationPriorityFirst.length==0){
								if(stations.length>0){
									obj.station_cd = stations[0].station_cd;
								}
								workerStation.insert(obj, function(err, ws){
									if(err){
										loggingHelper.writeLog("insert error", global.com_frontend, global.config.log_service.error_type, err.message);
										return;
									}
								});
							}else if(workerStationPriorityFirst.length==1){
								
								var stationCd = null;
								if(stations.length>0){
									stationCd = stations[0].station_cd
								}
								workerStation.update(obj, stationCd  , function(err, wsUpdate){
									if(err){
										loggingHelper.writeLog("insert error", global.com_frontend, global.config.log_service.error_type, err.message);
										return;
									}
									
								});
							}
							workerStation.getWorkerStationPriority(obj1, function(err, workerStationPriorityFirst){
								serviceDetail.getStationByName(req.body.json.station2, function(err, stations){
									
									if(workerStationPriorityFirst.length==0){
										if(stations.length>0){
											obj1.station_cd = stations[0].station_cd;
										}
										workerStation.insert(obj1, function(err, ws){
											if(err){
												loggingHelper.writeLog("insert error", global.com_frontend, global.config.log_service.error_type, err.message);
												return;
											}
										});
									}else if(workerStationPriorityFirst.length==1){
										
										var stationCd = null;
										if(stations.length>0){
											stationCd = stations[0].station_cd
										}
										workerStation.update(obj1, stationCd  , function(err, wsUpdate){
											if(err){
												loggingHelper.writeLog("insert error", global.com_frontend, global.config.log_service.error_type, err.message);
												return;
											}
											
										});
									}
									res.send('successful');
								});
							});
						});
					});
				}); 
			});
	});
}

