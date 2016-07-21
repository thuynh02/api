'use strict'

let SweetSkillsServer = require('./src/server/sweet-skills-server.js');
let HelloWorldController = require('./src/helloworld/hello-world.controller.js');

// Create the server instance
const server =  new SweetSkillsServer();
// Init the hello world module
const hello =  new HelloWorldController(server);

// Init/register additional modules here

// Start the server
server.start();
