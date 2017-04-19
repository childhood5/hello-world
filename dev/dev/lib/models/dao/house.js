
/**
* 2015-06-05
* vo.quoc.viet 
*/
var path = global.path;
var loggingHelper = global.helpers.logging;

exports.getList = function(cb){
	var model = global.db.sModel.collections.houses;
	model.find({is_hidden: false, is_delete: false}).exec(function(err, $data){
        if(err){
            loggingHelper.writeLog("Error get list houses", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
        }
        if (typeof(cb) === 'function') {
            cb(err, $data);
        }
    });
};

exports.getHouseById = function(id, cb) {
	var model = global.db.sModel.collections.houses;
	model.findOne({id: id}, function(err, house) {
		if(err){
			loggingHelper.writeLog("Error not found id of table houses", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
		}
		return cb(house);
	});
};
