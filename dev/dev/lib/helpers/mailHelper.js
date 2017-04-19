/**
 * HouseKeeping
 * tan.ngo
 * 2015/06/15
 */
var path = global.path;
var nodemailer = require('nodemailer');
var fs = global.fs;
var smtpTransport = require('nodemailer-smtp-transport');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

exports.sendMail = function(typeName, obj, cb) {
	var mailType = require(path.join(global.base_dao, 'mail_type.js'));
	var mailConfig = require(path.join(global.base_dao,'mail_config.js'));
	var mailTemplate = require(path.join(global.base_dao,'mail_template.js'));

	// load type of email
	mailType.loadMailTypeByName(typeName, function(type) {
		var typeId = type.id;
		// load config by email type_di
		mailConfig.loadMailConfigById(typeId, function(config) {
			// load template by email type_id
			mailTemplate.loadMailTemplateById(typeId, function(template) {
				fs.readFile(global.base_root + global.config.mail_config.mail_path + template.template_url, function(err, html) {
					if(err) {
						console.log(err);
					}
					htmlContent = html.toString();
					for(var key in obj) {
						if(obj.hasOwnProperty(key)) {
							var regex = new RegExp( "\\$\\{" + key + "\\}", 'g'); 
							htmlContent = htmlContent.replace(regex, obj[key]);
						}
					}
					var mailTo = (obj.mailTo === undefined ? obj.emailaddress : obj.mailTo);
					var mailOptions = {
					    from: config.display_name + ' ' + config.email_address,
				        to: mailTo,
					    subject: template.subject,
					    html: htmlContent,
					    rejectUnauthorized: false
					};
					if(typeName.indexOf("admin") >= 0 && typeName.indexOf("user") >= 0)
						mailOptions.to = global.config.mail_config.operator_user_email;
					else if(typeName.indexOf("admin") >= 0 && typeName.indexOf("worker") >= 0)
						mailOptions.to = global.config.mail_config.operator_worker_email;
					var transporter = nodemailer.createTransport(smtpTransport({
						host: config.domain,
						port: config.port,
						// service: "gmail",
						debug: true,
						auth: {
							user: config.email_address,
							pass: config.config_password
						}
					}));
					transporter.sendMail(mailOptions, function(error, info){
					    return cb(error, info);
					});
				});
			});
		});
	});
};
