/**
 * HouseKeeping
 * tan.ngo
 * 2015/06/15
 */
var path = global.path; 
var loggingHelper = global.helpers.logging;
 
exports.loadMailTypeByName = function(name, cb){
    var mailTypes = global.db.sModel.collections.mail_types;
    mailTypes.findOne({name: name}, function(err, type) {
        if(err) {
            loggingHelper.writeLog("Error mail types", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
        }
        else {
            return cb(type);
        }
    });
}