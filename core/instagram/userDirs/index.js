var mkdirp = require('mkdirp');
var UserDirs = function () {
  this.deps = {
    'main': '/'
  };
  this.onStart = this.entryPoint.bind(this);
};
UserDirs.prototype.entryPoint = function (callback, data) {
  var userDir = data.main.baseDir + data.main.uid + '/raw';
  mkdirp(userDir, function (err, path) {
    callback(err, {'rawPath': path, 'userPath': data.main.baseDir + data.main.uid});
  });
};
module.exports = UserDirs;
