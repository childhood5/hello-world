var userDao = require(global.path.join(global.dirname, 'dao/userDao.js'));
/* GET users listing. */
module.exports.controller = function(app){
	app.get('/get_user/:id', function(req, res) {
		var id = req.params.id;
		console.log(req.params);
		userDao.get_listUser(id, function(err, listUser){
			res.json(listUser);
		});
	  
	});
}

