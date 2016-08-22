var SSServer = require("./src/server/sweet-skills-server.js");
var HWController = require("./src/helloworld/hello-world.controller.js");
var PHWController = require('./src/privatehelloworld/private-hello-world.controller.js');
var SController = require('./src/postgres/seq.controller.js');

'use strict';


// Create the server instance
const server =  new SSServer();

// Init the postgres module
const seq = new SController(server);

// Init the hello world modules
const hello =  new HWController(server);
const hellop =  new PHWController(server);

// Start the server
server.start();
