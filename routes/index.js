var everyauth = require('everyauth');

exports.index = function(req, res){
    if(req.loggedIn){
        console.log(req.session.auth.twitter);
    }
    res.render('index.ejs');
};

exports.users = function(req, res){
    res.render('user.ejs', { layout:false  });
};

exports.generate = function(req, res){
    res.render('user.ejs', { layout:false });
};
