const mongoose = require('mongoose');

const model = mongoose.model('WebsiteDiscoveryQuestions', {
    createdOn: {
        type: Date,
        default: Date.now
    },
    selections: {
        type: Array,
        default: []
    },
    endResult: {
        type: String
    },
    results: {
        type: Object
    }
});

module.exports = model;
