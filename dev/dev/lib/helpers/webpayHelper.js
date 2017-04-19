/**
 * HouseKeeping
 * tan.ngo
 * 2015/06/03
 * Random a string
 */
exports.ranNumber = function(min, max){
	min = min || 0;
	max = max || 9;
	
	return Math.floor(Math.random() * max) + min;
};

/*
 * Function name: CreateToken
 * Description: Create token when register card
 * Params:
 * 			- card_number : Money pay		//Ex: "4242-4242-4242-4242"
 * 			- expire_month: Money type		//Ex: 11
 * 			- expire_year: User token		//Ex: 2016
 * 			- cvc_code: Paymen description	//Ex: "123"
 * 			- card_name: Paymen description	//Ex: "KEI KUBO"
 */
exports.createToken = function(card_number, expire_month, expire_year, cvc_code, card_name, cb){
	global.webpay.token.create({
		  card: {
		    number: card_number,
		    exp_month: expire_month,
		    exp_year: expire_year,
		    cvc: cvc_code,
		    name: card_name
		  }
		}, function(err, res) {
			// res: Charge Response content token id
			return cb(err, res);
		});
}

/*
 * Function name: createCustomer
 * Description: Create customer to remember card info
 * Params:
 * 			- card_token : Money pay		//Ex: "tok_***********"
 */
exports.createCustomer = function(card_token, cb){
	global.webpay.customer.create({
	    card: card_token
	}, function(err, res) {
		return cb(err, res);
	});
}

/*
 * Function name: createCharge
 * Description: Create a charge when customer pays money
 * Params:
 * 			
 */
exports.createCharge = function(amount, currency, expire_time, customer_token, capture, cb){
	global.webpay.charge.create({
	  amount: amount,
	  currency: currency,
	  expire_time: expire_time,
	  customer: customer_token,
	  capture: capture
	}, function(err, res) {
		// res: Charge Response content token id
		return cb(err, res);
	});
}

/*
 * Function name: captureCharge
 * Description: capture a waiting payment
 * Params:
 * 			- card_token : Money pay		//Ex: "tok_***********"
 */
exports.captureCharge = function(charge_id, cb){
	global.webpay.charge.capture({id: charge_id}, function(err, res) {
		return cb(err, res);
	});
}

/*
 * Function name: captureCharge
 * Description: capture a waiting payment
 * Params:
 * 			- card_token : Money pay		//Ex: "tok_***********"
 */
exports.getCustomerById = function(id, cb){
	global.webpay.customer.retrieve(id, function(err, res) {
		return cb(err, res);
	});
}
