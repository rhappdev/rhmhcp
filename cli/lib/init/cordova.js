var log=require("../log");
var cordovaCmd=require("../platforms/cordova/cordovaCmd");
var cfg=require("../cfg");
var P=require("bluebird");
module.exports=function(args){
  if (cfg.getKey("cordova.pluginInstalled",false)){
    return P.resolve();
  }
  cfg.setKey("cordova.cmd",args.cordovaExec);
  return cordovaCmd("plugin","add","https://github.com/Keyang/cordova-hot-code-push.git")
  .then(function(){
    cfg.setKey("cordova.pluginInstalled",true);
  })
}