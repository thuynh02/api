'use strict';
var SModel = require("./skills.model.js");

// Perform data validation and return response from the model
function * getAllCapabilities() {
    var response = yield new SModel().getAllCapabilities();

    return response;
}

module.exports = {
    getAllCapabilities
};
