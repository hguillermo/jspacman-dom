//*******************************************************************************
// Author: Harry Guillermo Mendoza
// Email: hguillermo@yahoo.com
// All copyrights are reserved
// Date: 08/22/2008
// Web site: http://www.harryguillermo.com
//*******************************************************************************
//
//
// Loader definition 
//
//
var loader;

//
//
//
function InitLoader()
{
    // Set the global input
    loader = new Loader();
};

//
//
//
function Loader()
{
    this.dummy = 0;
    
    // Get the porcentage and the border
    this.divLoader          = document.getElementById('divLoader');
    this.loaderBorder       = document.getElementById('loaderBorder');
    this.loaderPercentage   = document.getElementById('loaderPercentage');
    
    // Set the values for the loader image
    this.loaderWidth    = 332;
    this.loaderHeight   = 23;
    this.loaderPercentage.style.width   = '0px';
    this.loaderPercentage.style.height  = this.loaderHeight+'px';
    
    // Set the max value
    this.maxValue = 100;
}

//
//
//
Loader.prototype.Hide =
    function () 
    {
        this.divLoader.style.visibility         = 'hidden';
        this.loaderBorder.style.visibility      = 'hidden';
        this.loaderPercentage.style.visibility  = 'hidden';
        //this.divLoader.innerHTML = '';
    };

//
//
//
Loader.prototype.Reset =
    function () 
    {
        this.loaderPercentage.style.width   = '0px';
        this.loaderPercentage.style.height  = this.loaderHeight+'px';
    };

//
//
//
Loader.prototype.SetMaxValue =
    function ( value ) 
    {
        this.maxValue = value;
    };
        
//
//
//
Loader.prototype.Update =
    function ( value ) 
    {
        if ( value > this.maxValue )
        {
            this.loaderPercentage.style.width   = this.loaderWidth + 'px';
        }
        else if( value <= 0 )
        {
            this.loaderPercentage.style.width   = '0px';
        }
        else 
        {
            // Calculate the current percentaje
            var percentage = ( value / this.maxValue ) * this.loaderWidth;
            this.loaderPercentage.style.width = percentage + 'px';
        }
    };    