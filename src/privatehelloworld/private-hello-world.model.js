'use strict';

function PrivateHelloWorldModel(message) {
    this.message = message;
    return;
}

var model = PrivateHelloWorldModel.prototype;

model.toJSON = function() {
    return this;
}

module.exports = PrivateHelloWorldModel;