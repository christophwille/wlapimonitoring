var monitoring = require('../shared/monitoring.js');

function monitorRealtimeApi() {
    monitoring.checkServiceAvailability(serviceAvailabilityCallback);

    function serviceAvailabilityCallback(logItem) {
        // writeLogEntry(logItem);   // Use this if not monitoring Qando too
        
        checkQandoAvailability(qandoCallback);
        
        function qandoCallback(isUp) {
            logItem.isQandoUp = isUp;
            writeLogEntry(logItem);
        }
    }
}

function writeLogEntry(logItem) {
     var logTable = tables.getTable('AvailabilityLog');

     logTable.insert(logItem, {
         success: function () {
            // do something here (if necessary)
         }
     });

    // console.log(logItem);
}

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