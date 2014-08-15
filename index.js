'use strict';

var fs = require('fs');
var path = require('path');
var url = require('url');
var extend = require('extend');
var pipe = require('multipipe');
var request = require('request');
var gif = require('gulp-if');
var fscache = require('fscache-stream');
var debug = require('debug')('urlproxy');

var defaults = {
  // local directory
  directory: process.cwd(),

  // remote server
  proxy: '',

  // cache remote file
  cache: false,

  followRedirect: false
};

module.exports = function(urlPath, opt) {
  opt = extend({}, defaults, opt);

  var srcStream;
  var localPath = path.join(opt.directory, urlPath);
  var remotePath = url.resolve(opt.proxy, urlPath);

  if (fs.existsSync(localPath) && fs.statSync(localPath).isFile()) {
    debug('create local stream %s', localPath);
    srcStream = fs.createReadStream(localPath);
  } else if (opt.proxy) {
    var ropt = {
      gzip: true,
      followRedirect: opt.followRedirect
    };
    debug('create remote stream %s, cache %s', remotePath, opt.cache);
    srcStream = pipe(
      wrapRequest(remotePath, ropt),
      gif(opt.cache === true, fscache(localPath))
    );
  } else {
    throw new Error('not found ' + localPath + ' and no proxy');
  }

  return srcStream;
};

function wrapRequest(url, opt) {
  return request(url, opt)
  .on('response', function(res) {
    var err;
    if (res.statusCode >= 500) {
      err = new Error('server error');
      err.statusCode = res.statusCode;
      return this.emit('error', err);
    }
    if (res.statusCode >= 300) {
      err = new Error('not found ' + url);
      err.statusCode = res.statusCode;
      return this.emit('error', err);
    }
  });
}
