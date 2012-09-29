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
  instaFlow.setRootArgs({'uid': 'abc', 'baseDir': __dirname + '/userImages/', 'gm': new GM()});
  instaFlow.run(function (err, results) {
    console.dir(arguments);
    process.exit(1);
  });

});
