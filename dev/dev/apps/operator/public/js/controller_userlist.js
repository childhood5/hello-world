angular.module('shocola-operator', [])
	.controller('userlist', function($scope, $http, $window) {
		// Initialization
		$('#usertable').dataTable({
			paging: false,
			info: false,
			filter: false,
			"scrollY": "200px"
		});
		// ./Initialization

		edit = function(el) {
			$(el).submit();
		};

		update = function() {

		};

		deleteYes = function() {
			var userList = [];
			var selectedColumns = $('.table tbody input[type="checkbox"]:checked');
			selectedColumns.each(function() {
				userList.push($(this).val());	
			});
			if(userList.length === 0)
				alert("No user selected.");
			else {
				$http.post('/operator/user/delete', {selectedUser: userList})
					.success(function(data) {
						alert(data);
						$window.location.reload();
					})
					.error(function(err) {
						console.log(err);
					});
			}
		};

		csvExport = function() {
			$http.get('/operator/user/export')
				.success(function(data) {
					alert("Users successfully exported to CSV.");
					$("#exportModal #close").trigger('click');
				})
				.error(function(err) {
					console.log(err);
				});
		};

		pageNumberBlur = function() {
			var pageNumber = $('#pageNumber').val();
			var rpp = $('#rpp').val();
			search(pageNumber, rpp);
		};

		search = function(pageNumber, rpp) {
			PAGE_LOAD.start();
			var birthday = '';
			var sex = '.*';
			var selectedColumns = '';

			$("input[name='selectedColumn']:checked").each(function() {
				selectedColumns = selectedColumns + $(this).val() + ', ';
			})
			var keyword = $('input[name="keyword"]').val();

			if($('input[name="female"]:checked').length===1 && $('input[name="male"]:checked').length!==1) {
				sex = "FEM";
			}
			else if($('input[name="male"]:checked').length===1 && $('input[name="female"]:checked').length!==1) {
				sex = "MAL";
			}
			if( $('input[name="birthday"]').val() !== undefined && $('input[name="birthday"]').val() !== null ) {
				birthday = $('input[name="birthday"]').val().replace(new RegExp('\\/', 'g'), '-');
			}

			if(!selectedColumns)  {
				$('.filterList input[type="checkbox"]').each(function() {
					selectedColumns += $(this).val() + ', ';
				});
			}

			var params = {
				birthday: birthday,
				sex: sex,
				keyword: keyword,
				selectedColumns: selectedColumns,
				rpp: rpp,
				pageNumber: pageNumber
			};
			$http.post('/operator/user', params)
				.success(function(data) {
					PAGE_LOAD.stop();
					$scope.list = data.userlist;
					console.log($scope.list);
					var t = $('#usertable').DataTable();
					t.clear().draw();
					for(var i=0;i<data.userlist.length;i++) {
						var columnValues = [
						'<input type="checkbox" value="'+data.userlist[i].email_address+'">',
						'',
						data.userlist[i].first_name, 
						data.userlist[i].email_address, 
						data.userlist[i].tel, data.userlist[i].sex, 
						data.userlist[i].station_name, 
						data.userlist[i].usage_count];
						t.row.add(columnValues).draw();
					};
				})
				.error(function(err) {
					console.log(err);
				});
		};
	});
