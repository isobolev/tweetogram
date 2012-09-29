var Instagram = require('instagram-node-lib');
var fs = require('fs');
var gm = require('gm');
var saveDir = __dirname + '/images/';
var request = require('request');

Instagram.set('client_id', 'a1cb867be3ca4f21b5dcea5c94d3333e');
Instagram.set('client_secret', '92997c30eaab4fe4b9c2f34699a22281');
var eyes =  require('eyes');
var popular = Instagram.media.popular({
  'complete': function (popular) {
    console.log('complete request');
    var cnt = 0;
    popular.forEach(function (popImage) {
      console.dir(popImage);
      request(popImage.images.standard_resolution.url).pipe(fs.createWriteStream(saveDir + (++cnt) + '.jpg'));
      console.log('img: ' + popImage.images.thumbnail.url);
    });
  },
  'error': function (err) {
    console.error('error happen');
    console.dir(eyes.inspect(err));
  }
});
