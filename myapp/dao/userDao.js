//get list data from table user
exports.get_listUser = function(idUser, cb){
	var model = global.db.model.collections.user;
	model.find({id:idUser}).exec(function(err, listUser){
		if(err){
			throw err;
		}
		return cb(err, listUser);
	});
}


