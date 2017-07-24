var cfg = require("../cfg");
module.exports = function (args) {
  var type = args.type;
  return cfg.load()
    .then(function () {
      cfg.setKey("type",args.type);
      if (!cfg.getKey("createDate")) {
        cfg.setKey("createDate", new Date());
      }
      return require("./" + type)(args)
    })
    .then(function () {
      return require("./server")(args)
    })
    .then(function () {
      return cfg.save();
    });
};