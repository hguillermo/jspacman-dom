//*******************************************************************************
// Author: Harry Guillermo Mendoza
// Email: hguillermo@yahoo.com
// All copyrights are reserved
// Date: 08/22/2008
// Web site: http://www.harryguillermo.com
//*******************************************************************************
//
//
// Food definition 
//
//
var food;
var foodMaze = [];
var foodCurrent = [];

//
//
//
function GetMazeFood()
{
    var array =  
    [
        ['XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX'],
        ['XX','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','XX','XX','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','XX'],
        ['XX','oo','XX','XX','XX','XX','oo','XX','XX','XX','XX','XX','oo','XX','XX','oo','XX','XX','XX','XX','XX','oo','XX','XX','XX','XX','oo','XX'],
        ['XX','OO','XX','XX','XX','XX','oo','XX','XX','XX','XX','XX','oo','XX','XX','oo','XX','XX','XX','XX','XX','oo','XX','XX','XX','XX','OO','XX'],
        ['XX','oo','XX','XX','XX','XX','oo','XX','XX','XX','XX','XX','oo','XX','XX','oo','XX','XX','XX','XX','XX','oo','XX','XX','XX','XX','oo','XX'],
        ['XX','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','XX'],
        ['XX','oo','XX','XX','XX','XX','oo','XX','XX','oo','XX','XX','XX','XX','XX','XX','XX','XX','oo','XX','XX','oo','XX','XX','XX','XX','oo','XX'],
        ['XX','oo','XX','XX','XX','XX','oo','XX','XX','oo','XX','XX','XX','XX','XX','XX','XX','XX','oo','XX','XX','oo','XX','XX','XX','XX','oo','XX'],
        ['XX','oo','oo','oo','oo','oo','oo','XX','XX','oo','oo','oo','oo','XX','XX','oo','oo','oo','oo','XX','XX','oo','oo','oo','oo','oo','oo','XX'],
        ['XX','XX','XX','XX','XX','XX','oo','XX','XX','XX','XX','XX','  ','XX','XX','  ','XX','XX','XX','XX','XX','oo','XX','XX','XX','XX','XX','XX'],
        ['XX','XX','XX','XX','XX','XX','oo','XX','XX','XX','XX','XX','  ','XX','XX','  ','XX','XX','XX','XX','XX','oo','XX','XX','XX','XX','XX','XX'],
        ['XX','XX','XX','XX','XX','XX','oo','XX','XX','  ','  ','  ','  ','  ','  ','  ','  ','  ','  ','XX','XX','oo','XX','XX','XX','XX','XX','XX'],
        ['XX','XX','XX','XX','XX','XX','oo','XX','XX','  ','XX','XX','XX','XX','XX','XX','XX','XX','  ','XX','XX','oo','XX','XX','XX','XX','XX','XX'],
        ['XX','XX','XX','XX','XX','XX','oo','XX','XX','  ','XX','XX','XX','XX','XX','XX','XX','XX','  ','XX','XX','oo','XX','XX','XX','XX','XX','XX'],
        ['XX','  ','  ','  ','  ','  ','oo','  ','  ','  ','XX','XX','XX','XX','XX','XX','XX','XX','  ','  ','  ','oo','  ','  ','  ','  ','  ','XX'],
        ['XX','XX','XX','XX','XX','XX','oo','XX','XX','  ','XX','XX','XX','XX','XX','XX','XX','XX','  ','XX','XX','oo','XX','XX','XX','XX','XX','XX'],
        ['XX','XX','XX','XX','XX','XX','oo','XX','XX','  ','XX','XX','XX','XX','XX','XX','XX','XX','  ','XX','XX','oo','XX','XX','XX','XX','XX','XX'],
        ['XX','XX','XX','XX','XX','XX','oo','XX','XX','  ','  ','  ','  ','  ','  ','  ','  ','  ','  ','XX','XX','oo','XX','XX','XX','XX','XX','XX'],
        ['XX','XX','XX','XX','XX','XX','oo','XX','XX','  ','XX','XX','XX','XX','XX','XX','XX','XX','  ','XX','XX','oo','XX','XX','XX','XX','XX','XX'],
        ['XX','XX','XX','XX','XX','XX','oo','XX','XX','  ','XX','XX','XX','XX','XX','XX','XX','XX','  ','XX','XX','oo','XX','XX','XX','XX','XX','XX'],
        ['XX','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','XX','XX','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','XX'],
        ['XX','oo','XX','XX','XX','XX','oo','XX','XX','XX','XX','XX','oo','XX','XX','oo','XX','XX','XX','XX','XX','oo','XX','XX','XX','XX','oo','XX'],
        ['XX','oo','XX','XX','XX','XX','oo','XX','XX','XX','XX','XX','oo','XX','XX','oo','XX','XX','XX','XX','XX','oo','XX','XX','XX','XX','oo','XX'],
        ['XX','OO','oo','oo','XX','XX','oo','oo','oo','oo','oo','oo','oo','  ','  ','oo','oo','oo','oo','oo','oo','oo','XX','XX','oo','oo','OO','XX'],
        ['XX','XX','XX','oo','XX','XX','oo','XX','XX','oo','XX','XX','XX','XX','XX','XX','XX','XX','oo','XX','XX','oo','XX','XX','oo','XX','XX','XX'],
        ['XX','XX','XX','oo','XX','XX','oo','XX','XX','oo','XX','XX','XX','XX','XX','XX','XX','XX','oo','XX','XX','oo','XX','XX','oo','XX','XX','XX'],
        ['XX','oo','oo','oo','oo','oo','oo','XX','XX','oo','oo','oo','oo','XX','XX','oo','oo','oo','oo','XX','XX','oo','oo','oo','oo','oo','oo','XX'],
        ['XX','oo','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','oo','XX','XX','oo','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','oo','XX'],
        ['XX','oo','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','oo','XX','XX','oo','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','oo','XX'],
        ['XX','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','oo','XX'],
        ['XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX','XX']
    ];
    
    return array;
}

//
//
//
function InitFood()
{
    foodCurrent = GetMazeFood();
    foodMaze    = GetMazeFood();
    
    /*
<img src="pacman/dot.gif" style="position:absolute; top:16px; left:16px;"/>
<img src="pacman/dot.gif" style="position:absolute; top:16px; left:32px;"/>
<img src="pacman/dot.gif" style="position:absolute; top:16px; left:48px;"/>

<img src="pacman/dot.gif" style="position:absolute; top:32px; left:16px;"/>
<img src="pacman/dot.gif" style="position:absolute; top:32px; left:32px;"/>
<img src="pacman/dot.gif" style="position:absolute; top:32px; left:48px;"/>
    */
    
    // Get the foodMaze div
    var divFood = document.getElementById('divFood');
            
    // Populate the mazze with the food
    var lenghtx     = foodMaze[0].length;
    var lenghty     = foodMaze.length;
    var totalDots   = 0;
    var bigDots     = [];
    // Boolean to now if the big dot is visible or not
    this.bigDotHide = false;
    
    for (var i=0; i<lenghty; i++)
    {
        for (var j=0; j<lenghtx; j++)
        {
            if ( foodMaze[i][j]=='oo' )
            {
                var mNewObj = document.createElement('img');
                mNewObj.id = 'food_'+ i +'_'+ j;
                mNewObj.border = 0;
                mNewObj.src = 'pacman/food/dot.gif';
                mNewObj.style.position = 'absolute';
                var posx = (16 * (i))-1 + 72; // TODO: Fix the 16
                var posy = (16 * (j))-1 + 16; // TODO: Fix the 16
                mNewObj.style.top = posx + 'px';
                mNewObj.style.left = posy + 'px';

                divFood.appendChild(mNewObj);
                
                // Increment the total dots
                totalDots++;
            }
            else if ( foodMaze[i][j]=='OO' )
            {
                var mNewObj = document.createElement('img');
                mNewObj.id = 'food_'+ i +'_'+ j;
                mNewObj.border = 0;
                mNewObj.src = 'pacman/food/dotbig.gif';
                mNewObj.style.position = 'absolute';
                var posx = (16 * (i)) - 8 + 72;  // TODO: Fix the 16
                var posy = (16 * (j)) - 8 + 16; // TODO: Fix the 16
                mNewObj.style.top = posx + 'px';
                mNewObj.style.left = posy + 'px';

                divFood.appendChild(mNewObj);
                
                // Increment the total dots
                totalDots++;
                
                // Add the image and the position to the big dot array
                bigDots.push( {img:mNewObj, x:i, y:j} );
            }
        }
    }

    // Create the food object
    food = new Food( totalDots );
    food.SetBigDots( bigDots );
}



/***************************/
/* Food object definition */
/***************************/
//
//
//
function Food( totalDots )
{
    // Tick acum before to update the big dots blink
    this.tickAcum = 0;
        
    this.totalDots  = totalDots;
    // The same at the beginnig. It will be totalDots when the pacman eat all the dots.
    this.actualDots = 0;
    
    // Array the big dots images
    this.bigDots = [];
}

//
//
//
Food.prototype.GetBigDots =
    function ()
    {
        return this.bigDots;
    };

//
//
//
Food.prototype.SetBigDots =
    function ( value )
    {
        this.bigDots = value;
    };
    
//
//
//
Food.prototype.GetActualDots =
    function ()
    {
        return this.actualDots;
    };

//
//
//
Food.prototype.SetActualDots =
    function ( value )
    {
        this.actualDots = value;
    };
    
//
//
//
Food.prototype.SetTotalDots =
    function ( value )
    {
        this.totalDots = value;
    };

//
//
//
Food.prototype.GetTotalDots =
    function ()
    {
        return this.totalDots;
    };
    
//
//
//
Food.prototype.RemoveDot =
    function (  x, y )
    {
        var id = 'food_'+ y + '_' + x;
        var biscuit = document.getElementById( id );
        biscuit.style.visibility = 'hidden';
        
        //Remove the food from the matrix
        foodMaze[y][x]='';    
        
        // Update the actual dots
        this.actualDots++;
    };

//
//
//
Food.prototype.Refresh =
    function () 
    {
        // Populate the mazze with the food
        foodMaze        = GetMazeFood(); // TODO: put this inside the Food class
        var lenghtx     = foodMaze[0].length;
        var lenghty     = foodMaze.length;
        var totalDots   = 0;
        
        
        for (var i=0; i<lenghty; i++)
        {
            for (var j=0; j<lenghtx; j++)
            {
                if ( foodMaze[i][j]=='oo' || foodMaze[i][j]=='OO' )
                {
                    var id = 'food_'+ i + '_' + j;
                    var biscuit = document.getElementById( id );
                    biscuit.style.visibility = 'visible';
                    
                    totalDots++;
                }
            }
        }
        
        // Set the totaldots
        this.SetTotalDots( totalDots );
    }


//
//
//
Food.prototype.Update =
    function ( tick ) 
    {
        // Update the time transcurred
        this.tickAcum += tick;
        if ( this.tickAcum>=150 ) // TODO: Parametrize this
        {
            // Show or hide the big dots
            var bigDots = this.GetBigDots();
            for ( var i=0; i<bigDots.length; i++ )
            {
                var visible = ( this.bigDotHide ) ? 'visible': 'hidden';
                var image   = bigDots[i].img; //alert(bigDots[i].img)
                var x = bigDots[i].x; //alert(x)
                var y = bigDots[i].y; //alert(y)
                
                if ( foodMaze[x][y]=='OO')
                    image.style.visibility = visible;
            }
            this.bigDotHide = !this.bigDotHide;
            this.tickAcum = 0;
        }
        
        
    
        // TODO. Complete this to be more generic to multiplayer
        var x = pacmans[0].GetX();
        var y = pacmans[0].GetY();

        var posx = x;
        var posy = y;
        var biscuit = foodMaze[y][x];
        
        var isBiscuit = biscuit=='oo' ? true: false;
        var isBigBiscuit = biscuit=='OO' ? true: false;
        
        if ( isBiscuit || isBigBiscuit )
        {
            if ( isBiscuit )
            {
                soundPlayer.Play( 'eatBiscuit' );
                game.UpdateScore( 10 ); // TODO: Parametrize this
            }
            
            if ( isBigBiscuit )
            {
                // TODO: Sounds, change the monsters
                soundPlayer.Play( 'bigDotEaten' );
                
                game.UpdateScore( 50 ); // TODO: Parametrize this
                
                // Change the monsters and set it like eatables.
                game.SetTheGhostEatables( true );
                
                // Reset the multilplier. This is to control the 200, 400, 800 and 1600 points
                game.ResetMultiplier();
                
                // Change the monsters and set it like eatables to false.
                // TODO: If the pacmna ear another big dot there must be a way to increase the time to
                // convert the ghost like eatables for another 8 secs or whatever
                ///////setTimeout( 'game.SetTheGhostEatables( false )', 8800+200 );
                //game()
            }

            this.RemoveDot( posx, posy );
        }
    }
    