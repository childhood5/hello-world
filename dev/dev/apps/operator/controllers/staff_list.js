var serviceDetail = global.daos.service_detail;
var staff = global.daos.worker;
var path = require('path');
var fs = require('fs');
var json2csv = require('json2csv');
var loggingHelper = global.helpers.logging;
var csv = require("fast-csv");

module.exports.controller = function(app) {

	app.get('/staff', staff_controller.staff_index);
	app.get('/staff/:page', staff_controller.staff_index);
	app.get('/staff/:page/:limit', staff_controller.staff_index);
	
	app.get('/get_staff_list', staff_controller.get_staff_list);
	app.get('/get_staff_list/:page', staff_controller.get_staff_list);
	app.get('/get_staff_list/:page/:limit', staff_controller.get_staff_list);
	
	app.post('/delete_staff_list', function(req, res){
		serviceDetail.delete(req.body.listId, function(err, listStaff){
			if(err){
				loggingHelper.writeLog("get user registered from users", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
				return;
			}
			res.send({'listStaff' : listStaff});
		});	
	});
	
	
	app.use('/load_staff_list', function(req, res){
		global.helpers.session.setCondition(req.body.json, req.session);
		serviceDetail.getListStaffStation(req.body.json , function(err, listStaff){
			if(err){
				loggingHelper.writeLog("get user registered from users", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
				return;
			}
			jsend = {items: []};
			for(var i=0; i<listStaff.length; i++){
				jsend.items.push({
					state: false,
					id: listStaff[i].id,
					staff_code: listStaff[i].staff_code,
					first_name: listStaff[i].first_name, 
					email_address: listStaff[i].email_address,
					tel: listStaff[i].tel,
					sex: listStaff[i].sex,
					address1: listStaff[i].address1
					});
			}
			res.send(jsend);
		});	
	});
	
	
	app.use('/exportCSV', function(req, res) {
		
		serviceDetail.getAllStaff(function(err, listStaff){

			var fields = ['Staff Code', 'Telephone number', 'Email'];
			var name = 'export_'+ (new Date().getTime()) + '.csv';
			var pathFileCSV = path.join(global.base_root, global.config.rasta.worker_export_path, name);
			var url = global.config.rasta.worker_export_url + name;
			var list = [];
			for(var i=0; i<listStaff.length; i++){
				list.push({
					'Staff Code': listStaff[i].staff_code,
					'Telephone number': listStaff[i].tel, 
					'Email': listStaff[i].email_address
					});
			}
			json2csv({ data: list, fields: fields }, function(err, csv) {
				if (err){
					console.log(err);
					return ;
				}
				fs.writeFile(pathFileCSV, csv, function(err) {
					if (err){
						console.log(err);
						return ;
					}
					res.send({'url' : url, 'path' : pathFileCSV});
				});
			});
		});
	});
	
	app.post('/update', function(req, res) {
		global.helpers.session.setStaff(req.body.idUpdate, req.session);
		global.helpers.session.setIdStaff(req.body.idUpdate, req.session);
		res.send('successful');
	});	
	
	app.use('/back-staff-information', function(req, res) {
		var json = global.helpers.session.getCondition(req.session);
		if(json){
			serviceDetail.getListStaffStation(json , function(err, listStaff){
				if(err){
					loggingHelper.writeLog("get user registered from users", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
					return;
				}
				jsend = {items: []};
				for(var i=0; i<listStaff.length; i++){
					jsend.items.push({
						state: false,
						id: listStaff[i].id,
						staff_code: listStaff[i].staff_code,
						first_name: listStaff[i].first_name, 
						email_address: listStaff[i].email_address,
						tel: listStaff[i].tel,
						sex: listStaff[i].sex,
						address1: listStaff[i].address1
						});
				}
				global.helpers.session.setFlash(jsend, req.session);
				res.send("successful");
			});
		}else{
			res.send("successful");
		}
		
	});
	
	app.post('/import', function(req, res) {
		
		serviceDetail.getAllStaff(function(err, listStaff){

			var name = 'import_'+ (new Date().getTime()) + '.csv';
			
			var pathFileCSV = path.join(global.base_root, global.config.rasta.worker_import_path, name);

			var csvStream = csv.createWriteStream({headers: true}),
				writableStream = fs.createWriteStream(pathFileCSV);
				
			csvStream.pipe(writableStream);
			
			for(var i=0; i<listStaff.length; i++){
				csvStream.write(listStaff[i]);
			}
			csvStream.end();

			res.send({'content' : 'successful'});
		});
	});

};

var staff_controller = {
	staff_index: function(req, res){
		serviceDetail.getListStation(function(err, listStations){
			if(err){
				loggingHelper.writeLog("get Stations error", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
				return;
			}
			var pager = global.helpers.pagination.getParams(req.params.page, req.params.limit);
			res.render('staff_list/index', {
				'lsStations': listStations, 
				'breadcrumbs': req.breadcrumbs(),
				'json' : global.helpers.session.getCondition(req.session),
				'limit': pager.limit,
				'page': pager.page,
				'cache': pager.cache,
				'item_per_page': global.config.pagination.item_per_page
			});
		});
	},
	get_staff_list: function(req, res){
		
		var fromTo = global.helpers.pagination.getFromTo(req.params.page, req.params.limit);

		var filter = {
			keyword: 'test',
			fields: [],
			station: -1,
			male: false,
			female: false
		}
		
		var json = global.helpers.session.getFlash(req.session);
		if(!json){
			staff.getTotalCountStaff(function(err, totalCount){
				staff.getListStaff(filter, fromTo, function(err, listStaff){
					if(err){
						loggingHelper.writeLog("get user registered from users", global.config.log_service.com_frontend, global.config.log_service.error_type, err.message);
						return;
					}
					jsend = {
							columns: [],
							data: [],
							pagination: {}
					};
					for(var i=0; i<listStaff.length; i++){
						jsend.data.push({
							'id': listStaff[i].id,
							'staff_code': listStaff[i].staff_code, 
							'name': listStaff[i].first_name + ' ' + listStaff[i].last_name, 
							'email_address': listStaff[i].email_address,
							'tel': listStaff[i].tel,
							'sex': listStaff[i].sex,
							'address1': listStaff[i].address1,
							'action': '<a href="/operator/staff/detail/'+listStaff[i].id+'">image</a>'
							});
					};
					jsend.columns = [{ name: "staff_code", title: "Staff code", type: "text", width: 250 },
									{ name: "name", title: "Full name", type: "text", width: 200 },
									{ name: "email_address", title: "Email", type: "text",width: 200 },
									{ name: "tel", title: "Telephone", type: "text", width: 120},
									{ name: "sex", title: "Gender", type: "text", width: 100},
									{ name: "address1", title: "Address", type: "text"},
									{ name: "action", title: "Action", type: "html"}];
					jsend.pagination = global.helpers.pagination.getPagination(req.params.page, req.params.limit, totalCount, '/operator/get_staff_list')
					res.send(jsend);
				});
			});
		}else{
			res.send(json);
		}
	}
}