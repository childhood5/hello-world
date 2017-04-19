angular.module('shocola-operator', [])
	.controller("StaffListController", function($scope, $http){
		alert('/operator/get_staff_list/' + $('#jsgrid-page').val() + '/' +  $('#jsgrid-limit').val());
		$http.get('/operator/get_staff_list/' + $('#jsgrid-page').val() + '/' +  $('#jsgrid-limit').val()).success(function(data){
			GRIDVIEW.render(data.columns, data.data, data.pagination, $('#jgrid'));
		});
		/*
		$http.get('/operator/get_staff_list').success(function(data){
			if(!data && data.status > 0){
				return;
			}
			var $data = data.items;
			
			var obj = {
					scrollModel: { autoFit: true },
					numberCell: { show: true },
					title: "Staff selections",
					selectionModel: { type: null },
					pasteModel: { on: false },
					pageModel: { type: "local", rPP: 10 },
					colModel: [		{ title: "", 
										dataIndx: "state", 
										maxWidth: 30, 
										minWidth: 30, 
										align: "center", 
										cb: { header: true, all: false },
										type: 'checkBoxSelection', 
										cls: 'ui-state-default', 
										resizable: false, 
										sortable: false, 
										editable: false
									},
					           		{ title: "Staff code", width: 200, dataType: "string", align: "left", dataIndx: "staff_code" },
									{ title: "Name", width: 100, dataType: "string", align: "left", dataIndx: "first_name" },
									{ title: "Email", width: 180, dataType: "string", align: "left", dataIndx: "email_address" },
									{ title: "Phone number", width: 170, dataType: "string", align: "left", dataIndx: "tel" },
									{ title: "Sex", width: 170, dataType: "string", align: "left", dataIndx: "sex" },
									{ title: "Address", width: 170, dataType: "string", align: "left", dataIndx: "address1" },
									{ title: "Edit", width: 100, align: "center",
										render: function (){return "<img src=/operator/content/css/images/edit.png /> "},
										editable: function (ui) {
											$.ajax({
													'method': 'POST',
													'url': '/operator/update',
													'dataType': 'text',
													'data' : {'idUpdate' : ui.rowData.id},
													'success': function(response){
														window.location.href = "/operator/staff/detail";
													},
													'error': function(response){
														alert("Error: " + response.message);
													}
											});
										}
									}
					],
					editModel: { 
						keyUpDown: false,
						clicksToEdit: 1
					},
					dataModel: {
						data: $data,
						location: "local",
						sorting: "local",
						sortIndx: "address1",
						sortDir: "down"
					}
				};
				var $grid = $("#grid_selection_checkbox").pqGrid(obj);
				
				
				$('#deleteRow, #deleteSecond').click(function() {
					
					selarray = $grid.pqGrid('selection', { type: 'row', method: 'getSelection' }),
					idDelete = [];
					for (var i = 0, len = selarray.length; i < len; i++) {
						var rowData = selarray[i].rowData;
						idDelete.push(rowData.id);
						
					}
					if(idDelete.length<=0){
						alert("Please selection rows delete");
					}else{
						$.ajax({
								'method': 'POST',
								'url': '/operator/delete_staff_list',
								'dataType': 'json',
								'data' : {'listId' : idDelete},
								'success': function(response){
									
									var grid = $grid.pqGrid("getInstance").grid;
									grid.option("dataModel.data", response.listStaff);
									grid.refreshDataAndView();
									grid.hideLoading();
									alert("Delete success");
								},
								'error': function(data){
									alert("Delete error");
								}
						});
					}
				});
				
				
				$('#filter').click(function() {
					var json = {
						'female' : $('#female').is(':checked'),
						'male' : $('#male').is(':checked'),
						'station_name' : $('#station_name').val(),
						'first_name' : $('#first_name').is(':checked'),
						'email_address' : $('#email_address').is(':checked'),
						'tel' : $('#tel').is(':checked'),
						'zip_code' : $('#zip_code').is(':checked'),
						'address1' : $('#address1').is(':checked'),
						'keyword' : $('input[name="keyword"]').val()
					}
					$.ajax({
							'method': 'POST',
							'url': '/operator/load_staff_list',
							'dataType': 'json',
							'data' : {'json' : json},
							'success': function(response){
								
								var grid = $grid.pqGrid("getInstance").grid;
								grid.option("dataModel.data", response.items);
								grid.refreshDataAndView();
								grid.hideLoading();
								alert("Successful");
							},
							'error': function(data){
								alert("Error");
							}
					});
				});
			});
		});*/
});
var STAFF = {
	init: function(){
		$('#export').click(function() {
			$.ajax({
            		'method': 'GET',
            		'url': '/operator/exportCSV',
            		'dataType': 'json',
            		'success': function(data){
						console.log(data);
						window.open(data.url);
            		},
					'error': function(data){
						alert("Export file CSV error");
            		}
            	});
		});
		
		$('input[name=update]').click(function() {
			
		
			var json = {
					'staff_code' : $('#staff_code').val(),
					'male' : $('#male').is(':checked'),
					'female' : $('#female').is(':checked'),
					'unknown' : $('#unknown').is(':checked'),
					'first_name' : $('#first_name').val(),
					'last_name' : $('#last_name').val(),
					
					'first_name_kana' : $('#first_name_kana').val(),
					'last_name_kana' : $('#last_name_kana').val(),
					'nick_name' : $('#nick_name').val(),
					
					'birthday' : $('#birthday').val(),
					'phone_number' : $('#phone_number').val(),
					'email' : $('#email').val(),
					
					'prefecture': $('#prefecture').val(),
					'station1': $('#station1').val(),
					'station2': $('#station2').val(),
					
					'address1': $('#address1').val(),
					'address2': $('#address2').val(),
					'textarea': $('#textarea').val()
				}
		
			$.ajax({
            		'method': 'POST',
            		'url': '/operator/information-update',
					'data' : {'json' : json},
            		'dataType': 'text',
            		'success': function(data){
						window.location.href = "/operator/staff";
						alert("Update successful");
            		},
					'error': function(data){
						alert("Information update error" + data.message);
            		}
            	});
		});
		
		$('#back').click(function() {
			$.ajax({
            		'method': 'POST',
            		'url': '/operator/back-staff-information',
            		'dataType': 'text',
            		'success': function(data){
						window.location.href = "/operator/staff";
            		},
					'error': function(data){
						alert("Error");
            		}
            	});
		});
		
		$('#import').click(function() {
			$.ajax({
					'method': 'POST',
            		'url': '/operator/import',
            		'dataType': 'json',      	
            		'success': function(reponse){
						alert("Import file CSV successful");
            		},
					'error': function(reponse){
						alert("Import file CSV error");
            		}
            	});
		});
		
	}
};

$(function() {
	STAFF.init();
});		
		

