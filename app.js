var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var fs = require('fs');
var request = require('request');

var everyauth = require('everyauth');

var app = express();
everyauth.everymodule.findUserById(function (userId, callback) {
  var user = {'uid': userId};
  callback(null, user);
});


everyauth.twitter
.myHostname('http://tweetogram.clitika.com')
.consumerKey('Ib3kKgoKa5uFilCE4jTmcg')
.consumerSecret('sTGNnhiv6skQUveQF5bpkCnzJKW5dYpkm1674paQI')
.callbackPath('/auth/twitter/callback')
.findOrCreateUser(function (session, accessToken, accessTokenSecret, twitterUserMetadata) {
  var user = session.user = twitterUserMetadata;
  return user;
}).redirectPath('/generate');

everyauth.instagram
.myHostname('http://tweetogram.clitika.com')
.appId('a1cb867be3ca4f21b5dcea5c94d3333e')
.appSecret('92997c30eaab4fe4b9c2f34699a22281')
.entryPath('/auth/instagram')
.callbackPath('/auth/instagram/callback')
.scope('basic')
.findOrCreateUser(function (session, accessToken, accessTokenExtra, instagramUserMetadata) {
  session.Instagram = {'user': instagramUserMetadata};
  console.log('INSTAAAAA');
  console.dir(session.Instagram);
  console.log('AAAAAAGRAM');
  return true;
})
.redirectPath('/');
app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');

  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'waqasrfeAD' }));
  //app.use(express.methodOverride());
  app.use(app.router);
  app.use(everyauth.middleware());
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/generate', routes.users);
app.post('/generate', routes.generate);

http.createServer(app).listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));
});
