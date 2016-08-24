'use strict';
var SModel = require("./skills.model.js");

// Perform data validation and return response from the model
function * getAllCapabilities() {
    var response = yield new SModel().getAllCapabilities();

    return response;
}

function * getCapability(data) {
    if(data.capability_id === undefined) {
        return { status : 400, body : "Capability Id is required" };
    }
    var response = yield new SModel().getCapability(data);

    return response;
}

module.exports = {
    getAllCapabilities,
    getCapability
};
