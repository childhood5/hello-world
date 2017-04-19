var path = require('path');
var userDao = require(path.join(global.base_root, 'lib/models/dao/user.js'));
var sessionHelper = require(path.join(global.base_root, 'lib/helpers/sessionHelper.js'));
var fileHelper = require(path.join(global.base_root, 'lib/helpers/fileHelper.js'));
var fs = require('fs');

module.exports.controller = function(app) {	
	app.get('/user', function(req, res){
		if(sessionHelper.getUserListFilter(req.session)) {
			console.log(sessionHelper.getUserListFilter(req.session));
		}
		res.render('operator_user_list_pc/index', {
			breadcrumbs: req.breadcrumbs(),
			userListFilter: sessionHelper.getUserListFilter(req.session)
		});
	});

	app.post('/user', function(req, res){
		var birthday = req.body['birthday'];
		var sex = req.body['sex'];
		var keyword = req.body['keyword'];
		var columns = req.body['selectedColumns'];
		var pageNumber = req.body['pageNumber'];
		var rpp = req.body['rpp'];
		userDao.getUserListOnOperatorPage(birthday, sex, keyword, columns, pageNumber, rpp, function(userlist, totalRecords) {
			var filter = {
				sex: sex,
				birthday: birthday,
				keyword: keyword,
				columns: columns
			};
			sessionHelper.setUserListFilter(filter, req.session);
			res.json({userlist: userlist, userListFilter: filter, totalRecords: totalRecords});
		});
	});

	app.post('/user/delete', function(req, res){
		var selectedUser = req.body.selectedUser;
		for(var i=0;i<selectedUser.length;i++) {
			userDao.setUserDeletedFlagByEmail(1, selectedUser[i], function(data) {
			});
			if(i>=selectedUser.length-1) {
				res.send('Delete successfully.');
			}
		};
	});

	app.get('/user/export', function(req, res) {
		var reg = new RegExp(':', 'g');
		var fileName = new Date().toLocaleString().replace(reg, '-').replace(' ', '-');
		var keys = [
			'address1',
			'address2',
			'address3',
			'area_id',
			'birthday', 
			'building_type',
			'bus_stop',
			'company_id',
			'create_date',
			'customer_id',
			'demain',
			'email_address',
			'first_name',
			'first_name_kana',
			'gps_data', 
			'house_id',
			'id',
			'is_auto_lock',
			'is_delete', 
			'is_detail_updated', 
			'is_exist_pet',
			'is_hidden', 
			'is_receive_notify',
			'last_name',
			'last_name_kana',
			'login_password',
			'nickname',
			'pq_order',
			'prefecture_id',
			'profile_image_url',
			'recover_password', 
			'sex',
			'size_id', 
			'sort_order', 
			'tel', 
			'update_by', 
			'update_date', 
			'zip_code'
		];
		fileHelper.writeCSVFile(fileName+'.csv', keys, sessionHelper.getUserListFilter(req.session));
		res.redirect('/operator/user');
	});
};