/**
* 2015-07-07
* le.phu 
*/

var path = global.path;
var loggingHelper = global.helpers.logging;

exports.login = function(data, cb){
	var model = global.db.sModel.collections.operations;
	model.findOne({email_address: data.email_address, login_password: global.helpers.encrypt.getPasswordFromSha1(data.login_password)}).exec(function(err, $data){
        if(err){
            loggingHelper.writeLog("Error login operations", global.config.log_service.com_frontend, global.config.log_service.error_type, err);
        }
        if (typeof(cb) === 'function') {
            cb(err, $data);
        }
    });
}