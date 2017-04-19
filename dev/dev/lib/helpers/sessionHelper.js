/**
* 2015-06-08
* vo.quoc.viet
**/




// WORKER
exports.setWorker = function(worker, session){
    session.hkworker = worker;
}
exports.getWorker = function(session){
    return session.hkworker;
}

exports.setWorkerLoginTimes = function(times, session){
	session.hkworker_login = {'times': times, 'logged_date': new Date().getTime()};
}
exports.getWorkerLoginTimes = function(session){
	return session.hkworker_login;
}

exports.setWorkerRecoverPassword = function(data, session){
    session.hkworkerRecoverPassword = data;
}
exports.getWorkerRecoverPassword = function(session){
    return session.hkworkerRecoverPassword;
}

//USER
exports.setUser = function(user, session){
    session.hkuser = user;
}
exports.getUser = function(session){
    return session.hkuser;
}

exports.setUserLoginTimes = function(times, session){
	session.hkuser_login = {'times': times, 'logged_date': new Date().getTime()};
}
exports.getUserLoginTimes = function(session){
	return session.hkuser_login;
}

exports.setUserRecoverPassword = function(data, session){
    session.hkuserRecoverPassword = data;
}
exports.getUserRecoverPassword = function(session){
    return session.hkuserRecoverPassword;
}
/**
 * 2015-06-09
 * vo.quoc.viet
 */
exports.setFlash = function(msg, session){
	session.hkflash = msg;
}
exports.getFlash = function(session){
	var rt = session.hkflash;
	session.hkflash = null;
	return rt;
}

/**
 * tan.ngo
 */
// Service request get/set
exports.setServiceRequest = function(serviceRequest, session) {
	session.serviceRequest = serviceRequest;
};
exports.getServiceRequest = function(session) {
	return session.serviceRequest;
};
exports.setUserListFilter = function(filter, session) {
	session.userListFilter = filter;
};
exports.getUserListFilter = function(session) {
	return session.userListFilter;
};

/**
* save session for staff
*/
exports.setStaff = function(msg, session){
	session.staff = msg;
}
exports.getStaff = function(session){
	return session.staff;
}

exports.setCondition = function(msg, session){
	session.condition = msg;
}
exports.getCondition = function(session){
	return session.condition;
}

exports.setIdStaff = function(msg, session){
	session.idStaff = msg;
}
exports.getIdStaff = function(session){
	var id = session.idStaff;
	session.idStaff = null;
	return id;
}

/**
* save session for operator
*/
exports.setOperator = function(op, session){
	session.operator = op;
}
exports.getOperator = function(session){
	return session.operator;
}
