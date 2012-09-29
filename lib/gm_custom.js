var exec = require('child_process').exec;
var GmAppend = function () {
  this.command = 'gm montage ';
  this.files = [];
  this.outFile = '';
  this.last = 0;
};
GmAppend.prototype.bottom = function (file) {
  this.files.push('"' + file + '" ');
};
GmAppend.prototype.right = function (file) {
  this.files.push('"' + file + '" ');
  return this;
};
GmAppend.prototype.add = function (file) {
  var where = (this.last++) % 2 === 0 ? 'bottom' : 'right';
  this[where](file);
  return this;
};

GmAppend.prototype.resultFile = function (file) {
  this.outFile = file;
};
GmAppend.prototype._makeCommand = function () {
  this.files.push(' ' + this.outFile);
  return this.command + this.files.join('');
};
GmAppend.prototype.execute = function (cb) {
  var proc = exec(this._makeCommand(), cb);
};
module.exports = GmAppend;
