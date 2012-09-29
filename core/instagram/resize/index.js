var Resize = function () {
  this.deps = {
    'main': '/',
    'images': '/grabImages'
  };
  this.onStart = this.entryPoint.bind(this);
};
Resize.prototype.entryPoint = function (callback, data) {
  callback(null, false);
};
module.exports = Resize;
