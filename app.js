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

app.get('/', routes.index);
app.get('/login', routes.login);
app.get('/users', routes.users);
app.get('/signout', routes.signout);
app.post('/generate', routes.generate);

everyauth.twitter
    .consumerKey('Ib3kKgoKa5uFilCE4jTmcg')
    .consumerSecret('sTGNnhiv6skQUveQF5bpkCnzJKW5dYpkm1674paQI')
    .findOrCreateUser( function (session, accessToken, accessTokenSecret, twitterUserMetadata) {
        console.log(twitterUserMetadata);
    })
    .redirectPath('/users');

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});