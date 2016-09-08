var SSServer = require('./src/server/sweet-skills-server');
var HWController = require('./src/helloworld/hello-world.controller');
var PHWController = require('./src/privatehelloworld/private-hello-world.controller');
var SKController = require('./src/skills/skills.controller');

'use strict';

// Create the server instance
const server =  new SSServer();

// Init the skills module
const skills = new SKController(server);

// Init the hello world modules
const hello =  new HWController(server);

/*
*  Authorization Key is currently set in private-hello-world.controller.js
*  Move to sweet-skills-server when ready to secure all transactions
*/
const hellop =  new PHWController(server);

// Init the postgres module
const seq = new SController(server);

// Start the server
server.start();
