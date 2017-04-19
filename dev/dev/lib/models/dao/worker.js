/**
* 2015-06-05
* vo.quoc.viet 
**/

var path = global.path;
var loggingHelper = global.helpers.logging;

exports.insert = function(data, cb){
        var model = global.db.mModel.collections.workers;
        model.create(data).exec(function(err, $data){
            if(err){
                loggingHelper.writeLog("Error insert workers", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
            }
            if (typeof(cb) === 'function') {
                cb(err, $data);
            }
        });
    }

exports.login = function(data, cb){
	var model = global.db.sModel.collections.workers;
	model.findOne({tel:data.tel, login_password: global.helpers.encrypt.getPasswordFromSha1(data.login_password)}).exec(function(err, $data){
        console.log('dao - login');
        if(err){
            loggingHelper.writeLog("Error login workers", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
        }
        if (typeof(cb) === 'function') {
            cb(err, $data);
        }
    });
}
exports.getWorkerByEmailOrTel = function(data, cb) {
    var model = global.db.sModel.collections.workers;
    model.findOne({or:[{'email_address': data}, {'tel': data}]}).exec(function(err, data){
        if(err){
            loggingHelper.writeLog("Error getWorkerByEmailOrTel: ", global.config.log_service.com_frontend, global.config.log_service.error_type, err);
        }
        return cb(err, data);
    });
}
exports.updateRecoverPassword = function(data, cb){
    var model = global.db.mModel.collections.workers;
    model.update({'id': data.id}, {'recover_password': data.recover_password}, function(err, $data){ 
    	if(err){
            loggingHelper.writeLog("worker updateRecoverPassword: ", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
        }
        if (typeof(cb) === 'function') {
        	if($data && parseInt($data.length,10) > 0){
        		cb(err, $data[0]);
        	}else{
        		cb(err, $data);
        	}
            
        }
    });
}
exports.updatePassword = function(data, cb){
    var model = global.db.mModel.collections.workers;
    model.update({'id': data.id}, {'login_password': data.login_password}, function(err, $data){ 
    	if(err){
            loggingHelper.writeLog("worker updatePassword: ", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
        }
        if (typeof(cb) === 'function') {
        	if($data && parseInt($data.length,10) > 0){
        		cb(err, $data[0]);
        	}else{
        		cb(err, $data);
        	}
            
        }
    });
}

exports.updateStaff = function(requestData, cb){
	
	var staff = global.db.mModel.collections.workers;
	staff.update({'id': requestData.id}, requestData.json, function(err, listStaff){
		if(err){
			loggingHelper.writeLog("Error staff", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
		}
		return cb(err, listStaff);

	});
}

exports.getListStaff = function(filter, paging, cb){
	var staff = global.db.sModel.collections.workers;
	staff.find({'limit' : paging.limit, 'skip' : paging.from}).exec(function(err, listStaff){
		if(err){
			loggingHelper.writeLog("Error staff", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
		}
		return cb(err, listStaff);

	});
}

exports.getTotalCountStaff = function(cb){
	var staff = global.db.sModel.collections.workers;
	staff.count().exec(function(err, totalCount){
		if(err){
			loggingHelper.writeLog("Error get total count staff", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
		}
		return cb(err, totalCount);
	});
}