/**
* 2015-06-05
* tan.ngo
**/

var path = global.path;
var loggingHelper = global.helpers.logging;

exports.insert = function(data, cb){
    var service_info = global.db.mMongoModel.collections.service_infos;
    service_info.create(data).exec(function(err, data){
        if(err){
            loggingHelper.writeLog("Error insert service infos", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
        }
        return cb(data);
    });
    
};

exports.getFinishedServiceCountByUserId = function(userid, cb) {
	var service_info = global.db.mMongoModel.collections.service_infos;
    service_info.find({user_id: userid, status_id: 80}).exec(function(err, data){
        if(err){
            loggingHelper.writeLog("Error service_info.getFinishedServiceCountByUserId", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
        }
        return cb(data.length);
    }); 
}