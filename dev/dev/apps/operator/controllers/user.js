var path = require('path');
//var User = require(path.join(global.server.base_root, 'lib/mysql_models/user.js'));
//var mysqlConn = global.server.mysql_connection;
module.exports.controller = function(app) {
	app.get('/user/list', function(req, res) {
		res.render('user/user_list_pc.jade');
	});

	app.get('/user/detail', function(req, res) {
		res.render('user/user_detail_pc.jade');
	});
	
};

