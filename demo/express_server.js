var express = require('express');
var app = express();
var path = require('path');

app.use('/static', express.static('public'));
app.use('/static1', express.static(path.join(__dirname, 'public1')));

var mylogger = function(req, res, next){
	console.log('Use callback !!!');
	next();
}

app.use(mylogger);

var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

var cb2 = function (req, res) {
  res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2]);


app.all('/secret', function(req, res, next){
	console.log('Accessing the secret section');
	next();
	},
	function(req, res){
		res.send('Next callbacks');
	}
);



app.get('/', function(req, res){
	res.send('hello my app');
	
});

app.post('/process_get', function(req, res){
	res.send('This is method my post');
})

app.get('/index', function(req, res){
	res.sendFile( __dirname + "/html/" + "index.html" );
	
});






var server = app.listen(9090, function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log("App listening at http://%s:%s", host, port);
});

