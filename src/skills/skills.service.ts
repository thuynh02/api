'use strict';

var SModel = require('./skills.model.js');
var logger = require('../server/logger.js');

// Perform data validation and return response from the model
function * getAllCapabilities() {
    var response = yield new SModel().getAllCapabilities();

    logger.info(response);
    return response;
}

function * getCapability(data) {
    if(data.capability_id === undefined) {
        return { status : 400, body : 'Capability Id is required' };
    }
    var response = yield new SModel().getCapability(data);

    logger.info(response);
    return response;
}

function * addCapability(data) {
    if(data.party_id === undefined) {
        return { status : 400, body : 'party_id is required' };
    }

    if(data.cap_name === undefined) {
        return { status : 400, body : 'cap_name is required' };
    }

    if(data.category === undefined) {
        return { status : 400, body : 'category is required' };
    }

    if(data.skill === undefined) {
        return { status : 400, body : 'skill is required' };
    }

    if(data.type === undefined) {
        return { status : 400, body : 'type is required' };
    }

    var response = yield new SModel().addCapability(data);

    logger.info(response);
    return response;
}

function * updateCapability(data) {
    var validRequest = true;
    var requiredParams = ['capability_id', 'party_id', 'cap_name', 'category', 'skill', 'type'];

    var missingParam = '';

    // Validate required parameters
    for(let i = 0; i < requiredParams.length; i++) {
        if(!data.hasOwnProperty(requiredParams[i])) {
            missingParam = requiredParams[i];
            validRequest = false;
            break;
        }
    }

    if(!validRequest) {
        return { status : 400, body: 'Missing parameter: ' + missingParam }
    }

    var response = yield new SModel().updateCapability(data);

    logger.info(response);
    return response;
}

function * deleteCapability(data) {
    if(data.capability_id === undefined) {
        return { status : 400, body : 'Capability Id is required' };
    }
    var response = yield new SModel().deleteCapability(data);

    logger.info(response);
    return response;
}

module.exports = {
    getAllCapabilities,
    getCapability,
    addCapability,
    updateCapability,
    deleteCapability
};
