exports.index = function(req, res){
    res.render('index',{ err: false, user: req.session.user })
};