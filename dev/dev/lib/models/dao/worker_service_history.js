/**
* 2015-06-05
* vo.quoc.viet 
**/
var path = global.path;
var loggingHelper = global.helpers.logging;

exports.insert = function(data, cb){
        var model = global.db.mMongoModel.collections.worker_service_histories;
        model.create(data).exec(function(err, $data){
        	if(err){
                loggingHelper.writeLog("Error insert worker service histories", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
            }
            if (typeof(cb) === 'function') {
                cb(err, $data);
            }
        });
    }