"use strict";

var HWService = require("./hello-world.service");
var Router = require('koa-router');

function HelloWorldController (server:any) {
  this.server = server;
  // Create a new router
  var router = new Router({
    prefix: '/helloworld'
  });

  // Define Hello World route
  router.get('/', function * ():any {
    var service = new HWService();
    this.body = service.getGreeting();
    this.status = 200;
  });

  // Add routes to the app
  server.app.use(router.routes());
  server.app.use(router.allowedMethods());

  return;
}

module.exports = HelloWorldController;