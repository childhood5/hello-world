var student = require(global.path.join(global.dirname, 'dao/studentDao.js'));

/* GET users listing. */
module.exports.controller = function(app){
	app.get('/student/:name', function(req, res) {
		student.list_student(req.params.name, function(err, ls_data){
			res.render('student', {
				'json' : ls_data,
				'message' : 'message'
			});
		});
		
	});
}


