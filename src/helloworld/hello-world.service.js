'use strict'

let HelloWorldModel = require("./hello-world.model");

function getGreeting() {
    return new HelloWorldModel("Hello WorldTest!").toJSON();
}

module.exports = {
    getGreeting
}