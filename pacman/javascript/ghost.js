//*******************************************************************************
// Author: Harry Guillermo Mendoza
// Email: hguillermo@yahoo.com
// All copyrights are reserved
// Date: 08/22/2008
// Web site: http://www.harryguillermo.com
//*******************************************************************************
//
//
// Ghost definitions 
//
//
var ghosts = [];

//
//
//
function InitGhosts()
{
    /*
    ghosts.push( new Ghost( 'ghost1', 'red', 1, 29 ) );
    ghosts.push( new Ghost( 'ghost2', 'orange', 26, 29 ) );
    ghosts.push( new Ghost( 'ghost3', 'blue', 1, 8 ) );
    ghosts.push( new Ghost( 'ghost4', 'pink', 26, 8 ) );
    */
    ghosts.push( new Ghost( 'ghost1', 'red', 11, 15, true ) );    // In the cave 
    ghosts.push( new Ghost( 'ghost2', 'orange', 13, 15, true ) );   // In the cave
    ghosts.push( new Ghost( 'ghost3', 'blue', 15, 15, true ) );     // In the cave
    ghosts.push( new Ghost( 'ghost4', 'pink', 12, 11, false ) );    // Not in the cave
    
    // Set the monsters to wait before to get out of the cave
    ghosts[0].SetWaitToGetOutCave( true );  // Wait to get out
    ghosts[0].SetHitsBeforeGetOut( 10 );
    
    ghosts[1].SetWaitToGetOutCave( false ); // This monster is going to get out of the cave
    
    ghosts[2].SetWaitToGetOutCave( true );  // Wait to get out
    ghosts[2].SetHitsBeforeGetOut( 20 );
    
    ghosts[3].SetWaitToGetOutCave( false ); // This monster is outside the cave
}

//
//
//
function Ghost( ghostName, color, x, y, isInTheCave )
{
    // Initialize the members for the ghost
    this.Initialize( ghostName, color, x, y, isInTheCave )
}

//
//
//
Ghost.prototype.Initialize =
    function ( ghostName, color, x, y, isInTheCave )
    {
        // Tick acum before to update the ghost
        this.tickAcum = 0;
        
        // Tick acum before to change to eatable from blue to white
        this.tickAcumEatable = 0;
        
        // Move the ghost after this acum is reached
        this.ghostTick = 120; // 125
        
        // Move the ghost after this acum is reached when the ghost is in eye mode
        this.ghostEyeTick = 60; // 50: So fast, Slow 125. TODO: Parametrize this. More levels faster
        
        // Set the movements for the ghost in pixels
        this.xDeltaGhostTick = 16;
        this.yDeltaGhostTick = 16;
        
        // Position to return in the cave
        this.xReturnCave = 13; // Outside to the cave. The door
        this.yReturnCave = 11; // Outside to the cave. The door
        this.xReturnInsideCave = 13;
        this.yReturnInsideCave = 14;
        this.xIniInsideCave = 13;
        this.yIniInsideCave = 15;
        
        // Color of the ghost
        this.color = color;
        
        // Set the Ghost name
        this.GhostName = ghostName;
        
        // Boolean to now if the ghost is in the cave
        this.isInTheCave = isInTheCave;
        
        // Boolean to now if the ghost is in door of the cave
        this.inDoorOfCave = false;

        // Boolean to tell the ghost to wait in cave before exit
        this.waitToGetOutCave = false;
        this.hitsBeforeGetOut = 0;
        this.currentHits = 0;
        
        // Boolean to know if the ghost just start to going out from the cave
        this.isGoingUpOutside = false;

        // Initial position in the maze
        this.iniX = x;
        this.iniY = y;

        // Actual position in the maze
        this.x = x;
        this.y = y;
        
        // Position in the screen
        this.xScreen = (x-1)*16 + 16; // 1 = 0 // TODO: Fix this 16
        this.yScreen = (y-1)*16 + 72; // 448; // (28) // TODO: Fix this 16
        
        // Current ghost direction 
        this.currentDirGhost = 'up';

        // Boolean to now if the legs are open or close
        this.areLegOpen = true;
        
        // Boolean to now if the ghost can be eaten
        this.canBeEaten = false;
        
        // Boolean to now if the ghost is in eye mode. In this state the ghost will go home.
        this.isInEyeMode = false;
        
        // Current image number. This is to blink the ghost in the eaten mode. White to blue and so on...
        this.currentImageNumber = 0;
        
        // Create the visual representation. 
        var div = document.createElement('div');
        div.id = this.GhostName;
        div.style.position  = 'absolute';
        div.style.width     = 32;
        div.style.height    = 32;
        div.style.top       = this.yScreen;
        div.style.left      = this.xScreen;
        div.style.border    = 0;
        div.style.zIndex    = 930; // or 999 it was in the original. 930 was working

        // Add the images for the movement in normal mode plus eatable mode. Here are 12 images
        this.arrImages       = [];
        this.arrDirection    = [ 'u', 'd', 'r', 'l', 'eaten', 'eatentrans' ];
        this.arrState        = [ '0', '1' ];
        for( var i=0; i<this.arrDirection.length; i++ )
        {
            for( var j=0; j<this.arrState.length; j++ )
            {
                var img = this.CreateImageElement( div, color, this.arrDirection[i], this.arrState[j] );
                this.arrImages.push( img );
            }
        }
        
        // Add the images for the movement in eye mode. Here are 12 images + 4 images 
        this.arrDirection    = ['u', 'd', 'r', 'l']
        for( var i=0; i<this.arrDirection.length; i++ )
        {
            var img = this.CreateImageElement( div, 'eyes', this.arrDirection[i], '0' );
            this.arrImages.push( img );
        }
        
        // Add the 200, 400, 800 and 1600 images
        var img200 = this.CreateImage( 'pacman/ghosts/200.gif' );
        var img400 = this.CreateImage( 'pacman/ghosts/400.gif' );
        var img800 = this.CreateImage( 'pacman/ghosts/800.gif' );
        var img1600 = this.CreateImage( 'pacman/ghosts/1600.gif' );
        div.appendChild( img200 );
        div.appendChild( img400 );
        div.appendChild( img800 );
        div.appendChild( img1600 );
        this.arrImages.push( img200 );  // this.arrImages[16]
        this.arrImages.push( img400 );  // this.arrImages[17]
        this.arrImages.push( img800 );  // this.arrImages[18]
        this.arrImages.push( img1600 ); // this.arrImages[19]
        
        // Set the last image showed. It will be useful to simulate the legs movement
        this.lastImageShowed = this.arrImages[0];
        
        // Add the Ghost images to the document
        //document.body.appendChild( div );
        var divContent = document.getElementById( 'content' );
        divContent.appendChild( div );
        
        this.Ghost = div;    
        
        // Set the start position in the screen
        this.SetDefaultPosition();
        
        // Boolean to test: TODO Remove this
        this.bestDirection = false; 
    }

//
//
//
Ghost.prototype.SetTick =
    function ( value )
    {
        this.ghostTick = value;
    }
    
//
//
//
Ghost.prototype.GetTick =
    function ()
    {
        return this.ghostTick;
    }
    
//  
//
//  
Ghost.prototype.CreateImageElement =
    function ( container, color, direction, state  )
    {
        // Set the source
        var source = '';
        if ( direction=='eaten' || direction=='eatentrans' )
            source = 'pacman/ghosts/ghost_'+direction+'_'+state+'.gif';
        else //( direction!='eaten' )
            source = 'pacman/ghosts/ghost_'+color+'_'+direction+'_'+state+'.gif';
    
        // Create an image
        var img = this.CreateImage( source );
        
        // Add the Ghost to the maze
        container.appendChild( img );
    
        return img;
    }

//
//
//
Ghost.prototype.CreateImage =
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
    }

//
//
//
Ghost.prototype.SetDefaultPosition =
    function ()
    {
        // Position in the screen
        this.xScreen = (this.iniX-1)*this.xDeltaGhostTick + 16; // (x-1)*16, 1 = 0 // TODO: Fix this 16
        this.yScreen = (this.iniY-1)*this.yDeltaGhostTick + 72; // (y-1)*16, 448; // (28) // TODO: Fix this 16
        
        // Update the actual Position in the maze
        this.x = this.iniX;
        this.y = this.iniY;
        
        // Current pacman direction 
        this.currentDirGhost = 'up';
    
        // Boolean to now if the legs are open or close
        this.areLegOpen = true;
        
        // Get the ghost image to show and show it
        var img = this.GetImageState( this.currentDirGhost ); 
        img.style.visibility = 'visible';
        
        // Update the ghost visual representation in the maze
        this.Ghost.style.top = this.yScreen + 'px';
        this.Ghost.style.left= this.xScreen + 'px';
    }

//
//
//
Ghost.prototype.SetStartPosition =
    function ( x, y )
    {
        // Position in the screen
        this.xScreen = (x-1)*this.xDeltaGhostTick; // (x-1)*16, 1 = 0
        this.yScreen = (y-1)*this.yDeltaGhostTick; // (y-1)*16, 448; // (28)
        
        // Update the actual Position in the maze
        this.x = x;
        this.y = y;
        
        // Current pacman direction 
        this.currentDirGhost = 'up'
    
         // Boolean to now if the legs are open or close
        this.areLegOpen = true;
        
        // Get the ghost image to show and show it
        var img = this.GetImageState( this.currentDirGhost ); 
        img.style.visibility = 'visible';
        
        // Update the ghost visual representation in the maze
        this.Ghost.style.top = this.yScreen + 'px';
        this.Ghost.style.left= this.xScreen + 'px';
    }

//
//
//    
Ghost.prototype.Hide =
    function ()
    {
        this.Ghost.style.visibility = 'hidden';
        // TODO: Verify why if we hide the div the images are visible yet....???
        this.lastImageShowed.style.visibility = 'hidden';
    }

//
//
//    
Ghost.prototype.Show =
    function ()
    {
        this.Ghost.style.visibility = 'visible';
    }

//
//
//    
Ghost.prototype.SetInPointMode =
    function ( value )
    {
        this.lastImageShowed.style.visibility = 'hidden';
        
        /*
        this.arrImages.push( img200 );  // this.arrImages[16]
        this.arrImages.push( img400 );  // this.arrImages[17]
        this.arrImages.push( img800 );  // this.arrImages[18]
        this.arrImages.push( img1600 ); // this.arrImages[19]
        */
        var currentImage;
        if ( value==200 )
        {    
            currentImage = this.arrImages[16];
            //alert(200)
        }
        else if ( value==400 )
        {    
            currentImage = this.arrImages[17];
            //alert(400)
        }
        else if ( value==800 )
        {    
            currentImage = this.arrImages[18];
            //alert(800)
        }
        else if ( value==1600 )
        {    
            currentImage = this.arrImages[19];
            //alert(1600)
        }

        // Get the ghost image to show and show it
        var img = currentImage; // TODO: Put this line inside this method-->this.GetImageState( this.currentDirGhost ); 
        img.style.visibility = 'visible';
        
        this.lastImageShowed = currentImage;
    }
    
//
//
//    
Ghost.prototype.SetInEyeMode =
    function ( value )
    {
        this.isInEyeMode = value;
        // Get the ghost image to show and show it
        var img = this.GetImageState( this.currentDirGhost ); 
        img.style.visibility = 'visible';
    }

//
//
//    
Ghost.prototype.IsInEyeMode =
    function ()
    {
        return this.isInEyeMode;
    }

//
//
//    
Ghost.prototype.SetCanBeEaten =
    function ( value )
    {
        // Boolean to now if the ghost can be eaten
        this.canBeEaten = value;
        // Current image number. This is to blink the ghost in the eaten mode. White to blue and so on...        
        this.currentImageNumber = 0;        
    }

//
//
//    
Ghost.prototype.CanBeEaten =
    function ()
    {
        // Boolean to now if the ghost can be eaten
        return this.canBeEaten;
    }

//
//
//    
Ghost.prototype.SetIsInTheCave =
    function ( value )
    {
        // Boolean to now if the ghost is in the cave
        this.isInTheCave = value;
    }

//
//
//    
Ghost.prototype.IsInTheCave =
    function ()
    {
        // Boolean to now if the ghost is in the cave
        return this.isInTheCave;
    }

//
//
//    
Ghost.prototype.SetWaitToGetOutCave =
    function ( value )
    {
        // Boolean to now if the ghost is in the cave
        this.waitToGetOutCave = value;
    }

//
//
//    
Ghost.prototype.WaitToGetOutCave =
    function ()
    {
        // Boolean to now if the ghost is in the cave
        return this.waitToGetOutCave;
    }

//
//
//    
Ghost.prototype.GetHitsBeforeGetOut =
    function ( value )
    {
        // Number of hits to the wall up and down before to get ot to the cave
        return this.hitsBeforeGetOut;
    }
//
//
//    
Ghost.prototype.SetHitsBeforeGetOut =
    function ( value )
    {
        // Boolean to now if the ghost is in the cave
        this.hitsBeforeGetOut = value;
    }

//
//
//    
Ghost.prototype.ResetCurrentHits =
    function ()
    {
        // Boolean to now if the ghost is in the cave
        this.currentHits = 0;
    }

//
//
//    
Ghost.prototype.ResetTickAcumEatable =
    function ()
    {
        // Boolean to now if the ghost is in the cave
        this.tickAcumEatable = 0;
    }


//
//
//    
Ghost.prototype.SetInDoorOfCave =
    function ( value )
    {
        // Boolean to now if the ghost is in the cave
        this.inDoorOfCave = value;
    }

//
//
//    
Ghost.prototype.InDoorOfCave =
    function ()
    {
        // Boolean to now if the ghost is in the cave
        return this.inDoorOfCave;
    }


//
//
//
Ghost.prototype.Move =
    function ()
    {
        var dx = 0, dy = 0;
        var difx = this.xDeltaGhostTick; 
        var dify = this.yDeltaGhostTick;
        
        if ( this.x==0 && this.y==14 )
        {
            this.x = 27;
            this.y = 14;
            this.xScreen = (this.x-1)*this.xDeltaGhostTick + 16; // TODO: Fix this 16
            this.yScreen = (this.y-1)*this.yDeltaGhostTick + 72; // TODO: Fix this 16
        }
        else if ( this.x==27 && this.y==14 )
        {
            this.x = 0;
            this.y = 14;
            this.xScreen = (this.x-1)*this.xDeltaGhostTick + 16; // TODO: Fix this 16
            this.yScreen = (this.y-1)*this.yDeltaGhostTick + 72; // TODO: Fix this 16
        }
        else
        {
            switch ( this.currentDirGhost )
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

            this.xScreen += dx; //TODO: Ori was this.xScreen += dx;
            this.yScreen += dy; //TODO: Ori was this.yScreen += dy;
        }
    
        // Get the ghost image to show and show it
        this.ChangeLegsState( this.currentDirGhost );
        
        // Update the ghost visual representation in the maze
        this.Ghost.style.top = this.yScreen + 'px'; // TODO: Fix this 16. this with the positio of the origin of the maze
        this.Ghost.style.left= this.xScreen + 'px'; // TODO: Fix this 16. with the positio of the origin of the maze
    };

//
//
//
Ghost.prototype.ChangeLegsState = 
    function ( currentDir )
    {
        // Get the ghost image to show and show it
        var img = this.GetImageState( this.currentDirGhost ); 
        img.style.visibility = 'visible';
        
        // Change the leg state
        this.areLegOpen = !this.areLegOpen;
    }

//
//
//
Ghost.prototype.GetImageState = 
    function ( currentDir )
    {
        this.lastImageShowed.style.visibility = 'hidden';
        
        // The current image will be accordind to the direction and if the ghost can be eaten
        var currentImage = '';
        
        // Verify if the ghost can be eaten
        if ( this.CanBeEaten() && !this.IsInEyeMode() )
        {
            // Set the image for the ghost in the eaten state
            if ( this.tickAcumEatable>=5000 ) // TODO: Change this to read from a variable
            {
                if ( this.currentImageNumber==0 || this.currentImageNumber==12) // TODO: Parametrize this.
                    this.currentImageNumber = 8;
                //currentImage = this.areLegOpen ? this.arrImages[8]: this.arrImages[8+1];
                currentImage = this.arrImages[this.currentImageNumber++];
                
            }
            else
                currentImage = this.areLegOpen ? this.arrImages[8]: this.arrImages[8+1];
        }
        else if ( this.IsInEyeMode() )
        {
            switch ( currentDir )
            {
                case 'up':
                    currentImage = this.arrImages[12];
                    break;
                case 'down':
                    currentImage = this.arrImages[13];
                    break;
                case 'right':
                    currentImage = this.arrImages[14];
                    break;
                case 'left':
                    currentImage = this.arrImages[15];
                    break;
            }
        }
        else
        {
            //this.arrImages       = [];
            //this.arrDirection    = [ 'u', 'd', 'r', 'l' ];
            //this.arrState        = [ '0', '1' ];
            switch ( currentDir )
            {
                case 'up':
                    currentImage = this.areLegOpen ? this.arrImages[0]: this.arrImages[0+1];
                    break;
                case 'down':
                    currentImage = this.areLegOpen ? this.arrImages[2]: this.arrImages[2+1];
                    break;
                case 'right':
                    currentImage = this.areLegOpen ? this.arrImages[4]: this.arrImages[4+1];
                    break;
                case 'left':
                    currentImage = this.areLegOpen ? this.arrImages[6]: this.arrImages[6+1];
                    break;
            }
        }
                
        // Update the last image showed
        this.lastImageShowed = currentImage;
        
        // Return the images
        return currentImage;
    }

//
//
//
Ghost.prototype.IsIntersection = 
    function ()
    {
        var isIntersection = false;
        
        // Get the current ghost position 
        var x = this.x;
        var y = this.y;
        
        var nextStep = ''
        var counter = 0;
        // Verify if the ghost can move in more than one direction.
        if ( mazze[y-1][x]=='..' && this.currentDirGhost!='up' ) counter++;
        if ( mazze[y+1][x]=='..' && this.currentDirGhost!='down' ) counter++;
        if ( mazze[y][x-1]=='..' && this.currentDirGhost!='left' ) counter++;
        if ( mazze[y][x+1]=='..' && this.currentDirGhost!='right' ) counter++;
        
        if ( counter>1 )
            isIntersection = true;
        
        //alert('isIntersection='+isIntersection);
        // Return id the ghost is in one intersection or not
        return isIntersection;
    }

//
//
//
Ghost.prototype.GetTheBestDirectionToMove = 
    function ( xTarget, yTarget )
    {
        // Get the current ghost position 
        var x = this.x;
        var y = this.y;
        
        var a = 0;
        var b = 0;
        var hipU = 0;
        var hipD = 0;
        var hipL = 0;
        var hipR = 0;
        
        // up
        if ( mazze[y-1][x]=='..' && this.currentDirGhost!='down' ) 
        {
            if ( x==xTarget && (y-1)==yTarget )
                return 'up';
            a = Math.abs( xTarget-x );
            b = Math.abs( yTarget-(y-1) );
            hipU = Math.sqrt(a*a + b*b); // distance 2;
        }
        // down
        if ( mazze[y+1][x]=='..' && this.currentDirGhost!='up' ) 
        {
            if ( x==xTarget && (y+1)==yTarget )
                return 'down';
            a = Math.abs( xTarget-x );
            b = Math.abs( yTarget-(y+1) );
            hipD = Math.sqrt(a*a + b*b); // distance 2;
        }
        // left
        if ( mazze[y][x-1]=='..' && this.currentDirGhost!='right' )
        {
            if ( (x-1)==xTarget && y==yTarget )
                return 'left';
            a = Math.abs( xTarget-(x-1) );
            b = Math.abs( yTarget-y );
            hipL = Math.sqrt(a*a + b*b); // distance 3;
        }
        // right
        if ( mazze[y][x+1]=='..' && this.currentDirGhost!='left' )
        {
            if ( (x+1)==xTarget && y==yTarget )
                return 'right';
            a = Math.abs( xTarget-(x+1) );
            b = Math.abs( yTarget-y );
            hipR = Math.sqrt(a*a + b*b); // distance 4;
        }
        
        // Look for the shortest distance to the return position point in the cave
        var minor = 1000;
        var newDirection = '';
        if ( hipU > 0 ) // &&  ( this.currentDirGhost!='up' || this.currentDirGhost!='down' ) ) 
        { 
            minor = hipU; 
            newDirection = 'up';
        }
        if ( hipD > 0 && hipD<minor ) // && ( this.currentDirGhost!='up' || this.currentDirGhost!='down' ) ) 
        { 
            minor = hipD;
            newDirection = 'down';
        }
        if ( hipL > 0 && hipL<minor ) // && ( this.currentDirGhost!='left' || this.currentDirGhost!='right' ) ) 
        { 
            minor = hipL;
            newDirection = 'left';
        }
        if ( hipR > 0 && hipR<minor ) // &&  ( this.currentDirGhost!='left' || this.currentDirGhost!='right' ) ) 
        { 
            minor = hipL;
            newDirection = 'right';
        }

        // Return the best direction
        return newDirection;
    }

//
//
//
Ghost.prototype.GetTheWorstDirectionToMove = 
    function ( xTarget, yTarget )
    {
        // Get the current ghost position 
        var x = this.x;
        var y = this.y;
        
        var a = 0;
        var b = 0;
        var hipU = 0;
        var hipD = 0;
        var hipL = 0;
        var hipR = 0;
        
        // up
        if ( mazze[y-1][x]=='..' && this.currentDirGhost!='down' ) 
        {
            if ( x==xTarget && (y-1)==yTarget )
                return 'up';
            a = Math.abs( xTarget-x );
            b = Math.abs( yTarget-(y-1) );
            hipU = Math.sqrt(a*a + b*b); // distance 2;
        }
        // down
        if ( mazze[y+1][x]=='..' && this.currentDirGhost!='up' ) 
        {
            if ( x==xTarget && (y+1)==yTarget )
                return 'down';
            a = Math.abs( xTarget-x );
            b = Math.abs( yTarget-(y+1) );
            hipD = Math.sqrt(a*a + b*b); // distance 2;
        }
        // left
        if ( mazze[y][x-1]=='..' && this.currentDirGhost!='right' )
        {
            if ( (x-1)==xTarget && y==yTarget )
                return 'left';
            a = Math.abs( xTarget-(x-1) );
            b = Math.abs( yTarget-y );
            hipL = Math.sqrt(a*a + b*b); // distance 3;
        }
        // right
        if ( mazze[y][x+1]=='..' && this.currentDirGhost!='left' )
        {
            if ( (x+1)==xTarget && y==yTarget )
                return 'right';
            a = Math.abs( xTarget-(x+1) );
            b = Math.abs( yTarget-y );
            hipR = Math.sqrt(a*a + b*b); // distance 4;
        }
        
        // Look for the longest distance to go to the target
        var major = -1;
        var newDirection = '';
        if ( hipU > 0 ) // &&  ( this.currentDirGhost!='up' || this.currentDirGhost!='down' ) ) 
        { 
            major = hipU; 
            newDirection = 'up';
        }
        if ( hipD > 0 && hipD>major ) // && ( this.currentDirGhost!='up' || this.currentDirGhost!='down' ) ) 
        { 
            major = hipD;
            newDirection = 'down';
        }
        if ( hipL > 0 && hipL>major ) // && ( this.currentDirGhost!='left' || this.currentDirGhost!='right' ) ) 
        { 
            major = hipL;
            newDirection = 'left';
        }
        if ( hipR > 0 && hipR>major ) // &&  ( this.currentDirGhost!='left' || this.currentDirGhost!='right' ) ) 
        { 
            major = hipL;
            newDirection = 'right';
        }

        // Return the best direction
        return newDirection;
    }

    
//
//
//    
Ghost.prototype.MoveToTheCave = 
    function ()
    {
        if ( !this.InDoorOfCave() )
        {
            if ( this.IsIntersection() )
            {
                // Change the direction to get the cave. Pass the direction to follow
                this.currentDirGhost = this.GetTheBestDirectionToMove( this.xReturnCave, this.yReturnCave );
            }
            
            // Update x and y based on the current direction
            var x = this.x;
            var y = this.y;
            switch ( this.currentDirGhost )
            {
                case 'up':
                    this.x = x; this.y = y-1;
                    break;
                case 'down':
                    this.x = x; this.y = y+1;
                    break;
                case 'left':
                    this.x = x-1; this.y = y;
                    break;
                case 'right':
                    this.x = x+1; this.y = y;
                    break;
            }
        }
        else
        {
            // Move down until the ghost reach 
            this.x = this.x;
            this.y = this.y + 1;
            this.currentDirGhost = 'down';
        }
        
        // Move the ghost in the current direction.
        this.Move();
        
        // Verify if the ghost just reach the position in the cave
        if ( this.x==this.xReturnCave && this.y==this.yReturnCave )
        {
            this.SetInDoorOfCave( true );
        }
        // Verify in the ghost is in the return position inside the cave
        if ( this.x==this.xReturnInsideCave && this.y==this.yReturnInsideCave )
        {
            this.SetIsInTheCave( true );
            this.SetInDoorOfCave( false );
            
            // Put the ghost in normal mode.
            this.SetCanBeEaten( false );
            this.SetInEyeMode( false );
            this.SetWaitToGetOutCave( false );
        }
    }

//
//
//
Ghost.prototype.IsInIniInsideTheCave = 
    function ()
    {
        if ( this.x==this.xIniInsideCave && this.y==this.yIniInsideCave )
            return true;
        else
            return false;
    }

//
//
//    
Ghost.prototype.SetIsGoingUpOutside =
    function ( value )
    {
        this.isGoingUpOutside = value;
    }

//
//
//    
Ghost.prototype.IsGoingUpOutside =
    function ()
    {
        return this.isGoingUpOutside;
    }
        
//
//
//    
Ghost.prototype.MoveOutsideTheCave = 
    function ()
    {
        // Move the ghost to the initial position inside the cave
        if ( !this.IsInIniInsideTheCave() && !this.IsGoingUpOutside() )
        {
            // Move until the ghost reach the lowest y in the cave
            if ( this.y == 15 )
            {   
                if ( (this.xIniInsideCave-this.x)>0 )
                {
                    this.currentDirGhost = 'right';
                    this.x++;
                }
                else
                {
                    this.currentDirGhost = 'left';
                    this.x--;
                }
                // Move the ghost in the current direction.
                this.Move();    
                return;
            }
            else
            {
                this.MoveUpDownInTheCave();
                return;
            }
        }
        else
        {
            this.SetIsGoingUpOutside( true );
        }
    
        // Move the ghost up until the ghost get out to the cave
        if ( this.InDoorOfCave() )
        {
            this.SetIsGoingUpOutside( false );
            // Just move normal now.
            this.SetIsInTheCave( false );
        }
        else
        {
            // Move up until the ghost reach the first point outside the cave
            this.x = this.x;
            this.y = this.y - 1;
            this.currentDirGhost = 'up';
        }
        
        // Move the ghost in the current direction.
        this.Move();
        
        // Verify if the ghost just reach the position in the cave
        if ( this.x==this.xReturnCave && this.y==this.yReturnCave )
        {
            this.SetInDoorOfCave( false ); // false because we need this boolean with this value for the next eye mode
            this.SetIsInTheCave( false );
        }
    }

//
//
//    
Ghost.prototype.MoveUpDownInTheCave = 
    function ()
    {
        // Can  the monster move in the current direction
        var nextStep = '';
        var x = this.x;
        var y = this.y;
        //alert('x:'+x+',y:'+y);
        
        // The ghost can go in the current direction
        if ( this.currentDirGhost=='up' )
            nextStep = mazze[y-1][x]; // Correct pos in x, y coords [x][y-1]
        else
            nextStep = mazze[y+1][x]; // Correct pos in x, y coords [x][y+1]
            
        //alert(nextStep);
        
        if ( nextStep=='..' )
        {
            if ( this.currentDirGhost == 'up' )
                this.y--;
            else
                this.y++;
        }
        else
        {
            // Change of directuion because the ghost hit the wall
            this.currentHits++;
            if ( this.currentDirGhost == 'up' )
            {
                this.currentDirGhost = 'down';
                this.y++ 
            }
            else
            {
                this.currentDirGhost = 'up';
                this.y-- 
            }
        }
        
        this.Move();
        
        // Verify in the ghost must go outside
        if ( this.currentHits>=this.GetHitsBeforeGetOut() )
        {
            this.SetWaitToGetOutCave( false );
            this.currentHits = 0;
        }
    }   

//
//
//    
Ghost.prototype.Update = 
    function ( tick )
    {
        // Update the time transcurred
        this.tickAcum += tick;
        
        if( this.CanBeEaten() )
            this.tickAcumEatable += tick;
        
        if ( !this.IsInEyeMode() )
        {
            if ( this.tickAcum<this.ghostTick )
                return;
        }
        else
        {
            if ( this.tickAcum<this.ghostEyeTick )
                return;
        }
        this.tickAcum = 0;
        
        /*********************************************************************************/
        // If the monster is in the the cave move outside the cave.
        /*********************************************************************************/
        if ( this.IsInTheCave() )
        {
            if ( this.WaitToGetOutCave() )
            {
                this.MoveUpDownInTheCave();
            }
            else
            {   
                // TODO: Move the ghost to the ini position in the cave
                this.MoveOutsideTheCave();
            }
            
            return;
        }
        
        /*********************************************************************************/
        // If the monster is in the eye mode go to the cave, change the status to normal.
        /*********************************************************************************/
        if ( this.IsInEyeMode() )
        {
            this.MoveToTheCave();
            return;
        }
        
        /*********************************************************************************/
        // Normal moves.
        /*********************************************************************************/
        if( this.CanBeEaten() )
        {
            this.MoveAway();
        }
        else
        {
            // Verify if the ghost can move in the current direction
            switch ( this.color )
            {
                case 'red':
                    this.MoveRed();
                    break;
                case 'pink':
                    this.MovePink();
                    break;
                case 'orange':
                    this.MoveBlue();
                    break;
                case 'blue':
                    this.MoveBlue();
                    break;
            }
        }
    };

//
//
//    
Ghost.prototype.IsPacmanTouched = 
    function ( x, y )
    {
        var isKilled = false;
        
        // Verify if the Ghost Killed the pacman
        var x = pacmans[0].GetX();
        var y = pacmans[0].GetY();
        
        // TODO: Pacman is killed not just with x and y is exact the same
        //if ( x==this.x && y==this.y )
        //    isKilled = true;
            
        if ( Math.abs( x-this.x )<=1 && Math.abs( y-this.y )<=1 )   
            isKilled = true;
        return isKilled;
    };

//
//
//    
Ghost.prototype.MoveAway = 
    function ()
    {
        /*********************************************************************************/
        // Normal moves.
        /*********************************************************************************/
        if ( this.IsIntersection() )
        {
            // Change the direction to follow the pacman. Pass the direction to follow
            this.currentDirGhost = this.GetTheWorstDirectionToMove( pacmans[0].GetX(), pacmans[0].GetY() );
        }
        
        // Update x and y based on the current direction
        var x = this.x;
        var y = this.y;
        switch ( this.currentDirGhost )
        {
            case 'up':
                this.x = x; this.y = y-1;
                break;
            case 'down':
                this.x = x; this.y = y+1;
                break;
            case 'left':
                this.x = x-1; this.y = y;
                break;
            case 'right':
                this.x = x+1; this.y = y;
                break;
        }
        
        /**/
        // Move the ghost in the current direction
        this.Move();
    };
    
//
//
//    
Ghost.prototype.MoveRed = 
    function ()
    {
        /*********************************************************************************/
        // Normal moves.
        /*********************************************************************************/
        if ( this.IsIntersection() )
        {
            // Change the direction to follow the pacman. Pass the direction to follow
            this.currentDirGhost = this.GetTheBestDirectionToMove( pacmans[0].GetX(), pacmans[0].GetY() );
        }
        
        // Update x and y based on the current direction
        var x = this.x;
        var y = this.y;
        switch ( this.currentDirGhost )
        {
            case 'up':
                this.x = x; this.y = y-1;
                break;
            case 'down':
                this.x = x; this.y = y+1;
                break;
            case 'left':
                this.x = x-1; this.y = y;
                break;
            case 'right':
                this.x = x+1; this.y = y;
                break;
        }
        
        /**/
        // Move the ghost in the current direction
        this.Move();
    };

//
//
//    
Ghost.prototype.MovePink = 
    function ()
    {
        /*********************************************************************************/
        // Normal moves.
        /*********************************************************************************/
        if ( this.IsIntersection() )
        {
            // Decide to go in the best direction or the worst. It give to the ghost a weird personalitie. Sometimes
            // it follow the pacman in the other it goes away.
            if ( this.bestDirection )
            {
                // Change the direction to follow the pacman. Pass the direction to follow
                this.currentDirGhost = this.GetTheWorstDirectionToMove( pacmans[0].GetX(), pacmans[0].GetY() );
            }
            else
                this.currentDirGhost = this.GetTheBestDirectionToMove( pacmans[0].GetX(), pacmans[0].GetY() );
            
            this.bestDirection = !this.bestDirection;
        }
        
        // Update x and y based on the current direction
        var x = this.x;
        var y = this.y;
        switch ( this.currentDirGhost )
        {
            case 'up':
                this.x = x; this.y = y-1;
                break;
            case 'down':
                this.x = x; this.y = y+1;
                break;
            case 'left':
                this.x = x-1; this.y = y;
                break;
            case 'right':
                this.x = x+1; this.y = y;
                break;
        }
        
        /**/
        // Move the ghost in the current direction
        this.Move();
    };
     
//
//
//    
Ghost.prototype.MoveBlue = 
    function ()
    {
        /*********************************************************************************/
        // Normal moves.
        /*********************************************************************************/
        if ( this.IsIntersection() )
        {
            var nextStep = '';
            var newX = 0;
            var newY = 0;
            var x = this.x;
            var y = this.y;
            var found = false;
                
            // Try to go to the right or left
            if ( this.currentDirGhost=='up' || this.currentDirGhost=='down' )
            {
                var rand_no = Math.random();
                rand_no = (Math.ceil(rand_no * 100) % 2);
                
                if ( rand_no == 0 )
                {
                    // Try to go to the right
                    if ( mazze[this.y][this.x+1]=='..' )
                    {
                        this.currentDirGhost = 'right';
                        newX = x+1; newY = y;
                        found = true;
                    }
                    else if ( mazze[this.y][this.x-1]=='..' )
                    {
                        this.currentDirGhost = 'left';
                        newX = x-1; newY = y;
                        found = true;
                    }
                }
                else
                {
                    // Try to go to the left
                    if ( mazze[this.y][this.x-1]=='..' )
                    {
                        this.currentDirGhost = 'left';
                        newX = x-1; newY = y;
                        found = true;
                    }

                    else if ( mazze[this.y][this.x+1]=='..' )
                    {
                        this.currentDirGhost = 'right';
                        newX = x+1; newY = y;
                        found = true;
                    }
                }
            }
            //
            // Try to go to the up or down
            //
            if ( !found )
            {
                var rand_no = Math.random();
                rand_no = (Math.ceil(rand_no * 100) % 2);
                
                if ( rand_no == 0 )
                {
                    // Try to go to the up
                    if ( mazze[this.y-1][this.x]=='..' )
                    {
                        this.currentDirGhost = 'up';
                        newX = x; newY = y-1;
                    }
                    else if ( mazze[this.y+1][this.x]=='..' )
                    {
                        this.currentDirGhost = 'down';
                        newX = x; newY = y+1;
                    }
                }
                else
                {
                    // Try to go to the down
                    if ( mazze[this.y+1][this.x]=='..' )
                    {
                        this.currentDirGhost = 'down';
                        newX = x; newY = y+1;
                    }
                    else if ( mazze[this.y-1][this.x]=='..' )
                    {
                        this.currentDirGhost = 'up';
                        newX = x; newY = y-1;
                    }
                }
            }
            
            // Update the position of the ghost
//            this.x = newX;
//            this.y = newY;

        }
        
        // Update x and y based on the current direction
        var x = this.x;
        var y = this.y;
        switch ( this.currentDirGhost )
        {
            case 'up':
                this.x = x; this.y = y-1;
                break;
            case 'down':
                this.x = x; this.y = y+1;
                break;
            case 'left':
                this.x = x-1; this.y = y;
                break;
            case 'right':
                this.x = x+1; this.y = y;
                break;
        }
                
        /**/
        // Move the ghost in the current direction
        this.Move();
    };