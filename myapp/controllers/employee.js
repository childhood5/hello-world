var employeeDao = require(global.path.join(global.dirname, 'dao/employeeDao.js'));

/* GET users listing. */
module.exports.controller = function(app){
	app.get('/employee', function(req, res, next) {
		employeeDao.list_data(function(err, data){
			res.render('employee', {
				'title' : 'Express',
				'message' : 'Loading ...',
				'json' : data
			});
		});
		
	});
}


