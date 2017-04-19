var fs = global.fs;
var path = global.path;
var filePath = path.join(global.base_frontend, global.config.template.template_path);

module.exports.controller = function(app) {
	app.get('/user-terms', function(req, res) {		
		fs.readFile(path.join(filePath, global.config.template.user_terms), {encoding: 'utf-8'} ,function(err, data) {
			res.send(data);
		});
	});
	
	app.get('/staff-terms', function(req, res) {
		fs.readFile(path.join(filePath, global.config.template.staff_terms), {encoding: 'utf-8'} ,function(err, data) {
			res.send(data);
		});
	});
};

