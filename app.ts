var SSServer = require("./src/server/sweet-skills-server.js");
var HWController = require("./src/helloworld/hello-world.controller.js");
var PHWController = require('./src/privatehelloworld/private-hello-world.controller.js');
var SController = require('./src/postgres/seq.controller.js');

'use strict';


// Create the server instance
const server =  new SSServer();

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
