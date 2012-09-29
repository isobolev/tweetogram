var fs = require('fs');
var url = require('url');
var request = require('request');
var Grab = function () {
  this.deps = {
    'main': '/',
    'urls': '/getUrls',
    'dir': '/userDirs'
  };
  this.onStart = this.entryPoint.bind(this);
};
Grab.prototype.entryPoint = function (callback, data) {
  var urls = data.urls.map(function (picUrl) {
    var basename = url.parse(picUrl).pathname.replace('/', '');
    return {
      'basename': basename,
      'httpUrl': picUrl,
      'file': data.dir.userPath + '/raw/' + basename
    };
  });
  var len = urls.length;
  urls.forEach(function (url) {
    var dStream = fs.createWriteStream(url.file);
    dStream.on('close', function close() {
      if (!(--len)) {
        callback(null, urls);
      }
    });
    request(url.httpUrl).pipe(dStream);
  });
};
module.exports = Grab;
