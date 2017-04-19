
/**
* 2015-07-24
* ngo.thanh.tan
*/

var path = global.path;
var loggingHelper = global.helpers.logging;

exports.getList = function(cb){
	var model = global.db.sModel.collections.building_types;
	model.find({is_delete: false}).exec(function(err, $data){
        if(err){
            loggingHelper.writeLog("Error room sizes", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
        }
        if (typeof(cb) === 'function') {
            cb(err, $data);
        }
    });
};

exports.getBuildingById = function(building_type, cb) {
	var model = global.db.sModel.collections.building_types;
	model.findOne({id: building_type}, function(err, data) {
		if(err){
			console.log(err);
            loggingHelper.writeLog("Error get building type by id", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
        }
		return cb(data);
	});
};	