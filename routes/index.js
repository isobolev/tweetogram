var fs = require('fs');
var everyauth = require('everyauth');
var request = require('request');
var core = require('../core.js');
exports.index = function (req, res) {
  if (req.session && req.session.auth && req.session.auth.twitter) {
    console.dir(req.session.auth.twitter);
  }
  res.render('index.ejs', {'session': req.session});
};

exports.users = function (req, res) {
  if (!req.session || !req.session.auth || !req.session.auth.twitter) {
    return res.redirect('/');
  }
  res.render('user.ejs', {'wallpaper': null, 'session': req.session});
};

exports.generate = function (req, res) {
  if (!req.session.auth.twitter) {
    return res.redirect('/');
  }
  var tag = req.param('tag', 'nature');
  var uid = req.session.auth.twitter.user.screen_name;
  core.createWallpaper(uid, tag, function (err, path) {
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
      form.append('image', fs.createReadStream('./public/images/userImages/' + uid + '/wallpaper.jpg'));
    }
    return res.render('user.ejs', {'wallpaper': uid, 'session': req.session});
  });
};

