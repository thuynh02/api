"use strict";

var SkillsService = require("./skills.service.js");
var Router = require('koa-router');
var parse = require('co-body');

function SkillsController (server) {
  this.server = server;

  // Create a new router
  var router = new Router({
    prefix: '/skills'
  });

  // Add routes to the app
  server.app.use(router.routes());
  server.app.use(router.allowedMethods());

  return;
}

module.exports = SkillsController;