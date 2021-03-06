"use strict";

var PHWService = require("./private-hello-world.service");
var jwt = require('koa-jwt');
var Router = require('koa-router');
/*
var dotenv = require('dotenv');
dotenv.load();
*/
function PrivateHelloWorldController (server:any) {
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
  router.get('/', function * ():any {
    var service = new PHWService();
    this.body = service.getGreeting();
    this.status = 200;
  });

  // Add routes to the app
  server.app.use(router.routes());
  server.app.use(router.allowedMethods());

  return;
}

module.exports = PrivateHelloWorldController;