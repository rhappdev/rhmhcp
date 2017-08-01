'use strict';

const util = require('./util');
const cfg = require('../../cfg');
const log = require('../../log');
const inquirer = require('inquirer');
const mkdirSync = require('mkdirp').sync;
const fs = require('fs');
const join = require('path').join;
const et = require('elementtree');

/**
 * Locations that a user can specify to use for a cordova binary
 */
const LOCATIONS = exports.LOCATIONS = ['local', 'global', 'custom'];

/**
 * Initialise the current Cordova project with Red Hat Mobile Hot Code Push
 */
exports.initialise = function () {
  return util.installHcpPlugin()
    .then(addHooks)
    .then(updateConfigXml);
};

/**
 * Asks questions required to complete Cordova setup
 * @return {Promise<Object>}
 */
exports.askQuestions = function () {
  log.debug('asking extra setup questions if required');
  return inquirer.prompt([
      {
        type: 'list',
        name: 'cordova.location',
        message: 'Where is the Cordova executable located? Local is recommended to avoid versioning issues.',
        choices: LOCATIONS
      }
    ]).then((answers) => {
      if (answers.cordova.location === 'custom') {
        // Need to ask a follow up if type is custom
        log.debug('user wants to use custom cordova, asking for location');
        return inquirer.prompt([
          {
            name: 'cordova.location',
            message: 'Enter the path to your Cordova executable'
          }
        ]);
      } else {
        return answers;
      }
    });
};

/**
 * Add the requierd hot code push elements to the config.xml
 * @return {Promise}
 */
function updateConfigXml () {
  const CONFIG_PATH = join(process.cwd(), 'config.xml');

  // The config.xml file contents
  const configString = fs.readFileSync(CONFIG_PATH, 'utf8');

  // A DOM tree represnting the config
  const configObject = et.parse(configString);

  // The main node in the tree
  const cordovaConfigTree = configObject.find('./');

  // Create the hcp config element and child url element
  const rootEl = et.Element('chcp');
  const cfgFileEl = et.SubElement(rootEl, 'config-file');

  // Set our URL for hcp server
  cfgFileEl.set('url', cfg.getServerUrl());

  // Need to inject hcp into main config node
  cordovaConfigTree.append(rootEl);

  // Finally generate the xml string output
  const newTreeXmlStr = new et.ElementTree(cordovaConfigTree).write({
    indent: 4
  });

  fs.writeFileSync(CONFIG_PATH, newTreeXmlStr);
}

/**
 * Add any required hooks to the project. For now the hook simply ensures the rhmcp.json file is copied into www/
 * @return {Promise<undefined>}
 */
function addHooks () {
  log.progress('creating custom hook to inject rhmcp.json');

  const BASE = join(process.cwd(), 'hooks', 'before_prepare');
  const BASE_FILE = join(__dirname, 'before_prepare_copy_rhmcp.js');
  const DEST_FILE = join(BASE, 'before_prepare_copy_rhmcp.js');

  // Ensure the hook folder exists
  mkdirSync(BASE);

  return new Promise((resolve, reject) => {
    // Copy the file into hooks
    fs.createReadStream(BASE_FILE).pipe(fs.createWriteStream(DEST_FILE))
      .on('error', reject)
      .on('finish', resolve);
  });
}
