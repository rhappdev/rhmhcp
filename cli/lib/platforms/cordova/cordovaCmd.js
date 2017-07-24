var spawn = require("child_process").spawn
var log = require("../../log");
var P = require("bluebird");
var fs = require("fs");
var cfg = require("../../cfg");
module.exports = function () {
  var args = Array.prototype.slice.call(arguments, 0);
  var exec = cfg.getKey("cordova.cmd","cordova");
  log.info("Run cordova cli: %s, with arguments %j", exec, args);
  var c = spawn(exec, args,{
    stdio:[0,1,2]
  });
  return new P(function (resolve, reject) {
    c.on("close", (function (code) {
      if (code > 0) {
        reject(new Error("command returned code: "+code));
      }else{
        resolve();
      }
    }));
  })
}