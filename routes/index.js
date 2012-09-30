var fs = require('fs');
var everyauth = require('everyauth');
var request = require('request');
var core = require('../core.js');
exports.index = function (req, res) {
  if (req.loggedIn) {
    console.log(req.session.auth.twitter);
  }
  res.render('index.ejs');
};

exports.users = function (req, res) {
  res.render('user.ejs', {'wallpaper': null});
};

exports.generate = function (req, res) {
  if (!req.loggedIn) {
    return res.redirect('/');
  }
  var tag = req.param('tag', 'nature');
  console.dir(req.param('set_as_wallpaper', ''));
  core.createWallpaper(req.sessionID, tag, function (err, path) {
    if (req.param('set_as_wallpaper', false) === 'on') {
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
      form.append('image', fs.createReadStream('./public/images/userImages/' + req.sessionID + '/wallpaper.jpg'));
    }
    return res.render('user.ejs', {'wallpaper': path, layout: false });
  });
};

