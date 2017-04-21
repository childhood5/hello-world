var form = require('express-form'),
field = form.field;
var bodyParser = require('body-parser');

/* GET users listing. */
module.exports.controller = function(app){
	
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	
	app.post('/index_post',  
		function(req, res, next) {
			console.log("Contact Us::::", req.body);
			res.render('index', {
				'title' : 'Express',
				'messge' : 'Loading ...',
				'firstName': req.body.firstName,
				'password': req.body.password,
				'email': req.body.email
			});
	});
	
	app.get('/index_get', 
		form(field("firstName").trim(),
			field("password").trim(),
			field("email").trim(),
			field("contact_us").trim()
		), 
		function(req, res, next) {
			console.log("Contact Us::::", req.query);
 			res.render('index', {
				'title' : 'Express',
				'messge' : 'Loading ...',
				'firstName': req.form.firstName,
				'password': req.form.password,
				'email': req.form.email
			}); 
	});
}
