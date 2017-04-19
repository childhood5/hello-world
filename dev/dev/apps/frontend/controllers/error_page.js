/**
* Tong.pham
*/
module.exports.controller = function(app) {	
	
	app.get('/error-page', function(req, res) {
		var error = global.helpers.session.getFlash(req.session);
		res.render('error_page/index', {error: error});
	});
	
};

