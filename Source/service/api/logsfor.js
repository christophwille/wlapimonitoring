var common = require('../shared/common.js');

exports.get = function(request, response) {
    var logsForDateInput = request.query.date;  
    var logsForDate = common.queryStringDateToSqlDate(logsForDateInput);
    
    var sql = 'SELECT * from availabilitylog WHERE ? = CONVERT(DATE, timeOfRequest)';
    console.log(common.formatSqlDate(logsForDate));
    
    if (logsForDate !== 'undefined') {
        request.service.mssql.query(sql, [common.formatSqlDate(logsForDate)],{
                success: function(results) {
                    for (var i = 0; i < results.length; i++) {
                        var element = results[i];
                
                        delete element.id;
                        delete element.__createdAt;
                        delete element.__updatedAt;
                        delete element.__version;
                    }
    
                    response.send(statusCodes.OK, results);
                },
                error: function(error) {
                    console.error(error);
                    response.send(statusCodes.NOT_FOUND, "Query Error");
                }
            });  
    } else {
        response.send(statusCodes.INTERNAL_SERVER_ERROR, "Invalid date parameter specified");
    }
};