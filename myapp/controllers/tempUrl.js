/* GET users listing. */
module.exports.controller = function(app){
	app.get('/temp/home11', function(req, res) {
		
		console.log("temp:: ", req.query);
		
		global.params = req.query;
		
		res.redirect('/home/index');
		return;
	
	});
}


