angular.module('shocola', []);

var HOME = {
	init: function(){
		$('input[name="serviceRequest"]').click(function() {
			$('select').trigger('click');   
		});
	}
};

$(function() {
	HOME.init();
});
