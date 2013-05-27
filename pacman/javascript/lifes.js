//*******************************************************************************
// Author: Harry Guillermo Mendoza
// Email: hguillermo@yahoo.com
// All copyrights are reserved
// Date: 08/22/2008
// Web site: http://www.harryguillermo.com
//*******************************************************************************
//
//
// Life definition 
//
//
var life;

//
//
//
function InitLifes()
{
    /*****************************************************************************/
    // TODO: Comment why I'm loading this images. Cache!
    // Get the divLifes1
//    var divLifes1 = document.getElementById('divLifes1');
//    
//    for ( var i=0; i<3; i++ )
//    {
//        var img = document.createElement('img');
//        img.id = 'id'+i;
//        img.border = 0;
//        img.src = 'pacman/lifes/pacman.gif';
//        // Set the styles
//        img.style.visibility = 'visible'; // TODO: Comment why I'm loading this images. Cache!
//        divLifes1.appendChild( img );
//    }
    /*****************************************************************************/
    
    life = new Life();
    life.ShowLifes( 3 ); // TODO:  Put the correct nom of lifes. REad it from the database. LIFES
}



/***************************/
/* Life object definition */
/***************************/
//
//
//
function Life()
{
    this.divLifes1      = document.getElementById('divLifes1');
    this.divLifes2      = document.getElementById('divLifes2');
    
    // This is to know what score update
    this.currentPlayer  = 0;
}


//
//
//
Life.prototype.CleanLifes =
    function ( currentPlayer )
    {
        if ( currentPlayer==0 )
        {
            // Delete all the images inside the divLifes1
            this.divLifes1.innerHTML = '';
        }
        else if ( currentPlayer==1 )
        {
            // Delete all the images inside the divLifes2
            this.divLifes2.innerHTML = '';
        }
        else
        {
            alert('error');
        }
    }

//
//
//
Life.prototype.AddPacmanImage =
    function ( currentPlayer, img )
    {
        if ( currentPlayer==0 )
        {
            this.divLifes1.appendChild( img );
        }
        else if ( currentPlayer==1 )
        {
            this.divLifes2.appendChild( img );
        }
    }
    
//
//
//
Life.prototype.LoadPacmanImage =
    function ()
    {
        // Create an image
        var img = document.createElement('img');
        img.id = 'pacman';
        img.border = 0;
        img.src = 'pacman/lifes/pacman.gif';
        // Set the styles
        img.style.visibility = 'visible'; 
           
        return img;
    };

//
//
//
Life.prototype.ShowLifes =
    function ( value )
    {
        // Clean the current score.
        this.CleanLifes( this.currentPlayer );
        
        // Conver the value to string
        var number = value.toString();
        // Create pacman according to the value. Always value-1. The current life is the maze.
        for ( var i=0; i<(value/*-1*/); i++)
        {
            // Add the image to the div score
            var img = this.LoadPacmanImage();
            this.AddPacmanImage( this.currentPlayer, img );
        }
    };

    