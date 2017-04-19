/**
 * HouseKeeping
 * vo.quoc.viet
 * 2015/05/13
 * Random a string
 */
exports.ranString = function(length, chars, has_number, has_special_character){
	var chars_default = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';
	length = length || 6;
	
	has_number = has_number || true;
	has_special_character = has_special_character || true;
	
	if(has_number){
		chars_default += '0987654321';
	}
	if(has_special_character){
		chars_default += '~`!#$%^&*()_-+={[}]:;<,>.?';
	}
	chars = chars || chars_default; 
	
	var rt_string = '';
	for (var i = 0; i < length; i++) {
		rt_string += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return rt_string;
};