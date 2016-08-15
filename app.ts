var SSServer = require("./src/server/sweet-skills-server.js");
var HWController = require("./src/helloworld/hello-world.controller.js");
var EController = require("./src/example/example.controller.js");
let PHWController = require('./src/privatehelloworld/private-hello-world.controller.js');
'use strict';


// Create the server instance
const server =  new SSServer();
// Init the hello world module
const hello =  new HWController(server);
const hellop =  new PHWController(server);

// Init/register additional modules here
const example =  new EController(server);
// Start the server
server.start();
