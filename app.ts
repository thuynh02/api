var SSServer = require('./src/server/sweet-skills-server');
var HWController = require('./src/helloworld/hello-world.controller');
var PHWController = require('./src/privatehelloworld/private-hello-world.controller');
var SKController = require('./src/skills/skills.controller');

import {UsersController} from './src/users/users.controller';
import {LearningResourcesController} from './src/learning-resources/learning-resources.controller';
import {ProjectsController} from './src/projects/projects.controller';
import {GroupsController} from './src/groups/groups.controller';

'use strict';

// Create the server instance
const server =  new SSServer();

// Init the api modules
const skills = new SKController(server);
const users = new UsersController(server, '/users');
const learningResources =  new LearningResourcesController(server, '/learningResources');
const projects =  new ProjectsController(server, '/projects');
//Uncomment the below line when the group table is fixed on the backend
//const groups =  new GroupsController(server, '/groups');

// Init the hello world modules
const hello =  new HWController(server);

/*
*  Authorization Key is currently set in private-hello-world.controller.js
*  Move to sweet-skills-server when ready to secure all transactions
*/
// Anything after this MUST have a web token for authentication
const hellop =  new PHWController(server);

// Start the server
server.start();
