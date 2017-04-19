/**
* 2015-06-05
* vo.quoc.viet 
*/
var path = global.path; 
var loggingHelper = global.helpers.logging; 

exports.getList = function(cb){
	var model = global.db.sModel.collections.companies;
	model.find({is_hidden: false, is_delete: false}).exec(function(err, $data){
        if(err){
            loggingHelper.writeLog("Error get list companies", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
        }
        if (typeof(cb) === 'function') {
            cb(err, $data);
        }
    });
}
exports.getByAuthId = function(auth_id, cb){
	var model = global.db.sModel.collections.companies;
	model.findOne({is_hidden: false, is_delete: false, company_auth_id: auth_id}).exec(function(err, $data){
        if(err){
            loggingHelper.writeLog("Error not found company auth id", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
        }
        if (typeof(cb) === 'function') {
        	console.log($data);
            cb(err, $data);
        }
    });
}