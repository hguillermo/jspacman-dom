//*******************************************************************************
// Author: Harry Guillermo Mendoza
// Email: hguillermo@yahoo.com
// All copyrights are reserved
// Date: 08/22/2008
// Web site: http://www.harryguillermo.com
//*******************************************************************************
//
//
// Credit definition 
//
//
var credit;

//
//
//
function InitCredit()
{
    /*****************************************************************************/
    // TODO: Comment why I'm loading this images. Cache!
    // Get the divCredits
    var divCredits = document.getElementById('divCredits');
    
    for ( var i=0; i<10; i++ )
    {
        var img = document.createElement('img');
        img.id = 'id'+i;
        img.border = 0;
        img.src = 'pacman/credits/'+i+'.jpg';
        // Set the styles
        img.style.visibility = 'visible'; // TODO: Comment why I'm loading this images. Cache!
        divCredits.appendChild( img );
    }
    /*****************************************************************************/
    
    credit = new Credit();
    credit.SetTotalCoins( 0 ); // TODO:  Put the correct coins.
};



/***************************/
/* Credit object definition */
/***************************/
//
//
//
function Credit()
{
    this.divCredits = document.getElementById('divCredits');
    this.dummy = 0;
};

//
//
//
Credit.prototype.Clean =
    function ()
    {
        this.divCredits.innerHTML = ''; 
    };

//
//
//
Credit.prototype.AddNumber =
    function ( img )
    {
        this.divCredits.appendChild( img );
    };
    
//
//
//
Credit.prototype.LoadImageNumber =
    function ( number )
    {
        // Create an image
        var img = document.createElement('img');
        img.id = 'digit'+number;
        img.border = 0;
        img.src = 'pacman/credits/'+number+'.jpg';
        // Set the styles
        img.style.visibility = 'visible'; 
           
        return img;
    };
    
//
//
//
Credit.prototype.SetTotalCoins =
    function ( value )
    {
        // Clean the current score.
        this.Clean();
        
        // Conver the value to string
        var number = value.toString();
        // Loop over the number as a string
        var size = number.length;
        for ( var i=0; i<size; i++)
        {
            // take the the position i in the number string
            var digit = number.substr( i, 1 );
            
            // Add the image to the div score
            var img = this.LoadImageNumber( digit );
            this.AddNumber( img );
        }
    };

    