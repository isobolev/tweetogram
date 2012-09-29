var everyauth = require('everyauth');

exports.index = function(req, res){
    res.render('index.ejs');
};

exports.signout = function(req, res){
    res.redirect("/");
};

exports.login = function(req, res){
    everyauth.twitter
        .consumerKey('Ib3kKgoKa5uFilCE4jTmcg')
        .consumerSecret('sTGNnhiv6skQUveQF5bpkCnzJKW5dYpkm1674paQI')
        .findOrCreateUser( function (session, accessToken, accessTokenSecret, twitterUserMetadata) {
            console.log(twitterUserMetadata);
        })
        .redirectPath('/users');
};

exports.users = function(req, res){
    res.render('user.ejs', { layout:false });
};

exports.generate = function(req, res){
    res.render('user.ejs', { layout:false });
};
