/**
 * HouseKeeping
 * phu.le
 * 2015/06/03
 * Random a string
 */
exports.sendMail = function(min, max){
	min = min || 0;
	max = max || 9;
	
	return Math.floor(Math.random() * max) + min;
};


