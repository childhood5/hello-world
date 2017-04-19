/**
 * vo.quoc.viet
 * 2015-05-13
 */
exports.encrypt = function(str){
    var sha1 = require('sha1');
	return sha1(str);
}
exports.getPasswordFromSha1 = function(hash_pass){
    var sha1 = require('sha1');
    var key = 'IBSVJ';
	return sha1(hash_pass + key);
}
exports.getPasswordFromString = function(password){
    var sha1 = require('sha1');
    var key = 'IBSVJ';
	return sha1(sha1(password) + key);
}

/**
 * ngo.thanh.tan
 * 2015-07-02
 */
exports.aesEncrypt = function(message, key) {
	var CryptoJS = require('crypto-js');
	// test data
	//var key = 'Hdiekgbzd4kForef';
	//var message = 'C586124';
	// ./test data

	var realKey = CryptoJS.enc.Utf8.parse(key);
	var encryptedData = CryptoJS.AES.encrypt( message, realKey, {
	    mode: CryptoJS.mode.ECB,
	    padding: CryptoJS.pad.Pkcs7
	} );
	console.log( "encryptDate = " + encryptedData );
	return encryptedData;
}

exports.aesDecrypt = function(message, key) {
	var CryptoJS = require('crypto-js');
	// test data
	//var key = 'Hdiekgbzd4kForef';
	//var message = 'K1fsBiLLlWaDv5dGXIRlyw==';
	// ./test data

	var realKey = CryptoJS.enc.Utf8.parse(key);
	var decryptedData = CryptoJS.AES.decrypt( message, realKey, {
	    mode: CryptoJS.mode.ECB,
	    padding: CryptoJS.pad.Pkcs7
	} );
	var decryptedText = decryptedData.toString( CryptoJS.enc.Utf8 );
	console.log( "decryptedText = " + decryptedText ); 
	return decryptedText;
}