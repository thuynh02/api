"use strict";

var HelloWorldServiceP = require("./hello-world-p.service.js");
var jwt = require('koa-jwt');
var Router = require('koa-router');

function HelloWorldControllerP (server) {
  this.server = server;
  // Create a new router
  var router = new Router({
    prefix: '/helloworldp'
  });

  server.app.use(jwt({ secret: 'shared-secret' }));

  // Define Hello World route
  router.get('/', function * () {
    this.body = HelloWorldServiceP.getGreeting();
    this.status = 200;
  });

  // Add routes to the app
  server.app.use(router.routes());
  server.app.use(router.allowedMethods());

  return;
}

module.exports = HelloWorldControllerP;