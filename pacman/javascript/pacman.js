//*******************************************************************************
// Author: Harry Guillermo Mendoza
// Email: hguillermo@yahoo.com
// All copyrights are reserved
// Date: 08/22/2008
// Web site: http://www.harryguillermo.com
//*******************************************************************************
//
//
// Pacman definition 
//
//
var pacmans = [];

//
//
//
function InitPacmans()
{
    pacmans.push( new Pacman( 'pacman', 'yellow', 14, 23, 4 ) );
};
   
//
//
//
function Pacman( pacmanName, color, x, y, numLifes )
{
    // Tick acum before to update the pacman
    this.tickAcum = 0;
    
    // Move the ghost after this acum is reached
    this.pacmanTick = 120; /*125;*/
    
    // Set the number of lifes by default
    this.numLifes = numLifes;
    
    // Set the movements for the ghost in pixels
    this.xDeltaPacmanTick = 16;
    this.yDeltaPacmanTick = 16;
    
    // Set the Ghost name
    this.PacmanName = pacmanName;
    
    // Initial position in the maze
    this.iniX = x;
    this.iniY = y;
    
    // Actual Position in the maze
    this.x = x;
    this.y = y;
    
    // Current pacman direction 
    this.currentDir = 'left';
    
    // Boolean to now if the mouth is open or close
    this.isMouthOpen = true;

    // Set the start position in the screen
    this.SetStartPosition( this.x, this.y );
    /*this.xScreen = (x-1)*this.xDeltaPacmanTick; // (x-1)*16, 1 = 0
    this.yScreen = (y-1)*this.yDeltaPacmanTick; // (y-1)*16, 448; // (28)*/
    
    // Create the visual representation. 
    var div = document.createElement('div');
    div.id = this.PacmanName;
    div.style.position = 'absolute';
    div.style.width = 32;
    div.style.height = 32;
    div.style.top = this.yScreen + 'px';
    div.style.left = this.xScreen + 'px';
    div.style.border = 0;
    div.style.zIndex = 920;
    
    // Add the images for the movement in normal mode plus eatable mode. Here are 12 images
    this.arrImages       = [];
    this.arrDirection    = [ 'u', 'd', 'r', 'l' ];  // up, down, right and left
    this.arrState        = [ 'o', 'c' ];            // open or close
    for( var i=0; i<this.arrDirection.length; i++ )
    {
        for( var j=0; j<this.arrState.length; j++ )
        {
            var img = this.CreateImageElement( div, this.arrDirection[i], this.arrState[j] );
            this.arrImages.push( img );
        }
    }
    
    // Set the last image showed. It will be useful to simulate the legs movement
    this.lastImageShowed = this.arrImages[0];        

    // Add the Pacman to the maze
    ///document.body.appendChild( div );
    var divContent = document.getElementById( 'content' );
    divContent.appendChild( div );
    
    this.Pacman = div;
    //this.PacmanImg = img;
};


//  
//
//  
Pacman.prototype.CreateImageElement =
    function ( container, direction, state  )
    {
        // Set the source
        var source = 'pacman/pacman/pac_'+state+'_'+direction+'.gif';
    
        // Create an image
        var img = this.CreateImage( source );
        
        // Add the Pacman to the maze
        container.appendChild( img );
    
        return img;
    };

//
//
//
Pacman.prototype.CreateImage =
    function ( source )
    {
        // Create an image
        var img = document.createElement('img');
        img.border  = 0;
        img.src     = source;
        
        // Set the styles
        img.style.position  = 'absolute';
        img.style.width     = 32;
        img.style.height    = 32;
        img.style.top       = 0;
        img.style.left      = 0;
        
        // Set the visibility in false by default
        img.style.visibility = 'hidden';
        
        return img;    
    };
    
//
//
//
Pacman.prototype.SetTick =
    function ( value )
    {
        this.pacmanTick = value;
    };
    
//
//
//
Pacman.prototype.GetTick =
    function ()
    {
        return this.pacmanTick;
    };
    
//
//
//
Pacman.prototype.GetX =
    function ()
    {
        return this.x;
    };

//
//
//    
Pacman.prototype.GetY =
    function ()
    {
        return this.y;
    };

//
//
//    
Pacman.prototype.SetCurrentLifes =
    function ( value )
    {
        this.numLifes = value; // TODO: Parametrize this value
    };

//
//
//    
Pacman.prototype.UpdateCurrentLifes =
    function ( value )
    {
        this.numLifes += value;
    };

//
//
//    
Pacman.prototype.AddCurrentLifes =
    function ()
    {
        this.numLifes--;  // TODO: It loojs bad. Review this. I think the currentLifes is in the game class.
    };
    
//
//
//    
Pacman.prototype.GetCurrentLifes =
    function ()
    {
        return this.numLifes;
    };

//
//
//
Pacman.prototype.SetDefaultPosition =
    function ()
    {
        // Position in the screen
        this.xScreen = (this.iniX-1)*this.xDeltaPacmanTick + 16; // (x-1)*16, 1 = 0    // TODO: Fix the 16
        this.yScreen = (this.iniY-1)*this.yDeltaPacmanTick + 72; // (y-1)*16, 448; // (28)  // TODO: Fix the 16
        
        // Update the actual Position in the maze
        this.x = this.iniX;
        this.y = this.iniY;
        
        // Current pacman direction 
        this.currentDir = 'left';
    
        // Boolean to now if the mouth is open or close
        this.isMouthOpen = true;
        
        // Update the pacman visual representation in the maze
        this.Pacman.style.top = this.yScreen + 'px';
        this.Pacman.style.left= this.xScreen + 'px';
        
        var img = this.GetImageState( this.currentDir );
        img.style.visibility = 'visible';
        
        //var imgopen     = imageStates[0];
        //var imgclose    = imageStates[1];
        
        // Change the pacman image acoording to the direction and the mouth
        //this.PacmanImg.src = this.isMouthOpen ? imgopen: imgclose;
        //this.PacmanImg.src = img; TODO: Review this
    };

//
//
//
Pacman.prototype.SetStartPosition =
    function ( x, y )
    {
        // Position in the screen
        this.xScreen = (x-1)*this.xDeltaPacmanTick + 16; // (x-1)*16, 1 = 0   // TODO: Fix the 16
        this.yScreen = (y-1)*this.yDeltaPacmanTick + 72; // (y-1)*16, 448; // (28)  // TODO: Fix the 16

        // Update the actual Position in the maze
        this.x = x;
        this.y = y;
        
        // TODO: Fix this error. Pacman doesn't exists until the end of the constructor
        // Update the pacman visual representation in the maze
       // this.Pacman.style.top = this.yScreen;
       // this.Pacman.style.left= this.xScreen;
    };

//
//
//    
Pacman.prototype.Hide =
    function ()
    {
        this.Pacman.style.visibility = 'hidden';
        // TODO: Verify why if we hide the div the images are visible yet....???
        this.lastImageShowed.style.visibility = 'hidden';        
    };

//
//
//    
Pacman.prototype.Show =
    function ()
    {
        this.Pacman.style.visibility = 'visible';
    };

//
//
//
Pacman.prototype.Move =
    function ()
    {
        var dx = 0, dy = 0;
        var difx = this.xDeltaPacmanTick; 
        var dify = this.yDeltaPacmanTick;

        if ( this.x==0 && this.y==14 )
        {
            this.x = 27;
            this.y = 14;
            this.xScreen = (this.x-1)*this.xDeltaPacmanTick + 16; // TODO: Fix this 16
            this.yScreen = (this.y-1)*this.yDeltaPacmanTick + 72; // TODO: Fix this 16
        }
        else if ( this.x==27 && this.y==14 )
        {
            this.x = 0;
            this.y = 14;
            this.xScreen = (this.x-1)*this.xDeltaPacmanTick + 16; // TODO: Fix this 16
            this.yScreen = (this.y-1)*this.yDeltaPacmanTick + 72; // TODO: Fix this 16
        }
        else
        {
            switch ( this.currentDir )
            {
                case 'up':
                    dx = 0; dy = -1*dify;
                    break;
                case 'down':
                    dx = 0; dy = dify;
                    break;
                case 'left':
                    dx = -1*dify; dy = 0;
                    break;
                case 'right':
                    dx = dify; dy = 0;
                    break;
            }
            
            this.xScreen += dx;
            this.yScreen += dy;
        }
        
        // Update the pacman visual representation in the maze
        this.Pacman.style.top = this.yScreen + 'px';
        this.Pacman.style.left= this.xScreen + 'px';
        
        var img = this.GetImageState( this.currentDir );
        img.style.visibility = 'visible';
        //var imgopen     = imageStates[0];
        //var imgclose    = imageStates[1];
        
        // Change the pacman image acoording to the direction and the mouth
        //this.PacmanImg.src = this.isMouthOpen ? imgopen: imgclose;
        //this.PacmanImg.src = img;
        
        this.isMouthOpen = !this.isMouthOpen;
    };

//
//
//
Pacman.prototype.GetImageState = 
    function ( currentDir )
    {
        /*
        // Add the images for the movement in normal mode plus eatable mode. Here are 12 images
        this.arrImages       = [];
        this.arrDirection    = [ 'u', 'd', 'r', 'l' ];  // up, down, right and left
        this.arrState        = [ 'o', 'c' ];            // open or close
        */
        
        this.lastImageShowed.style.visibility = 'hidden';
        
        //var imgopen = '';
        //var imgclose = '';
        var currentImage = '';
        switch ( currentDir )
        {
            case 'up':
                //imgopen     = this.arrImages[0]; //'pacman/pacman/pac_o_u.png';
                //imgclose    = this.arrImages[1]; //'pacman/pacman/pac_c_u.png';
                currentImage = this.isMouthOpen ? this.arrImages[0]: this.arrImages[0+1];
                break;
            case 'down':
                //imgopen     = this.arrImages[2]; //'pacman/pacman/pac_o_d.png';
                //imgclose    = this.arrImages[3]; //'pacman/pacman/pac_c_d.png';
                currentImage = this.isMouthOpen ? this.arrImages[2]: this.arrImages[2+1];
                break;
            case 'right':
                //imgopen     = this.arrImages[4]; //'pacman/pacman/pac_o_r.png';
                //imgclose    = this.arrImages[5]; //'pacman/pacman/pac_c_r.png';
                currentImage = this.isMouthOpen ? this.arrImages[4]: this.arrImages[4+1];
                break;
            case 'left':
                //imgopen     = this.arrImages[6]; //'pacman/pacman/pac_o_l.png';
                //imgclose    = this.arrImages[7]; //'pacman/pacman/pac_c_l.png';
                currentImage = this.isMouthOpen ? this.arrImages[6]: this.arrImages[6+1];
                break;
        }

        // Update the last image showed
        this.lastImageShowed = currentImage;
        
        // Return the images
        //return [imgopen, imgclose];
        return currentImage;
    };

//
//
//
Pacman.prototype.Update = 
    function ( tick )
    {
        this.tickAcum += tick;
        if ( this.tickAcum<this.pacmanTick ) return;
        this.tickAcum = 0;
    
        // Can the pacman move?
        var nextStep = '';
        var newX = 0;
        var newY = 0;
        var x = this.x;
        var y = this.y;
        
        // Update the currect direction
        var tempCurrent = this.currentDir;
        this.currentDir = input.GetLastKeyPressed(); //lastKeyPressed; // TODOGlobal variable. It is the last key pressed
        
        switch ( this.currentDir )
        {
            case 'up':
                nextStep = mazze[y-1][x]; // Correct pos in x, y coords [x][y-1]
                newX = x; newY = y-1;
                break;
            case 'down':
                nextStep = mazze[y+1][x]; // Correct pos in x, y coords [x][y+1]
                newX = x; newY = y+1;
                break;
            case 'left':
                nextStep = mazze[y][x-1]; // Correct pos in x, y coords [x-1][y]
                newX = x-1; newY = y;
                break;
            case 'right':
                nextStep = mazze[y][x+1]; // Correct pos in x, y coords [x+1][y]
                newX = x+1; newY = y;
                break;
        }
    
        // If the Pacman can go to the next step do this.
        if ( nextStep=='..')
        {
            this.x = newX;
            this.y = newY;
            
            this.Move();
        }
        else 
        {
            // Restore the current direction.
            this.currentDir = tempCurrent;
            
            // Try the move the pacman in the current direction
            switch ( this.currentDir )
            {
                case 'up':
                    nextStep = mazze[y-1][x]; // Correct pos in x, y coords [x][y-1]
                    newX = x; newY = y-1;
                    break;
                case 'down':
                    nextStep = mazze[y+1][x]; // Correct pos in x, y coords [x][y+1]
                    newX = x; newY = y+1;
                    break;
                case 'left':
                    nextStep = mazze[y][x-1]; // Correct pos in x, y coords [x-1][y]
                    newX = x-1; newY = y;
                    break;
                case 'right':
                    nextStep = mazze[y][x+1]; // Correct pos in x, y coords [x+1][y]
                    newX = x+1; newY = y;
                    break;
            }
            if ( nextStep=='..')
            {
                this.x = newX;
                this.y = newY;
            
                this.Move();
            }
            
            return;
        }
    };
