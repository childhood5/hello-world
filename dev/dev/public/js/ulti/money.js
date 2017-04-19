var MONEY = {
		sepa: '.',
		init:function(){
			$('.money').each(function(){
				$(this).val(MONEY.format($(this).val()));
			});
			$('.money-show').each(function(){
				$(this).text(MONEY.format($(this).text()));
			});
			$('input.money').change(function(){
				//var val = MONEY.reverse($(this).val())
				$(this).val(MONEY.format(val));
			}).focus(function(){
				if($(this).val()=='0'){
					$(this).val('');
				}
			}).focusout(function(){
				if($(this).val()==''){
					$(this).val('0');
				}
			});
		},
		format: function(val){
			if(val=='') return '0';
			var strVal = MONEY.reverse(val);
			var length = strVal.length; 
			var newStrVal = '';
			for(var i=1; i<=length; i++){
				if((i-1)%3==0 && i>1){
					newStrVal = strVal[length-i] + MONEY.sepa + newStrVal;
				}else{
					newStrVal = strVal[length-i] + newStrVal;
				}
			}
			return newStrVal;
		},
		reverse: function(val){
			if(val=='') return '0';
			var strVal = val + '';
			return strVal.replace(/,/g, '');
		}
}
$(function(){
	MONEY.init();
})