var Broom = require('broom').broom;
var GM = require('./lib/gm_custom.js');
var instaFlow = new Broom({
  'fileName': 'index.js',
  'dependenciesName': 'deps',
  'entryName': 'onStart'
});
instaFlow.setRootPath(__dirname);
instaFlow.scan('./core/instagram', function (err, done) {
  if (!done) {
    console.dir(err);
    process.exit(1);
  }
  instaFlow.testTree();
});
var utils = {};
utils.tags = new Broom({
  'fileName': 'index.js',
  'dependenciesName': 'deps',
  'entryName': 'onStart'
});
utils.tags.scan('./core/utils/tags', function (err, done) {
});
utils.timeline = new Broom({
  'fileName': 'index.js',
  'dependenciesName': 'deps',
  'entryName': 'onStart'
});
utils.timeline.scan('./core/utils/timeline', function (err, done) {});



module.exports.createWallpaper = function (uid, tag, req, callback) {
  instaFlow.setRootArgs({'uid': uid, 'tag': tag, 'req': req, 'baseDir': __dirname + '/public/images/userImages/', 'gm': new GM()});
  instaFlow.run(function (err, results) {
    if (err) {
      return callback(err);
    }
    callback(null, uid);
  });
};
