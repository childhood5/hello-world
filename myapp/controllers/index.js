/* GET users listing. */
module.exports.controller = function(app){
	app.get('/home', function(req, res, next) {
		res.render('index', {
			'title' : 'Express',
			'messge' : 'Loading ...'
		});
	});
}


