'use strict'

var SweetSkillsServer = require('./src/server/sweet-skills-server.js');
var HelloWorld = require('./src/helloworld/hello-world.controller.js');
var Example = require('./src/database-example/example.controller.js');

// Create the server instance
const server =  SweetSkillsServer.createServer();
// Init the hello world module
const hello =  HelloWorld.init(server);
// Init/register additional modules here
const example =  Example.init(server);
// Start the server
server.start();
