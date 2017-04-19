var DATE = {
		isLeapYear: function(year){
			return new Date(year, 1, 29).getDate() == 29;
		},
		getLastDayOfMonth: function(year, month){
			switch(month){
				case 2:	return DATE.isLeapYear(year) ? 29 : 28;
				case 4:
				case 6:
				case 9:
				case 11: return 30;
			}
			return 31;
		},
		reloadDayOfMonth: function($ref){
			var year = parseInt($('#'+$ref.attr('hk-year')).val(), 10);
			var month = parseInt($('#'+$ref.attr('hk-month')).val(), 10);
			var dayOfMonth = DATE.getLastDayOfMonth(year, month);
			
			var currentSelect = $ref.val();
			$ref.html('');
			for(var i=1; i<=dayOfMonth; i++){
				$ref.append('<option value="'+i+'" '+(parseInt(currentSelect, 10) == i ? 'selected' : '')+'>'+i+'</option>');
			}
			if($ref.attr('placeholder')){
				$ref.prepend('<option value="-1" '+(currentSelect>dayOfMonth ? 'selected' : '')+'>'+$ref.attr('placeholder')+'</option>');
			}
			
		}
}

$(function(){
	$('select.hk-year').each(function(){
		var $ob = $(this);
		$ob.css('width', $ob.attr('hk-width'));
		if($ob.attr('hk-float')){
			$ob.css('float', $ob.attr('hk-float'));
		}
		var min = parseInt($ob.attr('hk-min-year'), 10);
		var max = parseInt($ob.attr('hk-max-year'), 10);
		$ob.html('');
		for(var i=min; i<=max; i++){
			$ob.append('<option value="'+i+'">'+i+'</option>');
		}
		if($ob.attr('placeholder')){
			$ob.prepend('<option value="-1">'+$ob.attr('placeholder')+'</option>');
		}
		if($ob.attr('hk-selected')){
			$ob.val($ob.attr('hk-selected'));
		}
		if($ob.attr('hk-ref')){
			$ob.unbind('change').change(function(){
				var $ref = $('#' + $ob.attr('hk-ref'));
				if($ref){
					DATE.reloadDayOfMonth($ref);
				}
			});
		};
	});
	$('select.hk-month').each(function(){
		var $ob = $(this);
		$ob.css('width', $ob.attr('hk-width'));
		if($ob.attr('hk-float')){
			$ob.css('float', $ob.attr('hk-float'));
		}
		$ob.html('');
		for(var i=1; i<=12; i++){
			$ob.append('<option value="'+i+'">'+i+'</option>');
		}
		if($ob.attr('placeholder')){
			$ob.prepend('<option value="-1">'+$ob.attr('placeholder')+'</option>');
		}
		if($ob.attr('hk-selected')){
			$ob.val($ob.attr('hk-selected'));
		}
		if($ob.attr('hk-ref')){
			$ob.unbind('change').change(function(){
				var $ref = $('#' + $ob.attr('hk-ref'));
				if($ref){
					DATE.reloadDayOfMonth($ref);
				}
			});
		};
	});	
	$('select.hk-day').each(function(){
		var $ob = $(this);
		$ob.css('width', $ob.attr('hk-width'));
		if($ob.attr('hk-float')){
			$ob.css('float', $ob.attr('hk-float'));
		}
		DATE.reloadDayOfMonth($ob);
		if($ob.attr('hk-selected')){
			$ob.val($ob.attr('hk-selected'));
		}
	});	
});