'use strict'

let SweetSkillsServer = require('./src/server/sweet-skills-server.js');
let HelloWorld = require('./src/helloworld/hello-world.controller.js');

// Create the server instance
const server =  SweetSkillsServer.createServer();
// Init the hello world module
const hello =  HelloWorld.init(server);

// Init/register additional modules here

// Start the server
server.start();
