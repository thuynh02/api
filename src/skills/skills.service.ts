'use strict';

var SModel = require('./skills.model');
var logger = require('../server/logger');

// Perform data validation and return response from the model
function * getAllCapabilities() {
    var response = yield new SModel().getAllCapabilities();

    logger.info(response);
    return response;
}

function * getCapability(data:JSON) {
    if(data.capabilityId === undefined) {
        return { status : 400, body : 'Capability Id is required' };
    }
    var response = yield new SModel().getCapability(data);

    logger.info(response);
    return response;
}

function * addCapability(data:JSON) {
    if(data.partyId === undefined) {
        return { status : 400, body : 'partyId is required' };
    }

    if(data.capName === undefined) {
        return { status : 400, body : 'capName is required' };
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

function * updateCapability(data:JSON) {
    var validRequest = true;
    var requiredParams = ['capabilityId', 'partyId', 'capName', 'category', 'skill', 'type'];

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

function * deleteCapability(data:JSON) {
    if(data.capabilityId === undefined) {
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
