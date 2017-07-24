module.exports = {
  init: init,
  col:col,
  db:getDb,
  project:function(options){return col("project",options)}
}

var env=require("../env");
var log=require("../log");
var connUrl = env.get("MONGODB_URL");
var MongoClient = require("mongodb").MongoClient;
var db;
function init() {
  return MongoClient.connect(connUrl, {
    promiseLibrary: require("bluebird"),
    poolSize:5,
    autoReconnect:true
  })
  .then(function(_db){
    log.info("DB connected");
    db=_db;
  })
}

function col(name,options){
  return db.collection(name,options);
}

function getDb(){
  return db;
}