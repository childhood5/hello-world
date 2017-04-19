//get list data from table employee
exports.list_student = function(name, cb){
	var model = global.db.model.collections.student;
	model.findOne({name:name}).exec(function(err, data){
		if(err){
			throw err;
		}
		return cb(err, data);
	});
}


