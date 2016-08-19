"use strict";

var SeqService = require("./seq.service.js");
var Router = require('koa-router');
var parse = require('co-body');

function SeqController (server) {
  this.server = server;

  // Create a new router
  var router = new Router({
    prefix: '/seq'
  });

  // Set up routes to call the services
  router.get('/capability', function * () {
    var response = yield SeqService.getAllCapability();

    this.body = response.body;
    this.status = response.status;
  });

  router.post('/capability', function * () {
    var data = yield parse.json(this);

    var response = yield SeqService.addCapability(data);

    this.body = response.body;
    this.status = response.status;
  });

  router.del('/:user_id', function * () {
    var data = this.params;

    var response = yield SeqService.deleteUser(data);

    this.body = response.body;
    this.status = response.status;
  });

  router.put('/:user_id', function * () {
    var data = yield parse(this);
    data.user_id = this.params.user_id;

    var response = yield SeqService.updateUser(data);

    this.body = response.body;
    this.status = response.status;
  });

  // Add routes to the app
  server.app.use(router.routes());
  server.app.use(router.allowedMethods());

  return;
}

module.exports = SeqController;