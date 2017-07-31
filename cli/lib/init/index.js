'use strict';

const cfg = require('../cfg');
const path = require('path');
const log = require('../log');
const assert = require('assert');
const Promise = require('bluebird');
const inquirer = require('inquirer');
const isValidUrl = require('valid-url').isWebUri;
const readdirSync = require('fs').readdirSync;
const existsSync = require('fs').existsSync;
const _ = require('lodash');

const PROJECT_TYPES = [
  {
    id: 'ios',
    displayName: 'iOS',
    fragment: '.xcodeproj'
  },
  {
    id: 'android',
    displayName: 'Android',
    fragment: '.gradle'
  },
  {
    id: 'cordova',
    displayName: 'Cordova',
    fragment: 'config.xml'
  }
];

/**
 * These args come from the commader instance. Should be as follows:
 * @param {Object} args
 * {
 *    type: String
 *    cordova: String
 *    serverUrl: String
 * }
 */
module.exports = function init (args) {
  log.debug('starting project init with args', args);

  let setup = null;

  function _init () {
    log.progress('initialise project with Red Hat Mobile Hot Code Push')
    return Promise.resolve()
      .then(() => verifyArgs(args))
      .then(() => getProjectType())
      .then((type) => {
        log.progress(`project was determined to be of type ${type.displayName}`)

        setup = require(path.join(__dirname, '../platforms', type.id));

        return Promise.resolve()
          .then(() => setup.askQuestions(type))
          .then((answers) => Object.assign(answers, args, {type: type.id}))
      })
      .then((conf) => cfg.generateConfig(conf))
      .then(() => log.progress('generated rhmhcp.json configuration in project root'))
      .then(() => setup.initialise())
      .then(() => log.progress('project initialisation complete!'));
  }

  if (isRhmcpReady()) {
    return verifyOverride().then(_init);
  } else {
    return _init();
  }
};


/**
 * Check if the project is already configured for hot code push
 * @return {Boolean}
 */
function isRhmcpReady () {
  log.debug('checking for existing config');
  return existsSync(path.join(process.cwd(), 'rhmhcp.json'));
}

/**
 * Prompt the user to confirm that they want to override an existing configuration
 * @return {Promise}
 */
function verifyOverride () {
  return inquirer.prompt([{
    type: 'confirm',
    name: 'overwrite',
    message: 'This project is already configured for hot code push. Overwrite existing settings?'
  }])
    .then((ans) => {
      if (!ans.overwrite) {
        log.progress('exiting due to project already being hot code push compatible');
        process.exit(0)
      }
    })
}


/**
 * Verifies that our arguments are well-formed and valid
 * @param {Object} args
 */
function verifyArgs (args) {
  log.debug('verifying args');

  assert(
    isValidUrl(args.serverUrl),
    'Passed server must be a valid HTTP/HTTPS server URL'
  );
};


/**
 * Returns the type of project we're working with
 * @return {Object}
 */
function getProjectType () {
  log.debug('getting project type');
  const files = readdirSync(process.cwd());

  const type = _.find(PROJECT_TYPES, (type) => {
    log.debug('checking for type %s', type.fragment);
    return _.find(files, f => _.includes(f, type.fragment));
  });

  if (!type) {
    throw new Error('Unable to determine project type');
  }

  log.debug('type is %j', type);

  return type;
};
