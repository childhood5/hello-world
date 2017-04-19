var PAGE_LOAD = {
	start: function() {
		$('.page_load').css({
			"width":"100%",
			"height":"100%",
			"background-color":"gray",
			"opacity":"0.7",
			"position":"fixed",
			"top":"0",
			"left":"0",
			"z-index":"2",
			"background-repeat":"no-repeat",
			"background-attachment":"fixed",
			"background-position":"center",
			"background-image":"url('/plugin/page_load/loading.gif')"
		});
		$('.page_load img').css({
			"position":"fixed",
			"width":"50px",
			"height":"50px",
			"top":"50%",
			"left":"50%",
			"z-index":"2"
		});
	},
	stop: function() {
		$('.page_load').css({
			"z-index":"-2"
		});
	}
};