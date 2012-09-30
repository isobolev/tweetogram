var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var fs = require('fs');
var request = require('request');
var FormData = require('form-data');

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
  console.dir(arguments);
  var user = session.user = twitterUserMetadata;
  return user;
}).redirectPath('/users');

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
app.get('/users', routes.users);
app.post('/generate', routes.generate);
var Twit = require('twit');
app.get('/test', function (req, res) {
  var oauth = {
    'consumer_key': 'Ib3kKgoKa5uFilCE4jTmcg',
    'consumer_secret': 'sTGNnhiv6skQUveQF5bpkCnzJKW5dYpkm1674paQI',
    'token': req.session.auth.twitter.accessToken,
    'token_secret': req.session.auth.twitter.accessTokenSecret,
    'verifier': req.session.auth.twitter.verifier
  };
  var r = request.post({'url': 'https://api.twitter.com/1.1/account/update_profile_background_image.json', 'oauth': oauth});
  var form = r.form();
  form.append('skip_status', 'true');
  form.append('tile', 'true');
  form.append('image', fs.createReadStream('./public/images/userImages/bcd/wallpaper.jpg'));
  r.on('end', function () {
    console.dir(this);
    console.dir(arguments);
  });
});
http.createServer(app).listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));
});
