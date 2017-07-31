'use strict';

const assert = require('assert');
const Promise = require('bluebird');
const env = require('../env');
const writeFileSync = require('fs').writeFileSync;
const log = require('../log').log;
const debug = require('../log').debug
const _ = require('lodash');
const join = require('path').join;

var curCfg = null;
const cfgFile = env.get('RHM_HCP_CFG');


/**
 * Returns the path at which the config can be found/stored
 * @param {String} [path]
 */
function getPath (path) {
  if (!path) {
    path = process.cwd();
  }

  debug('generate config path from %s and %s', path, cfgFile);

  return join(path, cfgFile);
}

/**
 * Load an existing config, or create one if not found.
 * @param {String} [path]
 * @return {Promise<Object>}
 */
exports.load = function (path) {
  if (curCfg) {
    log.warn("Loading config file multiple times. It is not supposed to.");
  }

  const configLocation = getPath(path);

  log.info("Load config file from: %s", p);

  try {
    set(require(configLocation));
  } catch (e) {
    log.warn('Config file not found. Will initialise new config at %s', p);
    set({});
  }

  // Store the config path in the config - TODO is this required?
  curCfg.path = configLocation;

  return Promise.resolve(curCfg);
}

/**
 * Set a given key to a given value in the config.
 * The key can be a nested string e.g 'paths.cordova'
 * @param {String} key
 * @param {String} val
 */
exports.setKey = function (key, val) {
  debug('setting key %s to %j', key, val);
  _.set(curCfg, key, val);
};

/**
 * Retrieve a key from the config. Can be nested e.g 'paths.cordova'
 * @param {String} key
 * @param {String} defaultValue
 */
function getKey(key, defaultValue) {
  assert(curCfg, 'Config file not loaded. Please ensure you called config.load()');

  return _.get(curCfg, key, defaultValue);
}

/**
 * Replace the in memory config with the one passed
 * @param {Object} data
 */
const set = exports.set = function (data) {
  assert(_.isObject(data), 'Config must be an Object');
  debug('replacing config object with %j', data);
  curCfg = data;
}

/**
 * Return the loaded config
 * @return {Object}
 */
const get = exports.get = function () {
  return curCfg;
}

/**
 * Save the config at the specified path. Defaults to current working directory.
 * @param {String} [path]
 */
const save = exports.save = function (path) {
  assert(curCfg, 'Config file not loaded. Please ensure you called config.load()');

  const resolvedPath = getPath(path);

  debug('saving the current config to disk at path %s with content %j', resolvedPath, curCfg)

  return new Promise((resolve) => {
    writeFileSync(resolvedPath, JSON.stringify(curCfg, null, 2))
    resolve();
  });
}

/**
 * Returns the location of the Cordova executable for the given project
 * @return {String}
 */
exports.getCordovaLocation = function () {
  return getKey('cordova.location', 'cordova');
};

/**
 * Creates a new config for a project, saves it to disk, then returns it.
 * @param   {Object} args
 * @return  {Promise<Object>}
 */
exports.generateConfig = function (args) {
  debug('generating a new config file from args %j', args);

  const settings = Object.assign({}, args, {
    'create-date': new Date().toISOString(),
    'rhmhcp-version': require('../../package.json').version
  });

  set(settings);

  return save().thenReturn(settings);
};
