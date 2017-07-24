var func=require("./cordovaCmd");
var assert=require("assert");
describe("cordova command line",function(){
  it ("should run a cordova command",function(){
    return func("config","ls")
   .then(function(){

   },assert.fail); 
  })
  it ("should threw error if project is not cordova",function(){
    return func("plugins")
    .then(assert.fail,function(err){
      assert(err);
    });
  })
})