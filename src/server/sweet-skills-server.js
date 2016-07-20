"use strict";

var Koa = require('koa');
var Promise = require('bluebird');
var Router = require('koa-router');

function createServer () {
  var app = new Koa();
  
  app.use(function * (next){
    // Print the request paths
    console.log("Request path: %s", this.request.path);
    yield next;
  });

  var router = new Router({
    prefix: '/'
  });

  router.get('/', function * () {
    this.body = "Welcome to the home page";
    this.status = 200;
  });

  var httpHandle;
  function start () {
    // Make port configurable
    var port = process.env.PORT || 3000;
    console.log("Starting server on port %s...", port);
    return new Promise(function (resolve) {
      httpHandle = app.listen(port, function () {
        console.log("Server started.");
        resolve();
      });
    });
  };

  function stop () {
    console.log("Stopping server...");
    if (!httpHandle) {
      console.log("Server has already been stopped.");
      return;
    }
    return new Promise(function (resolve) {
      httpHandle.close(function () {
        console.log("Server stopped.");
        resolve();
      });
    });
  };
  return {
    app: app,/*
    router: router,
    mainRouter: mainRouter,*/
    start: start,
    stop: stop
  }
}

module.exports = {
  createServer: createServer
}