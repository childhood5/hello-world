var path = require('path');
var userDao = require(path.join(global.base_root, 'lib/models/dao/user.js'));
var roomSizeDao = require(path.join(global.base_root, 'lib/models/dao/room_size.js'));
var houseDao = require(path.join(global.base_root, 'lib/models/dao/house.js'));
var serviceDao = require(path.join(global.base_root, 'lib/models/dao/service_detail.js'));
var prefectureDao = require(path.join(global.base_root, 'lib/models/dao/prefecture.js'));
var stationDao = require(path.join(global.base_root, 'lib/models/dao/station.js'));
var userStationDao = require(path.join(global.base_root, 'lib/models/dao/user_station.js'));
var fs = require('fs');

module.exports.controller = function(app) {	
	app.post('/user/edit', function(req, res) {
		// Init breadcrumbs
		req.breadcrumbs('Edit', '');
		// ./Init breadcrumbs

		var userid = req.param('userid');
		roomSizeDao.getList(function(err, roomSizeList) {
			houseDao.getList(function(err, houseList) {
				serviceDao.getListServices(function(err, serviceList) {
					prefectureDao.getList(function(err, prefectureList) {
						stationDao.getList(function(err, stationList) {
							userDao.getUserAndStationNameById(userid, function(user) {
								for(var i=0;i<user.length;i++) {
									user[0]['station'+(i+1)] = user[i].station_name;
								};
								res.render('operator_user_detail_pc/index', {
									user: user[0], 
									stations: stationList, 
									roomsizes: roomSizeList,
									houses: houseList,
									services: serviceList,
									prefectures: prefectureList,
									buildings: global.config.buildingTypes,
									breadcrumbs: req.breadcrumbs()
								});
							});
						});
					});
				});
			});
		});
	});

	app.post('/user/update', function(req, res) {
		userDao.updateDetail(req.body, function(err, updatedUser) {
			if(err)
				console.log(err);
			function updateStationTemp(count) {
				if(count<4) {
					userStationDao.getRecordByUseridPriority(req.body.id, count, function(err1, data) {
						if(err1)
							console.log(err1);
						console.log(count);
						if(data) {
							userStationDao.updateStationByUseridPriority(req.body.id, count, req.body['station'+count], function(err2, newStation) {
								if(err2)
									console.log(err2);
								count++;
								updateStationTemp(count);
								if(count>=4)
									res.redirect('/operator/user');
							});
						}
						else {
							if(req.body.station3) {
								var obj = {
									user_id: req.body.id,
									station_cd: req.body['station'+count],
									station_group_cd: req.body['station'+count],
									priority: count,
									is_delete: 0,
									is_hidden: 0,
									update_by: 'anonymous'
								};
								userStationDao.addRecord(obj, function(err3, addedRecord) {
									if(err3)
										console.log(err3);
									count++;
									updateStationTemp(count);
									if(count>=4)
										res.redirect('/operator/user');
								});
							}
							else {
								res.redirect('/operator/user');
							}
						}
					});
				}
			}
			updateStationTemp(1);
		});
	});
};