var SSServer = require("./src/server/sweet-skills-server");
var HWController = require("./src/helloworld/hello-world.controller");
var PHWController = require('./src/privatehelloworld/private-hello-world.controller');
var SController = require('./src/postgres/seq.controller');
var SKController = require('./src/skills/skills.controller');

'use strict';

// Create the server instance
const server =  new SSServer();

// Init the postgres module
const seq = new SController(server);

// Init the skills module
const skills = new SKController(server);

// Init the hello world modules
const hello =  new HWController(server);
const hellop =  new PHWController(server);

// Start the server
server.start();
