//*******************************************************************************
// Author: Harry Guillermo Mendoza
// Email: hguillermo@yahoo.com
// All copyrights are reserved
// Date: 08/22/2008
// Web site: http://www.harryguillermo.com
//*******************************************************************************
//
//
// Fruit definition 
//
//
var fruit;

//
//
//
function InitFruits()
{
    /*****************************************************************************/
    // TODO: Comment why I'm loading this images. Cache!
    // Get the divFruits
    var divFruits = document.getElementById('divFruits');
    
    for ( var i=0; i<6; i++ )
    {
        var img = document.createElement('img');
        img.id = 'id'+i;
        img.border = 0;
        img.src = 'pacman/fruits/'+i+'.png';
        // Set the styles
        img.style.visibility = 'visible'; // TODO: Comment why I'm loading this images. Cache!
        divFruits.appendChild( img );
    }
    /*****************************************************************************/
    
    fruit = new Fruit();
    fruit.ShowFruits( 1 ); // TODO:  Put the correct nom of lifes. REad it from the database.
}



/***************************/
/* Fruit object definition */
/***************************/
//
//
//
function Fruit()
{
    this.divFruits  = document.getElementById('divFruits');
    
    this.xScreen    = 400;
    this.yScreen    = 568;
}


//
//
//
Fruit.prototype.CleanFruits =
    function ()
    {
        // Delete all the images inside the divLifes2
        this.divFruits.innerHTML = '';
        
        // Move to the original position
        this.divFruits.style.left   = this.xScreen;
        this.divFruits.style.top    = this.yScreen;
        this.divFruits.style.width  = 32 + 'px'; // TODO: Parametrize this
        this.divFruits.style.height = 32 + 'px'; // TODO: Parametrize this
    }

//
//
//
Fruit.prototype.AddFruitImage =
    function ( img )
    {
        this.divFruits.appendChild( img );
    }
    
//
//
//
Fruit.prototype.LoadFruitImage =
    function ( value )
    {
        // Create an image
        var img = document.createElement('img');
        img.id = 'fruit';
        img.border = 0;
        img.src = 'pacman/fruits/'+value+'.png';
        // Set the styles
        img.style.visibility = 'visible'; 
           
        return img;
    };

//
//
//
Fruit.prototype.ShowFruits =
    function ( value )
    {
        // Clean the current score.
        this.CleanFruits();
        // Limit the fruits in the screen
        var fruit = (value % 6);
        if (fruit==0) fruit=6;
        // Show the fruits in the screen.
        for ( var i=fruit; i>0; i--)
        {
            // Add the image to the div score
            var img = this.LoadFruitImage( i );
            this.AddFruitImage( img );
            
            // Resize the divFruits
            var width = 32*fruit; // TODO: Parametrize this. Increase the width because there is one more image
            var left = this.xScreen - (32*(fruit-1)); // TODO: Parametrize this. Move the div to the left 32px.
            this.divFruits.style.width  = width + 'px'
            this.divFruits.style.left   = left + 'px'
        }
    };

    