/**
* 2015-06-19
* phu.le
**/
var path = global.path;
var loggingHelper = global.helpers.logging;

exports.insert = function(data, cb){
    var user_service = global.db.mMongoModel.collections.log_services;
    user_service.create(data).exec(function(err, data){
        if(err){
            loggingHelper.writeLog("Error write log services", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
        }
        return cb(data);
    });
    
};
