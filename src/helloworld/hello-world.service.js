'use strict'

var HelloWorldModel = require("./hello-world.model");

function getGreeting() {
    return new HelloWorldModel("Hello World!").toJSON();
}

module.exports = {
    getGreeting
}