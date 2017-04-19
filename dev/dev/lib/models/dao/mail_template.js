/**
 * HouseKeeping
 * tan.ngo
 * 2015/06/15
 */
var path = global.path;
var loggingHelper = global.helpers.logging;
 
exports.loadMailTemplateById = function(id, cb){
    var mailTemplate = global.db.sModel.collections.mail_templates;
    mailTemplate.findOne({id: id}, function(err, template) {
        if(err) {
            loggingHelper.writeLog("Error mail templates", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
        }
        else {
            return cb(template);
        }
    });
}