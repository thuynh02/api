module.exports = HelloWorldModel;

function HelloWorldModel(message) {
    this.message = message;
}

var model = HelloWorldModel.prototype;

model.toJSON = function() {
    return this;
};