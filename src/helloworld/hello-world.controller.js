"use strict";

var HelloWorldService = require("./hello-world.service.js");
var Router = require('koa-router');

function init (server) {
  // Create a new router
  var router = new Router({
    prefix: '/helloworld'
  });

  // Define Hello World route
  router.get('/', function * () {
    this.body = HelloWorldService.getGreeting();
    this.status = 200;
  });

  // Add routes to the app
  server.app.use(router.routes());
  server.app.use(router.allowedMethods());

  return this;
}

module.exports = {
  init: init
}