"use strict";
var Koa = require('koa');
var BBPromise = require('bluebird');
var Router = require('koa-router');
var cors = require('kcors');
var logger = require('koa-bunyan-logger');

function SweetSkillsServer () {
  this.app = new Koa();
  this.app.use(cors());
  this.app.use(logger());
  this.app.use(logger.requestLogger());
  initMiddleware(this);
  /*
  let router = new Router();
  let mainRouter = new Router();*/
  this.httpHandle;

}

SweetSkillsServer.prototype.start = function () {
    // Make port configurable
    let port = process.env.PORT || 80;
    console.log("Starting Sweet Skills Server on port %s...", port);
    let server = this;
    return new BBPromise(function (resolve) {
      server.httpHandle = server.app.listen(port, function () {
        console.log("Server started.");
        resolve();
      });
    });
  };

SweetSkillsServer.prototype.stop = function () {
    console.log("Stopping Sweet Skills Server...");
    let server = this;
    if (!server.httpHandle) {
      console.log("Server has already been stopped.");
      return;
    }
    return new BBPromise(function (resolve) {
      server.httpHandle.close(function () {
        console.log("Server stopped.");
        resolve();
      });
    });
  };

function initMiddleware(sweetSkillsServer) {
  // Register a middleware to print request paths
  /*
  sweetSkillsServer.app.use(function*(next){
    console.log("Request path: %s", this.request.path);
    yield next;
  });
  */
  // Register a middleware to listen for shutdown request
  sweetSkillsServer.app.use(function* (next) {
    if (this.request.path == "/server/shutdown") {
      sweetSkillsServer.stop();
    }
    yield next;
  });
}

module.exports = SweetSkillsServer;