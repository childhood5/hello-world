angular.module('shocola', []);

var HOME = {
	init: function(){
		$('.webpay-link').click(function() {
			$('#WP_checkoutBox input[type=button]').trigger('click');
			setTimeout(function() {
				$('li:gt(4)').remove();
			}, 500);
		});
	}
};

$(function() {
	HOME.init();
});
			