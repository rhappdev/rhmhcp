module.exports = {
  load: load,
  setKey: setKey,
  getKey: getKey,
  get: get,
  save: save
}
var env = require("../env");
var cfgFile = env.get("configFile");
var fs = require("fs");
var P = require("bluebird");
var log = require("../log");
var curCfg = null;
var _ = require("lodash");
function load(path) {
  if (curCfg) {
    log.warn("Loading config file multiple times. It is not supposed to.");
  }
  var p = getPath(path);
  log.info("Load config file from: %s", p);
  return new P(function (resolve, reject) {
    fs.exists(p, resolve);
  })
    .then(function (exists) {
      if (exists) {
        return require(p);
      } else {
        log.warn("Config file: %s does not exist. Will init.", p);
        return {};
      }
    })
    .then(function (d) {
      d.path=p;
      set(d);
      return curCfg;
    })
}
function setKey(key, val) {
  _.set(curCfg, key, val);
}

function getKey(key, def) {
  if (!curCfg) {
    throw ("Config is not loaded and getKey is called.");
  }
  return _.get(curCfg, key, def);
}
function set(data) {
  curCfg = data;
}
function get() {
  return curCfg;
}

function save(path) {
  var p = getPath(path);
  return P.promisify(fs.writeFile)(p, JSON.stringify(curCfg, null, 2));
}
function getPath(path) {
  if (!path) {
    path = process.cwd();
  }
  return require("path").join(path, cfgFile);
}