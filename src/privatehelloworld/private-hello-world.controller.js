"use strict";

var PrivateHelloWorldService = require("./private-hello-world.service.js");
var jwt = require('koa-jwt');
var Router = require('koa-router');
var dotenv = require('dotenv');
dotenv.load();

function PrivateHelloWorldController (server) {
  this.server = server;
  // Create a new router
  var router = new Router({
    prefix: '/private/helloworld'
  });

  var privateKey = new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64');
  server.app.use( 
      jwt({
          secret: privateKey,
          algorithm: 'HS256'
      })
  );

  // Define Hello World route
  router.get('/', function * () {
    this.body = PrivateHelloWorldService.getGreeting();
    this.status = 200;
  });

  // Add routes to the app
  server.app.use(router.routes());
  server.app.use(router.allowedMethods());

  return;
}

module.exports = PrivateHelloWorldController;