"use strict";

var PService = require("./postgres.service.js");
var Router = require('koa-router');
var parse = require('co-body');

function PostgresController (server) {
  this.server = server;

  // Create a new router
  var router = new Router({
    prefix: '/postgres'
  });

  // Set up routes to call the services
  router.get('/', function * () {
    var service = new PService();
    var response = yield service.getAllCapability;

    console.log('response body: ', response.body);
    console.log('response status: ', response.status);

    this.body = response.body;
    this.status = response.status;
  });

  // Add routes to the app
  server.app.use(router.routes());
  server.app.use(router.allowedMethods());

  return;
}

module.exports = PostgresController;