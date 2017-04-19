var path = global.path;
var loggingHelper = global.helpers.logging;

module.exports.controller = function(app) {	
	var area = global.daos.area;
	app.get('/ajax/get-areas', function(req, res){
		area.getList(function(err, data){
			if(err){
				loggingHelper.writeLog("Error get list area", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
				res.send({status: 1, message: req.i18n.__('error-ajax-area-get-list')});
			}else{
				var arr = [];
				for(var i=0; i<data.length; i++){
					arr[i] = {
							'text': data[i].name,
							'value': data[i].id
					}
				}
				res.send({status: 0, message:'', data: {sources: arr}});
				
			}
		});
	});
	app.get('/ajax/get-prefectures', function(req, res){
		var pref = global.daos.prefecture;
		pref.getList(function(err, data){
			if(err){
				loggingHelper.writeLog("Error get list prefecture", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
				res.send({status: 1, message: req.i18n.__('error-ajax-prefecture-get-list')});
			}else{
				var arr = [];
				for(var i=0; i<data.length; i++){
					arr[i] = {
							'text': data[i].name,
							'value': data[i].id
					}
				}
				res.send({status: 0, message:'', data: {sources: arr}});
				
			}
		});
	});
	app.get('/ajax/get-houses', function(req, res){
		var house = global.daos.house;
		house.getList(function(err, data){
			if(err){
				loggingHelper.writeLog("Error get list house", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
				res.send({status: 1, message: req.i18n.__('error-ajax-house-get-list')});
			}else{
				var arr = [];
				for(var i=0; i<data.length; i++){
					arr[i] = {
							'text': data[i].name,
							'value': data[i].id
					}
				}
				res.send({status: 0, message:'', data: {sources: arr}});
			}
		});
	});
	app.get('/ajax/get-sizes', function(req, res){
		var room_size = global.daos.room_size;
		room_size.getList(function(err, data){
			if(err){
				loggingHelper.writeLog("Error get list room size", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
				res.send({status: 1, message: req.i18n.__('error-ajax-size-get-list')});
			}else{
				var arr = [];
				for(var i=0; i<data.length; i++){
					arr[i] = {
							'text': data[i].size,
							'value': data[i].id
					}
				}
				res.send({status: 0, message:'', data: {sources: arr}});
				
			}
		});
	});
	app.get('/ajax/get-companies', function(req, res){
		var company = global.daos.company; 
		company.getList(function(err, data){
			if(err){
				loggingHelper.writeLog("Error get list company", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
				res.send({status: 1, message: req.i18n.__('error-ajax-company-get-list')});
			}else{
				var arr = [];
				for(var i=0; i<data.length; i++){
					arr[i] = {
							'text': data[i].name,
							'value': data[i].id
					}
				}
				res.send({status: 0, message:'', data: {sources: arr}});
				
			}
		});
	});
	app.get('/ajax/get-stations', function(req, res){
		var station = global.daos.station;
		station.getList(function(err, data){
			if(err || !data){
				if(err){
					loggingHelper.writeLog("Error get list station", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
				}				
				res.send({status: 1, message: req.i18n.__('error-ajax-station-get-list')});
			}else{
				var arr = [];
				console.log(data);
				for(var i=0; i<data.length; i++){
					arr[i] = {
							'text': data[i].station_name,
							'value': data[i].id
					}
				}
				res.send({status: 0, message:'', data: {sources: arr}});
				
			}
		});
	});
	app.get('/ajax/get-zipcode', function(req, res){
		var url = global.config.zipcode.url + '?zn=' + req.query.zipcode;
		
		var request = require('request');
		var xmlp = require('xmlparser');
		request(url, function (error, response, body) {
			  if (!error && response.statusCode == 200) {
				  var data = xmlp.parser(body);
				  if(data.ZIP_result.ADDRESS_value){
					  data = data.ZIP_result.ADDRESS_value.value;
				  }else if(data.ZIP_result.result){
					  data = data.ZIP_result.result;
				  }else{
					  res.send({status: 1, message: req.i18n.__('error-ajax-get-zip-code-not-found')});
					  return;
				  }
				  var status = {
						  status: 0,
						  data: ''
				  }
				  var str = '{';
				  var strsub = '';
				  for(i in data){
					  for( j in data[i]){
						 str += strsub + '"' + j + '":"' + data[i][j] + '"' ;
						 strsub = ',';
					  }
				  }
				  str += '}';
				  status.data = JSON.parse(str);
				  res.send(status);
			  }else{
				  res.send({status: 1, message: req.i18n.__('error-ajax-get-zip-code')});
			  }
		});
	});
};