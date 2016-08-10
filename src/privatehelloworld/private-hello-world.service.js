'use strict';

var PrivateHelloWorldModel = require("./private-hello-world.model");

function getGreeting() {
    return new PrivateHelloWorldModel("Private Hello World!").toJSON();
}

module.exports = {
    getGreeting
};