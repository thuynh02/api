'use strict';

function HelloWorldModelP(message) {
    this.message = message;
    return;
}

var model = HelloWorldModelP.prototype;

model.toJSON = function() {
    return this;
}

module.exports = HelloWorldModelP;