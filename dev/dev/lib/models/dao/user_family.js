
/**
* 2015-06-05
* vo.quoc.viet 
*/

var path = global.path;
var loggingHelper = global.helpers.logging

exports.insert = function(data, cb){
	var model = global.db.mModel.collections.user_families;
	 model.create(data).exec(function(err, $data){
        if(err){
            loggingHelper.writeLog("Error insert user families", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
        }
        if (typeof(cb) === 'function') {
            cb(err, $data);
        }
    });
}

