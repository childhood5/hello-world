/**
 * phu.le
 * 2015-07-02
 */

exports.formatDay = function(date, weekday, name, flag){
	var day = (date.getDate() < 10 ? '0' : '') + date.getDate();
	var month = ((date.getMonth()+1) < 10 ? '0' : '') + (date.getMonth()+1);
	var year =  date.getFullYear();
	if(flag){
		return (year + '/' + month + '/' + day + " (" + weekday + ") " + (name==''?'':name));
	}
	return ("" + year+month+day);
}

exports.weekdays = function(date){	
	var weekday = new Array(7);
	weekday[0] = "日";
	weekday[1] = "月";
	weekday[2] = "火";
	weekday[3] = "水";
	weekday[4] = "木";
	weekday[5] = "金";
	weekday[6] = "土";

	return weekday[date.getDay()];	
}

exports.listDaysRequest = function(startDay, endDay){
	var listHolidaysRequest = [];
	var currentDate = new Date();						
	var startHolidays = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+startDay);
    var endHolidays = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+endDay);	
	listHolidaysRequest.push(exports.formatDay(startHolidays, "", "", false));
	listHolidaysRequest.push(exports.formatDay(endHolidays, "", "", false));
	return listHolidaysRequest;	
}

exports.sortDays = function(listDayHolidays){	
	for(var k=0; k<listDayHolidays.length; k++){
		for(var l=0; l<listDayHolidays.length-1; l++){
			if(listDayHolidays[l].dayHolidays > listDayHolidays[l+1].dayHolidays){
				var tempDayHolidays = listDayHolidays[l].dayHolidays;
				var tempName = listDayHolidays[l].name;
				var tempWeekday = listDayHolidays[l].weekday;
				var tempDateToday = listDayHolidays[l].dateToday;
				
				listDayHolidays[l].dayHolidays = listDayHolidays[l+1].dayHolidays;
				listDayHolidays[l].name = listDayHolidays[l+1].name;
				listDayHolidays[l].weekday = listDayHolidays[l+1].weekday;
				listDayHolidays[l].dateToday = listDayHolidays[l+1].dateToday;
				
				listDayHolidays[l+1].dayHolidays = tempDayHolidays;
				listDayHolidays[l+1].name = tempName;
				listDayHolidays[l+1].weekday = tempWeekday;
				listDayHolidays[l+1].dateToday = tempDateToday;
			}else if(listDayHolidays[l].dayHolidays == listDayHolidays[l+1].dayHolidays){
				listDayHolidays.splice(k+1, 1);
			}
		}
	}
	return listDayHolidays;
}

// Ex: 	2015/07/18 (Sat) -> 2015年7月18日（土）
exports.toJapaneseDate = function(date) {
	var dateElems = date.split('/');
	var day = date.split(' ')[1];
	var jpdate = dateElems[2] + "年" + dateElems[1] + "月" + dateElems[0] + "日 " + day;
	return jpdate;
}

//d=18,m=01,y=2015 -> 2015年7月18日（土）
exports.toJapaneseDate2 = function(date, month, year) {
	var days = ['日','月','火','水','木','金','土'];
	var aDate = new Date(month+'-'+date+'-'+year);
	var day = days[aDate.getDay()];
	var jpdate = year + "年" + month + "月" + date + "日 " + ' (' + day + ') ';
	return jpdate;
}

//Date reverse: ex: 1234/12/11 -> 11/12/1234
exports.date_reverse = function(date) {
	var dateArray = date.split('-');
	if(dateArray[1].length===1)
		dateArray[1] = '0' + dateArray[1];
	return dateArray[2]+'-'+dateArray[1]+'-'+dateArray[0];
}