'use strict';

function HelloWorldModel(message:string) {
    this.message = message;
    return;
}

var model = HelloWorldModel.prototype;

model.toJSON = function() {
    return this;
}

module.exports = HelloWorldModel;