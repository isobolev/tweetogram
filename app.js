var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var fs = require('fs');
var everyauth = require('everyauth');

var app = express();

everyauth.twitter
    .consumerKey('Ib3kKgoKa5uFilCE4jTmcg')
    .consumerSecret('sTGNnhiv6skQUveQF5bpkCnzJKW5dYpkm1674paQI')
    .callbackPath('/auth/twitter/callback')
    .findOrCreateUser( function (session, accessToken, accessTokenSecret, twitterUserMetadata) {
        console.dir(arguments);
    })
    .redirectPath('/users');

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');

    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'waqasrfeAD' }));
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(everyauth.middleware());
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', routes.users);
app.post('/generate', routes.generate);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});