var monitoring = require('../shared/monitoring.js');

function monitorRealtimeApi() {
    monitoring.checkServiceAvailability(serviceAvailabilityCallback);

    function serviceAvailabilityCallback(logItem) {
         var logTable = tables.getTable('AvailabilityLog');
    
         logTable.insert(logItem, {
             success: function () {
                // do something here (if necessary)
             }
         });
    
        console.log(logItem);
    }
}