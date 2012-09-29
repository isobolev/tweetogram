var Montage = function () {
  this.deps = {
    'main': '/',
    'resize': '/resize',
    'images': '/grabImages'
  };
  this.onStart = this.entryPoint.bind(this);
  this.resultFilename = 'wallpaper.jpg';
};
Montage.prototype.entryPoint = function (callback, data) {
  data.main.gm.resultFile(data.main.baseDir + this.resultFilename);
  data.images.forEach(function (img) {
    data.main.gm.bottom(img.file);
  });
  data.main.gm.execute(callback);
};
module.exports = Montage;
