'use strict';

var HWModel = require("./hello-world.model");

function HelloWorldService() {
   
}

HelloWorldService.prototype.getGreeting = function () {
    return new HWModel("Hello World!").toJSON();
}

module.exports = HelloWorldService;