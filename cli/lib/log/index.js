'use strict';

const blue = require('chalk').blue;

/**
 * Used to add verbose debug logs
 */
exports.debug = require('debug')(require('../../package.json').name);

/**
 * Used for general logging we'd like to be visible to users
 */
exports.log = require('winston');


exports.progress = function (str) {
  console.log(`${blue('[RHMHCP]')} - ${str}`);
};
