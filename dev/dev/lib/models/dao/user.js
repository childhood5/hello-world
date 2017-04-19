
/**
* 2015-06-05
* vo.quoc.viet 
*/
var path = global.path;
var loggingHelper = global.helpers.logging;

exports.updateDetail = function(data, cb){
    var model = global.db.mModel.collections.users;
    model.update({'id': data.id}, data, function(err, $data){ 
    	if(err){
            loggingHelper.writeLog("Error update users", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
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

exports.insert = function(data, cb){
    var model = global.db.mModel.collections.users;
    model.create(data).exec(function(err, $data){
        if(err){
            loggingHelper.writeLog("Error insert users", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
        }
        if (typeof(cb) === 'function') {
            cb(err, $data);
        }
    });
}

exports.login = function(data, cb){
	var model = global.db.sModel.collections.users;
	model.findOne({tel:data.tel, login_password: global.helpers.encrypt.getPasswordFromSha1(data.login_password)}).exec(function(err, $data){
        if(err){
            loggingHelper.writeLog("Error login users", global.config.log_service.com_frontend, global.config.log_service.error_type, err);
        }
        if (typeof(cb) === 'function') {
            cb(err, $data);
        }
    });
}

exports.getUserByEmailOrTel = function(data, cb) {
    var user = global.db.sModel.collections.users;
    user.findOne({or:[{'email_address': data}, {'tel': data}]}).exec(function(err, data){
        if(err){
            loggingHelper.writeLog("Error getUserByEmailOrTel: ", global.config.log_service.com_frontend, global.config.log_service.error_type, err);
        }
        return cb(err, data);
    });
}
exports.updateRecoverPassword = function(data, cb){
    var model = global.db.mModel.collections.users;
    model.update({'id': data.id}, {'recover_password': data.recover_password, 'company_id': data.company_id}, function(err, $data){ 
    	if(err){
            loggingHelper.writeLog("updateRecoverPassword: ", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
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
    var model = global.db.mModel.collections.users;
    model.update({'id': data.id}, {'login_password': data.login_password, 'company_id': data.company_id}, function(err, $data){ 
    	if(err){
            loggingHelper.writeLog("updatePassword: ", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
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
/**
 * 2015-06-09
 * tan.ngo
 */
exports.getUserById = function(id, cb) {
    var user = global.db.sModel.collections.users;
    user.findOne({'id': id}).exec(function(err, data){
        if(err){
            loggingHelper.writeLog("Error getUserById: ", global.config.log_service.com_frontend, global.config.log_service.error_type, err);
        }
        return cb(data);
    });
}

exports.getUserListOnOperatorPage = function(birthday, sex, keyword, columns, pageNumber, rpp, cb) {
    var user = global.db.sModel.collections.users;
    var service_info = global.db.sMongoModel.collections.service_infos;
    var query = 'select u.id, u.first_name, u.email_address, u.tel, u.sex from users u where u.is_delete = 0 and u.sex regexp "$sex" and u.birthday like "%$birthday%"';
    if(keyword !== undefined && keyword !== '') {
        var reg = new RegExp(',', 'g');
        var columns = columns.replace(reg, '');
        columns = columns.trim();
        columns = columns.split(' ');
        var extraSearch = '';
        for(var i=0;i<columns.length;i++) {
            extraSearch = extraSearch + 'u.' + columns[i] + ' like "%' + keyword + '%" or '
        }
        extraSearch = extraSearch.substring(0, extraSearch.length-4);
        query = query + ' and (' + extraSearch + ')';
    }
    query = query.replace('$birthday', birthday);
    query = query.replace('$sex', sex);
    query = '(' + query + ')';
    query = "select selectedUsers.*, s.station_name from " + query + " as selectedUsers, user_stations us, stations s where selectedUsers.id = us.user_id and us.station_cd = s.station_cd and us.priority=1";
    query = query + " order by selectedUsers.id";
    console.log(query);
    user.query(query,[],function(err, userlist){
        if(err){
            console.log(err);
            loggingHelper.writeLog("Error not found user list", global.config.log_service.com_operator, global.config.log_service.error_type, err);
        }
        if(userlist.length!==0) {
            var count=0;
            for(var j=0;j<userlist.length;j++) {
                service_info.find({user_id: userlist[j].id}).exec(function(err, user_info_list) {
                    if(err)
                        console.log(err);
                    userlist[count].usage_count=user_info_list.length;
                    count++;
                    if(count >= userlist.length) {
                        var totalRecords = userlist.length;
                        userlist = userlist.slice((pageNumber-1)*rpp, (pageNumber-1)*rpp+rpp);
                        return cb(userlist, totalRecords);
                    }
                });
            };
        }
        else { 
            return cb(userlist, 0);
        }
    });
}

exports.setUserDeletedFlagByEmail = function(flag, email, cb) {
    var user = global.db.mModel.collections.users;
    user.findOne({email_address: email}, function(err1, data1) {
        if(err1)
            console.log(err1);
        console.log(data1);
        user.update({email_address: email}, {is_delete: 1, company_id: data1.company_id}).exec(function(err2, data2) {
            if(err2)
                console.log(err2);
            return cb(data2);
        });
    });
};

exports.getUserAndStationNameById = function(userid, cb) {
    var model = global.db.sModel.collections.users;
    var query = 'select us.user_id, us.station_cd, s.station_name from user_stations as us inner join stations as s on us.station_cd = s.station_cd';
    query = 'select u.*, us_s.station_name from users as u left join ('+query+') as us_s on u.id=us_s.user_id where u.id="$userid"';
    query = query.replace('$userid', userid);
    model.query(query,
                [],
                function(err, res) {
                    if(err){
                        loggingHelper.writeLog("Error get station name and user by userid", global.config.log_service.com_operator, global.config.log_service.error_type, err.message);
                    }
                    if (typeof(cb) === 'function') {
                        cb(res);
                    }
                });
};
