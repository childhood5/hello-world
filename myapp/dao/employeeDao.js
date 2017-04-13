//get list data from table employee
exports.list_data = function(cb){
	var model = global.db.model.collections.employee;
	model.find({id:1}).exec(function(err, data){
		if(err){
			throw err;
		}
		return cb(err, data);
	});
}


