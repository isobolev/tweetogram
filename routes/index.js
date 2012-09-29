var everyauth = require('everyauth');
var core = require('../core.js');
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
  var tag = req.param('tag', 'nature');
  core.createWallpaper('bcd', tag, function (err, path) {
    console.dir(arguments);
    res.render('user.ejs', {'wallpaper': path, layout:false });
  });
};
