angular.module('shocola', [])
	.controller("UserImageController", function($scope, $http){
		
		$scope.uploadImage = function(files){
    		var fd = new FormData();
    	    //Take the first selected file
    	    fd.append("file", files[0]);

    	    $http.post('/user/upload-profile', fd, {
    	        withCredentials: true,
    	        headers: {'Content-Type': undefined },
    	        transformRequest: angular.identity
    	    }).success(function(data){
    	    	COMMON.ERROR.clear();
            	COMMON.ERROR.add(data.message);
            	
    	    	if(parseInt(data.status, 10) == 0){
    	    		$('#profile-img').attr('src', data.data.path);
    	    		$('#profile_image_url').val(data.data.name);
    	    	}else{
    	    		COMMON.ERROR.show();
    	    	}	
    	    }).error(function(){
    	    	//show error
    	    });
    	};
	}).controller("UserRecoverPassword", function($scope, $http){
		$scope.recoverPassword = function(){
			$http.post('/user/forgot-password', {'email': $('#email').val()}).success(function(data){
				COMMON.ERROR.clear();
            	COMMON.ERROR.add(data.message);
        		if(parseInt(data.status, 10) == 0){
            		$('#email').val('');
            		//COMMON.ERROR.showSuccess();
            		//setTimeout(function(){
                    	window.location = '/user/forgot-password-success';
                    //}, COMMON.ERROR.delay);
            		//alert('ok');
            	}else{
            		COMMON.ERROR.show();
            	}
            	$('#hkrecover').attr('disabled', false);
    		}).error(function(data){
    			//redirect to error page
    		})
		};
		$scope.recoverChange = function(){
			 $scope.user.login_password = Sha1.hash($scope.user.login_password);
			 $scope.user.confirm_password = Sha1.hash($scope.user.confirm_password);
			 $scope.user.tel = $('#tel').val();
			 $scope.user.code = $('#code').val();
		     $http.post('/user/recover-password', $scope.user).success(function(data){
				COMMON.ERROR.clear();
            	COMMON.ERROR.add(data.message);
        		console.log(data);
            	if(parseInt(data.status, 10) == 0){
            		$scope.user = null;
            		//COMMON.ERROR.showSuccess();
            		//setTimeout(function(){
                    	window.location = '/service-request';
                    //}, COMMON.ERROR.delay);
            	}else{
            		COMMON.ERROR.show();
            	}
            	$('#hkrecover').attr('disabled', false);
    		}).error(function(data){
    			//redirect to error page
    		})
		};
	}).controller("UserController", function($scope, $http){
    	
    	$scope.updateInfo = function(){
    		
    		$scope.user.profile_image_url = $('#profile_image_url').val();
    		$scope.user.zip_code = $('#zip_code').val();
    		$scope.user.prefecture_id = $('#prefecture_id').val();
    		$scope.user.address1 = $('#address1').val();
    		$scope.user.address2 = $('#address2').val();
    		$scope.user.address3 = $('#address3').val();
    		
    		$scope.user.house_id = $('#house_id').val();
    		$scope.user.building_type = $('#building_type').val();
    		$scope.user.is_auto_lock = $('#is_auto_lock').val();
    		$scope.user.station_name = $('#station_name').val();
    		$scope.user.bus_stop = $('#bus_stop').val();
    		
    		$scope.user.birthday = $('#birthday-year').val() + '-' +  $('#birthday-month').val() + '-' +  $('#birthday-day').val();
    		$scope.user.sex = $('#sex').val();
    		$scope.user.families = [];
    		$('input[name=families]').each(function(){
    			$scope.user.families.push($(this).val());
    		});	
    		
    		$scope.user.is_exist_pet = $('#is_exist_pet').val();
    		$scope.user.demain = $('#demain').val();
    		    		
    		
    		$http.post('/user/update-info', $scope.user).success(function(data){
    			COMMON.ERROR.clear();
            	COMMON.ERROR.add(data.message);
        		
            	if(parseInt(data.status, 10) == 0){
            		$scope.user = null;
            		
            		//COMMON.ERROR.showSuccess();
            		//console.log(data);
                    //setTimeout(function(){
                    	window.location = '/service-request';
                    //}, COMMON.ERROR.delay);
            		//alert('ok');
            	}else{
            		COMMON.ERROR.show();
            	}
            	$('#hkupdateinfo').attr('disabled', false);
    		}).error(function(data){
    			//redirect to error page
    		})
    	};
        $scope.register = function(){
            $scope.user.login_password = Sha1.hash($scope.user.login_password);
            $scope.user.confirm_password = Sha1.hash($scope.user.confirm_password);
			$scope.user.is_receive_notify = 0;
			if($('#is_receive_notify').is(':checked')){
				$scope.user.is_receive_notify = 1;
			}
            $http.post('/user/register', $scope.user).success(function(data){
            	COMMON.ERROR.clear();
            	COMMON.ERROR.add(data.message);
        		
            	if(parseInt(data.status, 10) == 0){
            		$scope.user = null;
            		
            		//COMMON.ERROR.showSuccess();
                   // setTimeout(function(){
                    	window.location = '/user/complete';
                    //}, COMMON.ERROR.delay);
            	}else{     
            		COMMON.ERROR.show();
            		$scope.user.login_password = '';
            		$scope.user.confirm_password = '';
            		setTimeout(function(){}, COMMON.ERROR.delay);
            	}
            	$('#hkregister').attr('disabled', false);
        		
            }).error(function(data){
            	//redirect to error page
            });
        };
        $scope.login = function(){
        	$scope.user.login_password = Sha1.hash($scope.user.login_password);
        	$http.post('/user', $scope.user).success(function(data){
            	COMMON.ERROR.clear();
        		COMMON.ERROR.add(data.message);
        		
            	if(parseInt(data.status, 10) == 0){
            		$scope.user = null;
            		//COMMON.ERROR.showSuccess();
                    //setTimeout(function(){
                        window.location = data.data.redirect;
                        //window.location = '/service-request';
                   // }, COMMON.ERROR.delay);
            	}
                else{            		
            		COMMON.ERROR.show();
            		$scope.user.login_password = '';
            		
            	}
            	$('#hklogin').attr('disabled',false);
            }).error(function(data){
                //redirect to error page
            	
            });
        };
    });

var USER = {
		init: function(){
			$('#is_receive_notify').attr('checked', 'checked');
			$('#profile-image').change(function(){
				angular.element(this).scope().uploadImage(this.files);
			});
			$('#zip_code').change(function(){
				if(COMMON.LOADING.is_loading) return fasle;
				COMMON.LOADING.show();
				 
				var $ob = $(this);
				
				$.ajax({
            		'method': 'GET',
            		'url': '/ajax/get-zipcode',
            		'dataType': 'json',
            		'data': {zipcode: $ob.val()},
            		'success': function(data){ 
            			console.log(data);
            			if(parseInt(data.status, 10) >0){
            				COMMON.ERROR.clear();
                    		COMMON.ERROR.add(data.message);
                    		COMMON.ERROR.show();
            			}else {
            				try{
            					if(data.data.error_code && data.data.error_note){
            						COMMON.ERROR.clear();
                            		COMMON.ERROR.add(data.data.error_note);
                            		COMMON.ERROR.show();
            					}else{
            						if(data.data.city.length > 0 && data.data.city !='none'){
            							$('#address1').val(data.data.city);
            						}
            						if(data.data.address.length > 0 && data.data.address !='none'){
            							$('#address2').val(data.data.address);
            						}
            						if(data.data.company.length > 0 && data.data.company !='none'){
            							$('#address3').val(data.data.company);
            						}
                        			$('#prefecture_id option').filter(function() {
                        			    return $(this).text() == data.data.state; 
                        			}).attr('selected', true);
            					}
                			}catch(ex){
                				
                			}
            			}
            			COMMON.LOADING.hide();
            		}
            	});
			});
		}
}

$(function(){
	USER.init();
})