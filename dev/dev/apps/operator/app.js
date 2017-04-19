/**
 * HouseKeeping
 * vo.quoc.viet
 * 2015/05/04
 */
var express = require('express');
var fs = require('fs');
var path = require('path');
var i18n = require("i18n-2");
var app = express();
var breadcrumbs = require('express-breadcrumbs');

app.use(breadcrumbs.init());
app.use(breadcrumbs.setHome({
  name: 'User Dashboard',
  url: '/operator/userlist'
}));

i18n.expressBind(app, {
    locales: ['jp'],
    cookieName: 'hklocale',
    directory: path.join(__dirname , '/i18n'),
    defaultLocale: 'jp',
    extension: '.json'
});
console.log(__dirname + '/i18n');
/*
app.use(function(req, res, next) {
    req.i18n.setLocaleFromCookie();
    next();
});
*/
//i18n.setLocale('jp');

app.set('views', path.join(__dirname , '/views'));
app.set('view engine', 'jade');

app.use('/content', express.static(path.join(__dirname , '/public')));



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