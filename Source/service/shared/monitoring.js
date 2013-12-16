var req = require('request');

var cfg = require('./config.js');
var settings = cfg.getSettings();

var ErrorCodesEnum = {
    notSet: -1,
    none: 0,
    downloadFailed: 1,
    jsonParsingFailed: 2,
    emptyOkResponse: 3
};

function formatTestUrl() {
    return settings.api.monitorUrl + settings.api.sender;
}

function checkServiceAvailability(callback) {
    var reqStart = new Date();
    req( {uri: formatTestUrl() }, function (err, response, body) {
        var logItem = {
            timeOfRequest: reqStart,
            timeOfResponse: new Date(),
            succeeded: false,
            errorCode: ErrorCodesEnum.notSet,
            errorMessage: ''
        };
        if (response) {
            logItem.httpStatusCode = response.statusCode;
        } else {
            logItem.httpStatusCode = -1;
        }
        if (!err && response.statusCode == 200) {
            logItem = parseServerJsonResponse(body, logItem);
        }
        else {
            logItem.errorCode = ErrorCodesEnum.downloadFailed;
            logItem.errorMessage = err.toString();
        }

        callback(logItem);
    });
}

function parseServerJsonResponse(body, logItem) {
    try {
        var json = JSON.parse(body);

        if (json.data && json.message && json.data.monitors) {
            if (json.message.value === 'OK' && json.data.monitors.length === 0) {
                logItem.errorCode = ErrorCodesEnum.emptyOkResponse;
                return logItem;
            }
        }

        logItem.errorCode = ErrorCodesEnum.none;
        logItem.succeeded = true;
    }
    catch (jsonParseEx) {
        logItem.errorCode = ErrorCodesEnum.jsonParsingFailed;
        logItem.errorMessage = jsonParseEx.toString();
    }

    return logItem;
}

exports.formatTestUrl = formatTestUrl;
exports.parseServerJsonResponse = parseServerJsonResponse;

exports.checkServiceAvailability = checkServiceAvailability;