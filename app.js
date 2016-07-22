'use strict'

let SweetSkillsServer = require('./src/server/sweet-skills-server.js');
let HelloWorldController = require('./src/helloworld/hello-world.controller.js');
let ExampleController = require('./src/database-example/example.controller.js');

// Create the server instance
const server =  new SweetSkillsServer();
// Init the hello world module
const hello =  new HelloWorldController(server);

// Init/register additional modules here
const example =  new ExampleController(server);
// Start the server
server.start();
