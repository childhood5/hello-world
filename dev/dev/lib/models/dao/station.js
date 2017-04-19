
/**
* 2015-06-05
* vo.quoc.viet 
*/

var path = global.path;
var loggingHelper = global.helpers.logging;

exports.getList = function(cb){
	var model = global.db.sModel.collections.stations;
	model.find().exec(function(err, $data){
        if(err){
            loggingHelper.writeLog("Error stations", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
        }
        if (typeof(cb) === 'function') {
            cb(err, $data);
        }
    });
}
exports.getByName = function(name, cb) {
    var model = global.db.sModel.collections.stations;
    model.findOne({'station_name': name}).exec(function(err, data){
        if(err){
            loggingHelper.writeLog("Error not found name stations", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
        }
        return cb(err, data);
    });
}
