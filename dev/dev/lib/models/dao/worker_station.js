/**
* 2015-07-21
* Tong.pham 
**/

var loggingHelper = global.helpers.logging;

exports.insert = function(data, cb){
    var workerStations = global.db.sModel.collections.worker_stations;
	workerStations.create(data).exec(function(err, listWorkerStations){
		console.log(listWorkerStations);
		if(err){
			loggingHelper.writeLog("Error insert Worker Stations", global.com_frontend, global.config.log_service.error_type, err.message);
		}
		return cb(err, listWorkerStations);
	});
}

exports.update = function(request, stationCd , cb){
	var workerStations = global.db.sModel.collections.worker_stations;
	workerStations.update(request, {'station_cd' : stationCd}, function(err, updateWorkerStation){
		if(err){
			console.log(err.message);
			loggingHelper.writeLog("Error staff", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
		}
		return cb(err, updateWorkerStation);
	});
}

exports.getWorkerStationPriority = function(request, cb){
	var workerStations = global.db.sModel.collections.worker_stations;
	workerStations.find(request).exec(function(err, listWorkerStations){
		if(err){
			loggingHelper.writeLog("Error Worker Stations", global.com_frontend, global.config.log_service.error_type, err.message);
		}
		console.log("ddddddddddddddddddddddd: " + listWorkerStations.length);
		return cb(err, listWorkerStations);
	});
}

