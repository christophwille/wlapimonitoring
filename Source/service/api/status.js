exports.get = function(request, response) {
    var logTable = request.service.tables.getTable('AvailabilityLog');

    logTable
        .orderByDescending('__createdAt')
        .take(1)
        .read({ success: sendStatusResponse });
        
    function sendStatusResponse(results) {
        if(results.length > 0) {
            var logItem = results[0];
            delete logItem.id;
            response.send(statusCodes.OK, logItem);
        } else {
            response.send(statusCodes.NOT_FOUND, "Not found");
        }
    }
};