//*******************************************************************************
// Author: Harry Guillermo Mendoza
// Email: hguillermo@yahoo.com
// All copyrights are reserved
// Date: 08/22/2008
// Web site: http://www.harryguillermo.com
//*******************************************************************************
//
//
// Score definition 
//
//
var score;

//
//
//
function InitScore()
{
    /*****************************************************************************/
    // TODO: Comment why I'm loading this images. Cache!
    // Get the divScore1
    var divScore1 = document.getElementById('divScore1');
    
    for ( var i=0; i<10; i++ )
    {
        var img = document.createElement('img');
        img.id = 'id'+i;
        img.border = 0;
        img.src = 'pacman/score/'+i+'.jpg';
        // Set the styles
        img.style.visibility = 'visible'; // TODO: Comment why I'm loading this images. Cache!
        divScore1.appendChild( img );
    }
    /*****************************************************************************/

    score = new Score();
    score.SetTotalPoints( 0, 0 ); // TODO:  Put the correct high score. Read it from the database.
};



/***************************/
/* Score object definition */
/***************************/
//
//
//
function Score()
{
    this.divScore1      = document.getElementById('divScore1');
    this.divScore2      = document.getElementById('divScore2');
    this.divHighScore   = document.getElementById('divHighScore');
    this.dummy = 0;
    
    // This is to know what score update
    this.currentPlayer  = 0;
};


//
//
//
Score.prototype.CleanScore =
    function ( currentPlayer )
    {
        if ( currentPlayer==0 )
        {
            // Delete all the images inside the divScore1
            this.divScore1.innerHTML = '';
        }
        else if ( currentPlayer==1 )
        {
            // Delete all the images inside the divScore2
            this.divScore2.innerHTML = '';
        }
        else
        {
            alert('error');
        }
    };

//
//
//
Score.prototype.AddNumber =
    function ( currentPlayer, img )
    {
        if ( currentPlayer==0 )
        {
            this.divScore1.appendChild( img );
        }
        else if ( currentPlayer==1 )
        {
            this.divScore2.appendChild( img );
        }
    };
    
//
//
//
Score.prototype.CleanHighScore =
    function ()
    {
        // Delete all the images inside the divHighScore
        this.divHighScore.innerHTML = '';
    };
    
//
//
//
Score.prototype.LoadImageNumber =
    function ( number )
    {
        // Create an image
        var img = document.createElement('img');
        img.id = 'digit'+number;
        img.border = 0;
        img.src = 'pacman/score/'+number+'.jpg';
        // Set the styles
        img.style.visibility = 'visible'; 
           
        return img;
    };

//
//
//
Score.prototype.UpdateHighScore =
    function ()
    {
        var html = '';
        if ( this.currentPlayer==0 )
        {
            html = this.divScore1.innerHTML;
        }
        else if ( this.currentPlayer==1 )
        {
            html = this.divScore2.innerHTML;
        }
        
        this.divHighScore.innerHTML = html;
    };

//
//
//
Score.prototype.SetHighScore =
    function ( value )
    {
        // Clean the current score.
        this.CleanHighScore();

        // Conver the value to string
        var number = value.toString();
        // Loop over the number as a string
        var size = number.length;
        for ( var i=0; i<size; i++)
        {
            // take the the position i in the number string
            var digit = number.substr( i, 1 );
            
            // Add the image to the div high score
            var img = this.LoadImageNumber( digit );
            this.divHighScore.appendChild( img );
        }
    };
    
//
//
//
Score.prototype.SetTotalPoints =
    function ( value, maxValue )
    {
        // Clean the current score.
        this.CleanScore( this.currentPlayer );
        
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
            this.AddNumber( this.currentPlayer, img );
        }
        
        // Verify if we need to update the high score
        if ( value>=maxValue )
        {
            this.UpdateHighScore();
        }
    };

    