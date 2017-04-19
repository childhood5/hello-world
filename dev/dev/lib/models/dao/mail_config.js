/**
 * HouseKeeping
 * tan.ngo
 * 2015/06/15
 */
var path = global.path;
var loggingHelper = global.helpers.logging;
var encryptHelper = require(path.join(global.base_root + '/lib/helpers/encryptHelper.js'));

exports.loadMailConfigById = function(id, cb){
    var mailConfigs = global.db.sModel.collections.mail_configs;
    mailConfigs.findOne({id: id}, function(err, config) {
        if(err) {
            loggingHelper.writeLog("Error mail configs", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
        }
        config.config_password = encryptHelper.aesDecrypt(config.config_password, global.config.encryptDecrypt.mailPassKey);
        return cb(config);
    });
}