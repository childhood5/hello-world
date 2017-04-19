
/**
* 2015-06-05
* vo.quoc.viet 
*/
var path = global.path;
var loggingHelper = global.helpers.logging;

exports.getList = function(cb){
	var model = global.db.sModel.collections.prefectures;
	model.find({is_hidden: false, is_delete: false}).exec(function(err, $data){
        if(err){
            loggingHelper.writeLog("Error prefectures", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
        }
        if (typeof(cb) === 'function') {
            cb(err, $data);
        }
    });
}

exports.getPrefectureById = function(prefId, cb) {
	var model = global.db.sModel.collections.prefectures;
	model.find({id: prefId}).exec(function(err, $data){
        if(err){
            loggingHelper.writeLog("Error not found id of table prefectures", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
        }
        return cb($data[0]);
    });
}

exports.getPrefecturesByName = function(name , cb){
	var prefecture = global.db.sModel.collections.prefectures;
	prefecture.find({'name' : name}).exec(function(err, lsprefectures){
		if(err){
			loggingHelper.writeLog("Error prefectures", global.com_frontend, global.config.log_service.error_type, err.message);
		}
		return cb(err, lsprefectures);
	});
}
