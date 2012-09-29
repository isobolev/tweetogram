var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var fs = require('fs');
var everyauth = require('everyauth');

var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');

    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'waqdsrfeAD' }));
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(everyauth.middleware());
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

/*
everyauth.twitter
    .consumerKey('YOUR CONSUMER ID HERE')
    .consumerSecret('YOUR CONSUMER SECRET HERE')
    .findOrCreateUser( function (session, accessToken, accessTokenSecret, twitterUserMetadata) {
        // find or create user logic goes here
    })
    .redirectPath('/');
    */

app.get('/', routes.index);
app.get('/login', routes.login);
app.get('/signout', routes.signout);
app.post('/generate', routes.generate);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});