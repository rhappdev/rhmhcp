'use strict';

const fs = require('fs');
const cfg = require('../../cfg');
const log = require('../../log');
const path = require('path');
const Promise = require('bluebird');
const spawnPromise = require('spawn-rx').spawnPromise;

/**
 * Executes a Cordova command, e.g "platform add ios"
 * @param   {Array<String>} args
 * @return  {Promise<String>}
 */
const exec = exports.exec = function exec (args) {
  log.debug('executing cordova command');
  // Promise.resolve will create a Bluebird promise chain
  return Promise.resolve()
    .then(() => spawnPromise(resolveCordovaLocation(), args));
};


/**
 * We might need to resolve strings such as "local" or "global" to an actual path
 * @return {String}
 */
function resolveCordovaLocation () {
  const loc = cfg.getCordovaLocation();

  log.debug('resolving cordova binary location for command - %j', loc);

  if (loc === 'global') {
    log.debug('using global cordova');
    return 'cordova';
  } else if (loc === 'local') {
    log.debug('using local cordova');
    return path.join(process.cwd(), 'node_modules', '.bin', 'cordova');
  } else {
    log.debug('using custom cordova at %s', loc);
    return loc;
  }
}


/**
 * Installs the hot code push plugin into this Cordova project.
 * Defaults to the master branch version
 * @param   {String} [version]
 * @return  {Promise<String>}
 */
exports.installHcpPlugin = function (/* version */) { // TODO versioning
  log.progress('installing hot code push cordova plugin');
  return exec([
    'plugin',
    'add',
    'cordova-hot-code-push-plugin',
    '--save'
  ]);
};


/**
 * Determine if we're in a Cordova project or not
 */
exports.verifyProjectIsCordova = function () {
  log.progress('verifying project is a valid Cordova project');
  const configPath = path.join(process.cwd(), 'config.xml');
  const hasConfig = fs.existsSync(configPath);

  if (!hasConfig) {
    throw new Error('Unable to locate config.xml in current directory. Is this a Cordova project?');
  };
};
