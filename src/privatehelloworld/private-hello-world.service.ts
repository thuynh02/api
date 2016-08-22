'use strict';

var PHWModel = require("./private-hello-world.model");

function PrivateHelloWorldService() {

}

PrivateHelloWorldService.prototype.getGreeting = function () {
    return new PHWModel("Private Hello World!").toJSON();
}

module.exports = PrivateHelloWorldService;