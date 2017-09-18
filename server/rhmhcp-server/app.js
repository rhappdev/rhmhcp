'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var P = require("bluebird");
var log = require("./log");
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};
P.all([
  require("./db").init()
])
  .then(function () {
    log.info("Initialise finished");
    startServer();
  }, function (err) {
    log.error("Initialisation with error: %s", err);
  });

function startServer() {
  SwaggerExpress.create(config, function (err, swaggerExpress) {
    if (err) { throw err; }

    // install middleware
    swaggerExpress.register(app);
    // app.use(swaggerExpress.runner.swaggerTools.swaggerUi());
    var port = process.env.PORT || 10010;
    app.listen(port, (err) => {
      if (err) {
        throw err;
      }

      log.info(`server started and is listening on ${port}`);
    });
  });
}

