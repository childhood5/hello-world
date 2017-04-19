/**
 * phu.le
 * 2016-06-19
 */
 var path = global.path;
 var logService = require(path.join(global.base_dao, 'log_service.js'));

 exports.writeLog = function(function_name, component_name, log_type, message_content){

    var datetime = new Date();
	
    //If write log to console
    if(global.config.log_service.current_output == global.config.log_service.console_output) {

		var log_content = '[TIME: ' + datetime + ']';
		log_content = log_content + '[FUNCTION NAME: ' + function_name + ']';
		log_content = log_content + '[COMPONENT NAME: ' + component_name + ']';
		log_content = log_content + '[LOG TYPE: ' + log_type + ']';
		log_content = log_content + '[CONTENT: ' + message_content + ']';

		console.log(log_content);
	}
	else if(global.config.log_service.current_output == global.config.log_service.db_output) {
		
		var data = {
			"function_name": function_name,
			"component_name": component_name,
			"log_type": log_type,
			"message_content": message_content,
			"create_date": datetime,
			"is_delete":"0",
			"is_hidden":"1"
		};

		logService.insert(data, function(data) {
			console.log(data);
		});
	};
};