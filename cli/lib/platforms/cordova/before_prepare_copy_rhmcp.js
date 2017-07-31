#!/usr/bin/env node

'use strict';

module.exports = function (ctx) {
  const fs = require('fs');
  const path = require('path');
  const process = require('process');
  const Q = ctx.requireCordovaModule('q');
  const defer = Q.defer();

  const BASE_PATH = path.join(process.cwd(), 'rhmhcp.json');
  const DEST_PATH = path.join(process.cwd(), 'www', 'rhmhcp.json');

  // Copy the latset rhmcp into www/ before preparing bundle
  fs.createReadStream(BASE_PATH)
    .pipe(fs.createWriteStream(DEST_PATH))
    .on('error', defer.reject)
    .on('end', defer.resolve);

  return defer.promise;
};
