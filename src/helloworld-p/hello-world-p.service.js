'use strict';

var HelloWorldModelP = require("./hello-world-p.model");

function getGreeting() {
    return new HelloWorldModelP("Hello World!").toJSON();
}

module.exports = {
    getGreeting
};