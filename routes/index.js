exports.index = function(req, res){
    res.render('index.ejs');
};

exports.signout = function(req, res){
    res.redirect("/");
};

exports.users = function(req, res){
    res.render('user.ejs', { layout:false });
};

exports.generate = function(req, res){
    res.render('user.ejs', { layout:false });
};
