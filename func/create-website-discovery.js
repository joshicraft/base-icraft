const mongoose = require('mongoose');
const WebsiteDiscoveryQuestionsModel = require('../model/WebsiteDiscoveryQuestions.js');

const dbExecute = (db, fn) => db.then(fn).finally(() => db.close());

const mongoString = "mongodb+srv://josh-icraft:" + process.env.MONGO_DB_ATLAS_PW + "@cluster0-vqqfc.mongodb.net/test?retryWrites=true"

function dbConnectAndExecute(dbUrl, fn) {
    return dbExecute(mongoose.connect(dbUrl), fn);
}

const createErrorResponse = (statusCode, message) => ({
    statusCode: statusCode || 501,
    headers: { 'Content-Type': 'text/plain' },
    body: message || 'Incorrect id',
});

exports.handler = function (event, content, cb) {
    const data = JSON.parse(event.body);
    const newDocument = new WebsiteDiscoveryQuestionsModel({
        createdOn: Date.now(),
        results: data.results,
        endResult: data.endResult,
        selections: data.selections
    });

    dbConnectAndExecute(mongoString, () => {
        newDocument
            .save()
            .then(() => cb(null, {
                statusCode: 200,
                body: JSON.stringify({ id: newDocument.id }),
            }))
            .catch(err => cb(null, createErrorResponse(err.statusCode, err.message)))
    })

}
