angular.module('shocola', [])
	.controller("WorkerRecoverPassword", function($scope, $http){
		$scope.recoverPassword = function(){
			$http.post('/staff/forgot-password', {'email': $('#email').val()}).success(function(data){
				COMMON.ERROR.clear();
	        	COMMON.ERROR.add(data.message);
	    		if(parseInt(data.status, 10) == 0){
	        		$('#email').val('');
	        		//COMMON.ERROR.showSuccess();
	        		//setTimeout(function(){
	                	window.location = '/staff/forgot-password-success';
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
			 $scope.worker.login_password = Sha1.hash($scope.worker.login_password);
			 $scope.worker.confirm_password = Sha1.hash($scope.worker.confirm_password);
			 $scope.worker.tel = $('#tel').val();
			 $scope.worker.code = $('#code').val();
		     $http.post('/staff/recover-password', $scope.worker).success(function(data){
				COMMON.ERROR.clear();
	        	COMMON.ERROR.add(data.message);
	    		console.log(data);
	        	if(parseInt(data.status, 10) == 0){
	        		$scope.user = null;
	        		//COMMON.ERROR.showSuccess();
	        		//setTimeout(function(){
	                	window.location = '/staff/dashboard';
	                //}, COMMON.ERROR.delay);
	        	}else{
	        		COMMON.ERROR.show();
	        	}
	        	$('#hkrecover').attr('disabled', false);
			}).error(function(data){
				//redirect to error page
			})
		};
	}).controller("WorkerController", function($scope, $http){
        $scope.register = function(){
        	$scope.worker.login_password = Sha1.hash($scope.worker.login_password);
        	$scope.worker.confirm_password = Sha1.hash($scope.worker.confirm_password);
        	$scope.worker.staff_code = $('#staff_code').val();
			$scope.worker.is_receive_notify = 0;
			if($('#is_receive_notify').is(':checked')){
				$scope.worker.is_receive_notify = 1;
			}
			
            $http.post('/staff/register', $scope.worker).success(function(data){
            	COMMON.ERROR.clear();
            	COMMON.ERROR.add(data.message);
        		
            	if(parseInt(data.status, 10) == 0){
            		$scope.worker = null;
            		
            		//COMMON.ERROR.showSuccess();
                    //setTimeout(function(){
                    	window.location = '/staff/complete';
                    //}, COMMON.ERROR.delay);
            	}else{            		
            		COMMON.ERROR.show();
            		$scope.worker.login_password = '';
            		$scope.worker.confirm_password = '';
            	}
            	$('#hkregister').attr('disabled', false);
            }).error(function(data){
                //redirect to error page
            });
        };
        $scope.login = function(){
        	$scope.worker.login_password = Sha1.hash($scope.worker.login_password);
        	$http.post('/staff', $scope.worker).success(function(data){
            	COMMON.ERROR.clear();
        		COMMON.ERROR.add(data.message);
        		 
            	if(parseInt(data.status, 10) == 0){
            		$scope.worker = null;
            		//COMMON.ERROR.showSuccess();
                    //setTimeout(function(){
                    	window.location = '/staff/dashboard';
                    //}, COMMON.ERROR.delay);
            	}else{            		
            		COMMON.ERROR.show();
            		$scope.worker.login_password = '';
            	}
            	$('#hklogin').attr('disabled', false);
            }).error(function(data){
                //redirect to error page
            });
        };
    });
var WORKER = {
		init: function(){
			var val = 0; 
			if(parseInt($('#regDate7').val(), 10) == 1 || parseInt($('#regDate8').val(), 10)){
				val = 1;
			}
			$('#checkRegDate').val(val);
			
			$('#regDate7, #regDate8').change(function(){
				var val = 0; 
				if(parseInt($('#regDate7').val(), 10) == 1 || parseInt($('#regDate8').val(), 10)){
					val = 1;
				}
				$('#checkRegDate').val(val);
			});
		}
}
$(function(){
	WORKER.init();
});