angular.module('shocola', []);

var HOME = {
	init: function(){
		$('.hk-select-box').unbind('click').click(function(){
			var $obj = $(this);
			if($obj.attr('class').indexOf(COMMON.ACTIVE_CLASS) >= 0){
				$obj.removeClass(COMMON.ACTIVE_CLASS);
			}else{
				$obj.addClass(COMMON.ACTIVE_CLASS);
			}
		});
	}
};

$(function() {
	HOME.init();
});
