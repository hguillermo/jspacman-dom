//*******************************************************************************
// Author: Harry Guillermo Mendoza
// Email: hguillermo@yahoo.com
// All copyrights are reserved
// Date: 08/22/2008
// Web site: http://www.harryguillermo.com
//*******************************************************************************
//
//
// Database definition 
//
//
var database;

//
//
//
function InitDatabase()
{
    database = new Database();
    database.LoadHighScore();
};


/******************************/
/* Database object definition */
/******************************/
//
//
//
function Database()
{
    this.dummy = 0;
};
       
//
//
//
Database.prototype.LoadHighScore =
    function ()
    {
        var oXHR = zXmlHttp.createRequest();
        oXHR.open( 'get', 'ajax/ajaxrequest.php?action=rs' );
        oXHR.onreadystatechange = function() 
            {
                // If the response was completed
                if ( oXHR.readyState == 4 )
                {
                    var result = 0;
                    if ( oXHR.status == 200 )
                        result = oXHR.responseText;
                    
                    result = IsNumeric( result ) ? result: 0;
                    
                    // Set the high score.
                    game.SetHighScore( result );
                }
            };
        oXHR.send( null );
    };


