var Instagram = require('instagram-node-lib');
Instagram.set('client_id', 'a1cb867be3ca4f21b5dcea5c94d3333e');
Instagram.set('client_secret', '92997c30eaab4fe4b9c2f34699a22281');
var _ = require('lodash');
var GetUrls = function () {
  this.deps = {
    'main': '/'
  };
  this.onStart = this.entryPoint.bind(this);
};
GetUrls.prototype.entryPoint = function (callback, data) {
  Instagram.tags.recent({
    'name': data.main.tag,
    'complete': function (popular) {
      console.dir(popular);
      callback(null, popular.map(function (img) {
        return img.images.standard_resolution.url;
      }));
    },
    'error': function (error) {
      return callback(error);
    }
  });
};
module.exports = GetUrls;
