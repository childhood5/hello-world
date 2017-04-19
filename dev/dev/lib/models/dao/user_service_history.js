/**
* 2015-06-05
* tan.ngo
**/

var path = global.path;
var loggingHelper = global.helpers.logging;

exports.insert = function(data, cb){
    var user_service = global.db.mMongoModel.collections.user_service_histories;
    user_service.create(data).exec(function(err, data){
        if(err){
          loggingHelper.writeLog("Error insert user service histories", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
        }
       	 return cb(data);
    });
    
};
