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

function * addCapability(data) {
    if(data.party_id === undefined) {
        return { status : 400, body : "party_id is required" };
    }

    if(data.cap_name === undefined) {
        return { status : 400, body : "cap_name is required" };
    }

    if(data.category === undefined) {
        return { status : 400, body : "category is required" };
    }

    if(data.skill === undefined) {
        return { status : 400, body : "skill is required" };
    }

    if(data.type === undefined) {
        return { status : 400, body : "type is required" };
    }

    var response = yield new SModel().addCapability(data);

    return response;
}

module.exports = {
    getAllCapabilities,
    getCapability,
    addCapability
};
