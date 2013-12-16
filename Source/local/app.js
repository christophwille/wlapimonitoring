var monitoring = require('../service/shared/monitoring.js');

function serviceAvailabilityCallback(logItem) {
    console.log(logItem);
}

console.log(monitoring.formatTestUrl());
// monitoring.checkServiceAvailability(serviceAvailabilityCallback);

