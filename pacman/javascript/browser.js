//*******************************************************************************
// Author: Harry Guillermo Mendoza
// Email: hguillermo@yahoo.com
// All copyrights are reserved
// Date: 08/22/2008
// Web site: http://www.harryguillermo.com
//*******************************************************************************
//
//
// Browser definition 
//
//
var browser;

//
//
//
function InitBrowser()
{
    browser = new Browser();
};

/*****************************/
/* Browser object definition */
/*****************************/
//
//
//
function Browser()
{
    this.Firefox = '';
    this.dummy = 0;
    
    var browsername = navigator.appName;
    var version = parseFloat( navigator.appVersion );

    var netscape = 'Netscape';
    var iexplore = 'Microsoft Internet Explorer';

    // Boolean to determine what browser has the client
    this.isIE = false;
    this.isNetscape = false;
    
    
    if ( browsername == netscape )
    {
        this.isNetscape = true;
    }
    else if ( browsername == iexplore )
    {
        this.isIE = true;
    }
    else
    {
        //TODO: Redirect to not supported browser
    }
};

//
//
//
Browser.prototype.IsIE =
    function ()
    {
        return this.isIE; 
    };
    
//
//
//
Browser.prototype.IsNetscape =
    function ()
    {
        return this.isNetscape; 
    };
