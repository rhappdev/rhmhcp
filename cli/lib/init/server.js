var cfg=require("../cfg");
module.exports=function(args){
  cfg.setKey("server.url",args.server_url);
}