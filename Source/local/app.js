var monitoring = require('../service/shared/monitoring.js');
function serviceAvailabilityCallback(logItem) {
    console.log(logItem);
}

// console.log(monitoring.formatTestUrl());
// monitoring.checkServiceAvailability(serviceAvailabilityCallback);


var req = require('request');
function checkQandoAvailability(callback) {
    req( {uri: 'http://isqandoupdev.azurewebsites.net/api/qando' }, function (err, response, body) {
        if (!err && response.statusCode == 200) {
            try {
                var json = JSON.parse(body);

                if (json.Succeeded && json.Lines) {
                    if (json.Succeeded === true && json.Lines.length !== 0) {
                        callback(true);
                        return;
                    }
                }
            }
            catch (jsonParseEx) {
            }
        }

        callback(false);
    });
}

function qandoCallback(isUp) {
    console.log(isUp);
}

// checkQandoAvailability(qandoCallback);

var edge = require('edge');
var clrMethod = edge.func('Qando.Api.dll');

clrMethod('', function (error, result) {
    if (result && result.Succeeded && result.Succeeded === true) {
        console.log('Qando returned data a-ok');
    }
    else {
        console.log(result);
    }
});