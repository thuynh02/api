"use strict";

let Koa = require('koa');
let Promise = require('bluebird');


function createServer () {
  let app = new Koa();
  
  app.use(function*(next){
    // Print the request paths
    console.log("Request path: %s", this.request.path);
    yield next;
  });
  /*
  let router = new Router();
  let mainRouter = new Router();*/
  let httpHandle;
  function start () {
    // Make port configurable
    let port = process.env.PORT || 80;
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