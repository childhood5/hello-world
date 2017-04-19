
/**
* 2015-06-05
* vo.quoc.viet 
*/
var path = global.path;
var loggingHelper = global.helpers.logging;

exports.getList = function(cb){
	var model = global.db.sModel.collections.families;
	model.find({is_hidden: false, is_delete: false}).exec(function(err, $data){
        if(err){
            loggingHelper.writeLog("Error get list families", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
        }
        if (typeof(cb) === 'function') {
            cb(err, $data);
        }
    });
}
