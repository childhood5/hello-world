var ULTI = {
		separators: [',', '.'],
		format_number: function(val, sepa){
			if(val=='') return '0';
			if (ULTI.separators.indexOf(sepa) < 0){
				sepa = ULTI.separators[0];
			}
			var strVal = ULTI.string_reverse(val);
			var length = strVal.length; 
			var newStrVal = '';
			for(var i=1; i<=length; i++){
				if((i-1)%3==0 && i>1){
					newStrVal = strVal[length-i] + sepa + newStrVal;
				}else{
					newStrVal = strVal[length-i] + newStrVal;
				}
			}
			return newStrVal;
		},
		string_reverse: function(val){
			if(val=='') return '0';
			var strVal = val + '';
			strVal = strVal.replace(/,/g, '');
			strVal = strVal.replace(/ /g, '');
			strVal = strVal.replace(/./g, '');
            return strVal;
		},
		date_reverse: function(date) {
			var dateArray = date.split('-');
			if(dateArray[1].length===1)
				dateArray[1] = '0' + dateArray[1];
			return dateArray[2]+'-'+dateArray[1]+'-'+dateArray[0];
		}
};