"use strict";

var ExampleService = require("./example.service.js");
var Router = require('koa-router');
var parse = require('co-body');

function init (server) {
  // Create a new router
  var router = new Router({
    prefix: '/example'
  });

  router.get('/', function * () {
    this.body = ExampleService.getGreeting();
    this.status = 200;
  });

  router.post('/', function * () {
    var data = yield parse(this);

    var response = yield ExampleService.addUser(data);

    this.body = response.body;
    this.status = response.status;
  });

  // Add routes to the app
  server.app.use(router.routes());
  server.app.use(router.allowedMethods());

  return this;
}

module.exports = {
  init: init
};