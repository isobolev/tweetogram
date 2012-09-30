var gm = require('gm');
var Resize = function () {
  this.deps = {
    'main': '/',
    'images': '/grabImages'
  };
  this.onStart = this.entryPoint.bind(this);
};
Resize.prototype.entryPoint = function (callback, data) {
  var urls = data.images;
  var len = urls.length;
  urls.forEach(function (img) {
    var degrees = parseInt(Math.random() * 20, 10);
    degrees = (degrees % 2 === 0) ? -degrees : degrees;
    gm(img.file)
    .noProfile()
    .resize("200", "200")
    .rotate('#2076BD', degrees)
    .background('#2076BD')
    .write(img.file, function () {
      if (!(--len)) {
        callback(null, true);
      }
    });
  });
};
module.exports = Resize;
