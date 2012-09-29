exports.index = function(req, res){
    res.render('index.ejs');
};

exports.signout = function(req, res){
    res.redirect("/");
};

exports.login = function(req, res){
    res.render('user.ejs', { layout:false });
};