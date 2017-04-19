var VALIDATOR = {
		isEmail: function(val) {
			var pattern= new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
			return pattern.test(val);
		},
		isPhoneNumber: function(val) {
		    var pattern = new RegExp(/^(((\(\+\d+\))|(\+\d+))(-|\.|\s)+)?(\d|-|\.|\s){6,20}$/i);
		    return pattern.test(val);
		},
		isNumber: function (val) {
		    return /^[-+]?[0-9]+$/.test(val);
		},
		isNumberGreaterThanZero: function (val) {
		    return /^[+]?[1-9][0-9]*$/.test(val);
		},
		isNumberNoneNegative: function (val) {
		    return /^[+]?[0-9]+$/.test(val);
		}
};