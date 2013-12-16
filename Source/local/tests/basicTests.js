var fs = require('fs');
var monitoring = require('../../service/shared/monitoring.js');

function getTestData(fileName) {
    var data = fs.readFileSync(fileName);
    return data.toString();
}

exports.testNonJsonFile = function(test) {
    var body = getTestData('basicTests.js');
    var logItem = {
        succeeded: false
    };
    logItem = monitoring.parseServerJsonResponse(body, logItem);
    // console.log(logItem);

    test.ok(false == logItem.succeeded, "Parsing succeeded when it should not");
    test.done();
};

exports.testOkResponse = function(test) {
    var body = getTestData('okResponse.json');
    var logItem = {
        succeeded: false
    };
    logItem = monitoring.parseServerJsonResponse(body, logItem);

    test.ok(true == logItem.succeeded, "Validation failed on valid file");
    test.done();
};

exports.testEmptyOkResponse = function(test) {
    var body = getTestData('emptyOkResponse.json');
    var logItem = {
        succeeded: false
    };
    logItem = monitoring.parseServerJsonResponse(body, logItem);

    test.ok(false == logItem.succeeded, "Empty file validated as ok");
    test.ok(3 == logItem.errorCode, "Empty file validated as ok");
    test.done();
};