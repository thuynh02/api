'use strict'

let SweetSkillsServer = require('./src/server/sweetSkillsServer.js');
let HelloWorld = require('./src/helloworld/helloworld.js');

// Create the server instance
const server =  SweetSkillsServer.createServer();
// Init the hello world module
const hello =  HelloWorld.init(server);

// Init/register additional modules here

// Start the server
server.start();
