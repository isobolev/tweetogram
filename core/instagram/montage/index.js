var Montage = function () {
  this.deps = {
    'main': '/',
    'resize': '/resize',
    'images': '/grabImages'
  };
  this.onStart = this.entryPoint.bind(this);
  this.resultFilename = '/wallpaper.jpg';
};
Montage.prototype.entryPoint = function (callback, data) {
  var wallpaper = data.main.baseDir + data.main.uid + this.resultFilename;
  data.main.gm.resultFile(wallpaper);
  data.images.forEach(function (img) {
    data.main.gm.bottom(img.file);
  });
  data.main.gm.execute(function (err) {
    if (err) {
      return callback(err);
    }
    callback(null, wallpaper);
  });
};
module.exports = Montage;
