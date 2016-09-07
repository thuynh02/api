var SSServer = require('./src/server/sweet-skills-server');
var HWController = require('./src/helloworld/hello-world.controller');
var PHWController = require('./src/privatehelloworld/private-hello-world.controller');
var UController = require('./src/users/users.controller');

'use strict';


// Create the server instance
const server =  new SSServer();

// Init the users module
const users = new UController(server);

// Init the hello world modules
const hello =  new HWController(server);

// Anything after this MUST have a web token for authentication
const hellop =  new PHWController(server);

// Start the server
server.start();
