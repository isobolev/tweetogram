var fs = require('fs');
var gm = require('gm');
var GM = require('../../lib/gm_custom.js');
var img = new GM();
var async = require('async');
var baseDir = __dirname + '/images/';
var outFile = baseDir + 'result.jpg';
var baseExt = '.jpg';
var files = [];


for (var i = 1; i < 21; i++) {
  img.add(baseDir + i + baseExt);
}

img.resultFile(baseDir + 'result.jpg');
img.execute(function () {
  console.dir(arguments);
});
