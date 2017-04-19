
/**
* 2015-06-05
* vo.quoc.viet 
*/
var path = global.path;
var loggingHelper = global.helpers.logging;


exports.insert = function(data, cb){
	var model = global.db.mModel.collections.user_stations;
	 model.create(data).exec(function(err, $data){
        if(err){
            loggingHelper.writeLog("Error insert user stations", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
        }
        if (typeof(cb) === 'function') {
            cb(err, $data);
        }
    });
};

exports.getStationNameByUserId = function(userid, cb) {
    var model = global.db.sModel.collections.user_stations;
    model.find({user_id: userid}).exec(function(err, data) {
        if(err)
            console.log(err);
        return cb(data);
    });
}

exports.updateStationByUseridPriority = function(userid, priority, stationcd, cb) {
	var model = global.db.mModel.collections.user_stations;
	model.update({user_id: userid, priority: priority}, {station_cd: stationcd}, function(err, data) {
		return cb(err, data);
	});
}

exports.getRecordByUseridPriority = function(userid, priority, cb) {
	var model = global.db.sModel.collections.user_stations;
	model.findOne({user_id: userid, priority: priority}, function(err, data) {
		return cb(err, data);
	});
};

exports.addRecord = function(obj, cb) {
    var model = global.db.mModel.collections.user_stations;
    model.create(obj).exec(function(err, data) {
        return cb(err, data)
    });
};
