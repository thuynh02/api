"use strict";
var Koa = require('koa');
var BBPromise = require('bluebird');
var Router = require('koa-router');
var cors = require('kcors');
var logger = require('./logger.js');
var enforceHttps = require('koa-sslify');
var fs = require('fs');
var https = require('https');
var http = require('http');

function SweetSkillsServer () {
  this.app = new Koa();
  this.logger = logger;
  this.app.use(cors());
  this.app.use(enforceHttps());
  initMiddleware(this);
  this.httpHandle;
  this.httpsHandle;

  /*
  let router = new Router();
  let mainRouter = new Router();
  */
}

SweetSkillsServer.prototype.start = function () {

  // Make port configurable
  let port = process.env.PORT || 80;
  console.log("Starting Sweet Skills Server on port %s...", port);
  let server = this;

  return new BBPromise(function (resolve:any) {
    var options = {
      key: fs.readFileSync(process.env.PRIVKEY),
      cert: fs.readFileSync(process.env.CERT)
    }
    server.httpHandle = http.createServer(server.app.callback()).listen(80);
    server.httpsHandle = https.createServer(options, server.app.callback()).listen(443, function() {
      console.log("Server Started");
      resolve();
    });
  });
};

SweetSkillsServer.prototype.stop = function () {

  console.log("Stopping Sweet Skills Server...");
  let server = this;
  if (!server.httpsHandle && !server.httpHandle) {
    console.log("Server has already been stopped.");
    return;
  }
  return new BBPromise(function (resolve:any) {
    server.httpsHandle.close(function () {
      server.httpHandle.close(function () {
        console.log("Server stopped.");
        resolve();
      });
    });
  });
};

function initMiddleware(sweetSkillsServer:any) {
  // Register a middleware to print request paths and handle errors
  
  sweetSkillsServer.app.use(function*(next:any){
    console.log("Request path: %s", this.request.path);
    yield next;
    try {
      console.log("Request path: %s", this.request.path);
      yield next;
    } catch(err) {
      sweetSkillsServer.status = err.status || 500;
      sweetSkillsServer.body = err.message;
      sweetSkillsServer.app.emit('error', err, SweetSkillsServer);
      sweetSkillsServer.logger.error(err);
    }
  });
  
  // Register a middleware to listen for shutdown request
  sweetSkillsServer.app.use(function* (next:any) {
    if (this.request.path == "/server/shutdown") {
      sweetSkillsServer.stop();
    }
    yield next;
  });
}

module.exports = SweetSkillsServer;