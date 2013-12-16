// http://www.codeproject.com/Tips/144113/JavaScript-Date-Validation
function queryStringDateToSqlDate(d) {
    if (d) {
        var dateparts = d.split('-');
        if (dateparts.length === 3) {
            var Day = parseInt(dateparts[2], 10);
            var Month = parseInt(dateparts[1], 10);
            var Year = parseInt(dateparts[0], 10);
            var OK = true;

            if (OK = ((Year > 1900) && (Year < new Date().getFullYear()+1))) {
                if (OK = (Month <= 12 && Month > 0)) {

                    var LeapYear = (((Year % 4) === 0) && ((Year % 100) !== 0) || ((Year % 400) === 0));   
                    
                    if(OK = Day > 0)
                    {
                        if (Month == 2) {  
                            OK = LeapYear ? Day <= 29 : Day <= 28;
                        } 
                        else {
                            if ((Month == 4) || (Month == 6) || (Month == 9) || (Month == 11)) {
                                OK = Day <= 30;
                            }
                            else {
                                OK = Day <= 31;
                            }
                        }
                    }
                }
            }
            
            return new Date(Year, Month-1, Day);
        }
    } 
    
    return 'undefined';
}

// http://stackoverflow.com/questions/1531093/how-to-get-current-date-in-javascript
function formatSqlDate(d) {
    var dd = d.getDate();
    var mm = d.getMonth() + 1; //January is 0!
    var yyyy = d.getFullYear();
    
    if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} d = yyyy+'-'+mm+'-'+dd;
    
    return d;    
}

exports.queryStringDateToSqlDate = queryStringDateToSqlDate;
exports.formatSqlDate = formatSqlDate;
