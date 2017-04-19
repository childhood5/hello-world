/**
 * HouseKeeping
 * vo.quoc.viet
 * 2015/05/04
 */
var express = require('express');
var fs = require('fs');
var path = require('path');
var i18n = require("i18n-2");
var multer = require('multer');
var app = express();

i18n.expressBind(app, {
    locales: ['jp'],
    cookieName: 'hklocale',
    directory: path.join(__dirname , '/i18n'),
    extension: '.json',
    defaultLocale: 'jp'
    
});
console.log(__dirname + '/i18n');

global.base_frontend = __dirname;

/*
app.use(function(req, res, next) {
    req.i18n.setLocaleFromCookie();
    next();
});
*/
//i18n.setLocale('jp');

//server.use(express.multipart({ uploadDir: path.join(__dirname, '/public/upload') }));
app.set('views', path.join(__dirname , '/views'));
app.set('view engine', 'jade');

app.use(multer({ dest: path.join(__dirname , '/public/upload/')}));
app.use('/content', express.static(path.join(__dirname , '/public')));
app.use('/terms', express.static(path.join(__dirname , '/views')));



//load all controller 
console.log('----------Begin load controller');
fs.readdirSync(path.join(__dirname, 'controllers')).forEach(function (file) {
  if(file.substr(-3) == '.js') {
	  router = require(path.join(__dirname,'controllers', file));
      console.log(file);
      router.controller(app);
  }
});
console.log('------------END load controller');
module.exports = app;