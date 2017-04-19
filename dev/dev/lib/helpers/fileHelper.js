/**
 * phu.le
 * 2016-06-19
 */
 var fs = global.fs;
 var Converter = require("csvtojson").core.Converter;
 var path = global.path;
 var json2csv = require('json2csv');

 exports.readTextFile = function(file_name){

    fs.readFile(file_name, "utf8", function(error, data) {
  		return data;
	});
 };

 exports.writeTextFile = function(file_name, data){

 };

 exports.readCSVFile = function(file_name, cb){
	var fileStream = fs.createReadStream(global.base_root + global.config.rasta.worker_import_path + file_name);
	var converter = new Converter({constructResult:true});
	//end_parsed trigger
	converter.on("end_parsed", function (jsonObj) {
		return cb(jsonObj);
	});
	// start reading file
	fileStream.pipe(converter);
 };

  exports.writeCSVFile = function(file_name, keys, objects){
 	var filePath = global.base_root + global.config.rasta.worker_export_path + file_name;

 	// test data
 // 	var fields = ['car', 'price', 'color'];
	// var myCars = [
	//   {
	//     "car": "Audi",
	//     "price": 40000,
	//     "color": "blue"
	//   }, {
	//     "car": "BMW",
	//     "price": 35000,
	//     "color": "black"
	//   }, {
	//     "car": "Porsche",
	//     "price": 60000,
	//     "color": "green"
	//   }
	// ];
	// ./test data

	json2csv({ data: objects, fields: keys }, function(err, csv) {
	  if (err) {
	  	console.log(err);
	  }
	  fs.writeFile(filePath, csv, function(err) {
	    if (err) {
	    	throw err;
	    }
	    console.log('file saved');
	  });
	});
 };