# urlproxy

[![NPM version](https://img.shields.io/npm/v/urlproxy.svg?style=flat)](https://npmjs.org/package/urlproxy)
[![Build Status](https://img.shields.io/travis/popomore/urlproxy.svg?style=flat)](https://travis-ci.org/popomore/urlproxy)
[![Build Status](https://img.shields.io/coveralls/popomore/urlproxy?style=flat)](https://coveralls.io/r/popomore/urlproxy)
[![NPM downloads](http://img.shields.io/npm/dm/urlproxy.svg?style=flat)](https://npmjs.org/package/urlproxy)

set a proxy for url using stream

---

## Install

```
$ npm install urlproxy -g
```

## Usage

```
var proxy = require('urlproxy');
proxy('a.js').pipe(res);
```

It will find the file in local directory. if not found, it will find from the proxy server, and cache to local if cache option is true.

## Option

- directory: local directory, default `process.cwd()`,
- proxy: set remote server
- cache: cache remote file
- followRedirect: follow redirect when 302

## LISENCE

Copyright (c) 2014 popomore. Licensed under the MIT license.
