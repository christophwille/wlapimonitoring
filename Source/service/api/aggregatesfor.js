var common = require('../shared/common.js');

exports.get = function(request, response) {
    var fromDateInput = request.query.from;  
    var fromDate = common.queryStringDateToSqlDate(fromDateInput);
    var sqlFromDate = common.formatSqlDate(fromDate);
    
    var toDateInput = request.query.to;  
    var toDate = common.queryStringDateToSqlDate(toDateInput);
    var sqlToDate = common.formatSqlDate(toDate);
    
    var sql = 'SELECT errorCode, count(*) AS occurrences from availabilitylog WHERE ' +
        '? >= CONVERT(DATE, timeOfRequest) AND CONVERT(DATE, timeOfRequest) >= ? ' +
        ' GROUP BY errorCode';
    
    if (sqlFromDate !== 'undefined' && sqlToDate !== 'undefined' && sqlFromDate <= sqlToDate) {
        request.service.mssql.query(sql, [sqlToDate, sqlFromDate],{
                success: function(results) {
                    response.send(statusCodes.OK, results);
                },
                error: function(error) {
                    console.error(error);
                    response.send(statusCodes.NOT_FOUND, "Query Error");
                }
            });  
    } else {
        response.send(statusCodes.INTERNAL_SERVER_ERROR, "Invalid date parameters specified");
    }
};