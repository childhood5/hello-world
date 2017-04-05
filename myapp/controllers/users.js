
/* GET users listing. */
module.exports.controller = function(app){
	app.get('/users', function(req, res, next) {
	  res.send('respond with a resource');
	});
}

