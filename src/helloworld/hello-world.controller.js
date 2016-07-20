"use strict";

let HelloWorldService = require("./hello-world.service.js");
// TODO koa-66 only works with koa 2+ which is in alpha
// let Router = require('koa-66');


function init (server) {
  // Create a new route
  // let router = new Router();
  server.app.use(function * (next) {
    if(this.request.path == "/helloworld") {
      // this.body = JSON.stringify( {message: "hello world"} );
      this.body = HelloWorldService.getGreeting();
    }
    yield next;
  });
  // Print the routes
  // console.info("Printing routes...");
  // router.stacks.forEach(function (stack) {
  //   console.info("%s: %s", stack.methods, stack.path);
  // });
  // Add the route to the app
  // server.app.use(router.routes());
  // return {router: router};
  return this;
}

module.exports = {
  init: init
}