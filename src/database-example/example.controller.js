"use strict";

var ExampleService = require("./example.service.js");
var Router = require('koa-router');
var parse = require('co-body');

function ExampleController (server) {
  this.server = server;

  // Create a new router
  var router = new Router({
    prefix: '/example'
  });

  router.get('/', function * () {
    var response = yield ExampleService.getAllUsers();

    this.body = response.body;
    this.status = response.status;
  });

  router.post('/', function * () {
    var data = yield parse(this);

    var response = yield ExampleService.addUser(data);

    this.body = response.body;
    this.status = response.status;
  });

  router.del('/:user_id', function * () {
    var data = this.params;

    var response = yield ExampleService.deleteUser(data);

    this.body = response.body;
    this.status = response.status;
  });

  // Add routes to the app
  server.app.use(router.routes());
  server.app.use(router.allowedMethods());

  return this;
}

module.exports = ExampleController;