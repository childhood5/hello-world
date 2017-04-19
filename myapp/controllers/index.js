/* GET users listing. */
module.exports.controller = function(app){
	
	app.get('/temp/home', function(req, res) {
		
		console.log("temp:: ", req.query);
		
		global.params = req.query;
		
		res.redirect('/home/index', 'post');
		return;
	
	});
	
	
	app.post('/home/index', function(req, res, next) {
		console.log("name:: ", req.query);
		res.render('index', {
			'title' : 'Express',
			'messge' : 'Loading ...'
			//'firstName': req.query.firstName,
			//'password': req.query.password,
			//'email': req.query.email
		});
	});
}


