//*******************************************************************************
// Author: Harry Guillermo Mendoza
// Email: hguillermo@yahoo.com
// All copyrights are reserved
// Date: 08/22/2008
// Web site: http://www.harryguillermo.com
//*******************************************************************************
//
//
// Effect definition 
//
//
var effectManager;
var currentEffect;

//
//
//
function InitEffects()
{
    // Set the global input
    effectManager = new EffectManager();
}

function EffectManager()
{
    // Load the effects
    this.effects = [];

    // Game loading
    this.effects.push( new EffectGameLoading( 'gameLoading', 8000 ) ); // 6800 ms
    // pacman dying
    this.effects.push( new EffectPacmanDying( 'pacmanDying', 2600 ) ); // 2 segs
    // level finished. blink the screen    
    this.effects.push( new EffectMazeBlinking( 'mazeBlinking', 1800 ) ); // 1800 ms
    // Input screen. Present the ghots and the points.
    this.effects.push( new EffectInputScreen( 'inputScreen', 14*400 ) ); // 1800 ms
    // Persecution screen.
    this.effects.push( new EffectPersecution( 'persecution', 55*200 ) ); // 1800 ms


    // pacman eat moster
    // Intermision 1
    // Intermision 2
}

EffectManager.prototype.AllImagesAreLoaded =
    function () 
    {
        var loaded = true;
        for ( var i=0; i<this.effects.length; i++ )
        {
            if ( !this.effects[i].IsLoaded() )
            {
                loaded = false;
                break;
            }
        }
        
        return loaded;
    };
    
EffectManager.prototype.GetTotalImages =
    function () 
    {
        var totalImages = 0;
        for ( var i=0; i<this.effects.length; i++ )
        {
            totalImages = totalImages + this.effects[i].GetNumImages();
        }
        
        return totalImages;
    };

EffectManager.prototype.GetTotalImagesLoaded =
    function () 
    {
        var totalImagesLoaded = 0;
        for ( var i=0; i<this.effects.length; i++ )
        {
            totalImagesLoaded = totalImagesLoaded + this.effects[i].GetNumImagesLoaded();
        }
        
        return totalImagesLoaded;
    };    
    
//
//
//
EffectManager.prototype.Run =
    function ( name ) 
    {
        for (var i=0; i<this.effects.length; i++)
        {
            if ( this.effects[i].GetName()==name )
            {
                currentEffect = this.effects[i];
                // Run the effect
                this.effects[i].Run();
                break;
            }
        }
    };
   
//
//
//
EffectManager.prototype.Clean =
    function ( name ) 
    {
        for (var i=0; i<this.effects.length; i++)
        {
            if ( this.effects[i].GetName()==name )
            {
                // Clean the effect
                this.effects[i].Clean();
                break;
            }
        }
    };
    
//
//
//
EffectManager.prototype.Cancel =
    function ( name ) 
    {
        for (var i=0; i<this.effects.length; i++)
        {
            if ( this.effects[i].GetName()==name )
            {
                // Update the effect
                this.effects[i].Cancel();
                break;
            }
        }
    };


/****************************/
/* Effect object definition */
/****************************/
//
//
//
function Effect( name, durationms )
{
    // Set the name for the sound
    this.effectName = name;
    this.durationms = durationms;

    this.isActive   = false;
    this.cancel     = false;
}

//
//
//
Effect.prototype.Cancel =
    function ( value )
    {
        this.cancel = value;
    };

//
//
//
Effect.prototype.IsCancelled =
    function ()
    {
        return this.cancel;
    };
    
//
//
//
Effect.prototype.GetName =
    function ()
    {
        return this.effectName;
    };

//
//
//
Effect.prototype.IsActive =
    function () 
    {
        return this.isActive;
    }   

//
//
//
Effect.prototype.Run =
    function () 
    {
    }

//
//
//
Effect.prototype.Update =
    function () 
    {
    }


    
 
/******************************/
/* Effect pacman dying        */
/******************************/
//
//
//
function EffectPacmanDying( name, durationms )
{
    // Set the name for the sound
    this.effectName     = name;
    this.durationms     = durationms;
    this.previousImg    = 0;
    this.currentImg     = 0;
    this.numImages      = 14;

    this.isActive   = false;
    this.cancel     = false;

    // Create an array of images
    this.images = [];
    
    for ( var i=0; i<this.numImages; i++ )
    {
        var img = document.createElement('img');
        img.id      = this.effectName + i;
        img.border  = 0;
        img.src     = 'pacman/effects/pacmandying/pacman' + i +'.gif';
        img.style.position      = 'absolute';
        img.style.zIndex        = 999;
        img.style.top           = 352;
        img.style.left          = 500;
        img.style.visibility    = 'hidden';
        
        //document.appendChild( img );
        //document.body.insertBefore(img)
        var divContent = document.getElementById( 'content' );
        divContent.appendChild( img );

        // Insert the referece to the image into the array        
        this.images.push( img );
    }
}

// Setup the inheritance
EffectPacmanDying.prototype = new Effect();

//
//
//
EffectPacmanDying.prototype.Clean =
    function () 
    {
        // TODO: Nothing at the moment
        return;
    }

//
//
//
EffectPacmanDying.prototype.IsLoaded =
    function () 
    {
        // this.images[] = The images to show in the effect.
        var loaded = true;
        for( var i=0; i<this.images.length; i++ )
        {
            if ( !this.images[i].complete )
            {
                loaded = false;
                break;
            }
        }
        
        return loaded;
    };

//
//
//
EffectPacmanDying.prototype.GetNumImages =
    function () 
    {
        return this.numImages;
    };

//
//
//
EffectPacmanDying.prototype.GetNumImagesLoaded =
    function () 
    {
        var imagesLoaded = 0;
        for( var i=0; i<this.images.length; i++ )
        {
            if ( this.images[i].complete )
            {
                imagesLoaded++;
            }
        }
        
        return imagesLoaded;
    };


//
//
//
EffectPacmanDying.prototype.Run =
    function () 
    {
        // Set the cancel variable to false
        this.Cancel( false );
        
        // Play the dead sound
        soundPlayer.Play( 'pacmanKilled' );
        
        // Hide the pacman
        for (var i=0; i<pacmans.length; i++)
            pacmans[i].Hide();

        // Hide the monsters
        for (var i=0; i<ghosts.length; i++)
            ghosts[i].Hide();
    
        this.currentImg = 0;
        this.previousImg = 0;
        this.Update();
    }

//
//
//
EffectPacmanDying.prototype.Update =
    function () 
    {
        // Set visibility for the previous image in false
        this.images[this.previousImg].style.visibility = 'hidden';
        
        var top = 16 * ( pacmans[0].GetY() -1 ) + 72;  // TODO: Fix the 16
        var left = 16 * ( pacmans[0].GetX() -1 ) + 16;  // TODO: Fix the 16
        this.images[this.currentImg].style.top      = top + 'px';
        this.images[this.currentImg].style.left     = left + 'px';
        this.images[this.currentImg].style.visibility = 'visible';
        
        this.previousImg = this.currentImg;
        this.currentImg++;
        
        if ( this.currentImg<this.numImages )
        {
            // Set the timer to see the next image
            setTimeout( 'currentEffect.Update()', 180 );  // TODO: It looks that I'm not showing the last image.
        }
        else
        {
            this.images[this.previousImg].style.visibility = 'hidden';
            
            // Show the current lifes of pacman - 1 in the screen
            life.ShowLifes( pacmans[0].GetCurrentLifes()-1 )
            
            // Conitnue the game
            game.Continue();
        }
    }

 
/****************************/
/* Effect maze blinking     */
/****************************/
//
//
//
function EffectMazeBlinking( name, durationms )
{
    // Set the name for the sound
    this.effectName     = name;
    this.durationms     = durationms;
    this.previousImg    = 0;
    this.currentImg     = 0;
    this.numImages      = 2;
    this.repeatTimes    = 6;
    this.counter        = 0;

    this.isActive   = false;
    this.cancel     = false; 

    // Create an array of images
    this.images = [];
    
    for ( var i=0; i<this.numImages; i++ )
    {
        var img = document.createElement('img');
        img.id      = this.effectName + i;
        img.border  = 0;
        img.src     = 'pacman/effects/mazeblinking/mazeblinking' + i +'.jpg';
        img.style.position      = 'absolute';
        img.style.zIndex        = 999;
        img.style.top           = 0;
        img.style.left          = 0;
        img.style.visibility    = 'hidden';
        
        // Add the image to the document.
        //document.body.insertBefore(img)
        var divContent = document.getElementById( 'content' );
        divContent.appendChild( img );

        // Insert the referece to the image into the array        
        this.images.push( img );
    }
}

// Setup the inheritance
EffectMazeBlinking.prototype = new Effect();

//
//
//
EffectMazeBlinking.prototype.Clean =
    function () 
    {
        // TODO: Nothing at the moment
        return;
    }

//
//
//
EffectMazeBlinking.prototype.IsLoaded =
    function () 
    {
        // this.images[] = The images to show in the effect.
        var loaded = true;
        for( var i=0; i<this.images.length; i++ )
        {
            if ( !this.images[i].complete )
            {
                loaded = false;
                break;
            }
        }
        
        return loaded;
    }

//
//
//
EffectMazeBlinking.prototype.GetNumImages =
    function () 
    {
        return this.numImages;
    };

//
//
//
EffectMazeBlinking.prototype.GetNumImagesLoaded =
    function () 
    {
        var imagesLoaded = 0;
        for( var i=0; i<this.images.length; i++ )
        {
            if ( this.images[i].complete )
            {
                imagesLoaded++;
            }
        }
        
        return imagesLoaded;
    };
        
//
//
//
EffectMazeBlinking.prototype.Run =
    function () 
    {
        // Set the cancel variable to false
        this.Cancel( false ); 
            
        // Hide the monsters
        for (var i=0; i<ghosts.length; i++)
            ghosts[i].Hide();
    
        this.currentImg = 0;
        this.previousImg = 0;
        this.counter = 0;
        
        this.Update();
    }

//
//
//
EffectMazeBlinking.prototype.Update =
    function () 
    {
        // Set visibility for the previous image in false
        this.images[this.previousImg].style.visibility = 'hidden';
                
        this.images[this.currentImg].style.top      = 56 + 'px';  // TODO: Fix the 0. We need to move the maze to the center.
        this.images[this.currentImg].style.left     = 0;  // TODO: Fix the 0
        this.images[this.currentImg].style.visibility = 'visible';
        
        this.previousImg = this.currentImg;
        this.currentImg = ( (this.counter % 2)==0 ) ? this.currentImg = 1: this.currentImg = 0;
        
        if ( this.counter<this.repeatTimes )
        {
            this.counter++;
            // Set the timer to see the next image
            setTimeout( 'currentEffect.Update()', 300 );  // TODO: It looks that I'm not showing the last image.
        }
        else
        {
            this.images[this.previousImg].style.visibility = 'hidden';
            
            // Hide the pacman
            for (var i=0; i<pacmans.length; i++)
                pacmans[i].Hide();
            return;
        }
    }


/************************************/
/* Effect game loading intro        */
/************************************/
//
//
//
function EffectGameLoading( name, durationms )
{
    // Set the name for the sound
    this.effectName     = name;
    this.durationms     = durationms;
    this.previousImg    = 0;
    this.currentImg     = 0;
    this.numImages      = 40;

    this.isActive   = false;
    this.cancel     = false; 

    // Create an array of images
    this.images = [];
    
    for ( var i=0; i<this.numImages; i++ )
    {
        var img = document.createElement('img');
        img.id      = this.effectName + i;
        img.border  = 0;
        img.src     = 'pacman/effects/gameloading/1gameloading' + i +'.jpg';
        img.style.position      = 'absolute';
        img.style.zIndex        = 950;
        img.style.top           = 200;
        img.style.left          = 110;
        img.style.visibility    = 'hidden';
        
        //document.appendChild( img );
        /////document.body.insertBefore(img)
        var divContent = document.getElementById( 'content' );
        divContent.appendChild( img );

        // Insert the referece to the image into the array        
        this.images.push( img );
    }
}

// Setup the inheritance
EffectGameLoading.prototype = new Effect();

//
//
//
EffectGameLoading.prototype.Clean =
    function () 
    {
        // TODO: Nothing at the moment
        return;
    }

//
//
//
EffectGameLoading.prototype.IsLoaded =
    function () 
    {
        // this.images[] = The images to show in the effect.
        var loaded = true;
        for( var i=0; i<this.images.length; i++ )
        {
            if ( !this.images[i].complete )
            {
                loaded = false;
                break;
            }
        }
        
        return loaded;
    }

//
//
//
EffectGameLoading.prototype.GetNumImages =
    function () 
    {
        return this.numImages;
    };

//
//
//
EffectGameLoading.prototype.GetNumImagesLoaded =
    function () 
    {
        var imagesLoaded = 0;
        for( var i=0; i<this.images.length; i++ )
        {
            if ( this.images[i].complete )
            {
                imagesLoaded++;
            }
        }
        
        return imagesLoaded;
    };
            
//
//
//
EffectGameLoading.prototype.Run =
    function () 
    {
        // Set the cancel variable to false
        this.Cancel( false ); 
            
        // Hide the pacman
        for (var i=0; i<pacmans.length; i++)
            pacmans[i].Hide();

        // Hide the monsters
        for (var i=0; i<ghosts.length; i++)
            ghosts[i].Hide();
    
        this.currentImg = 0;
        this.previousImg = 0;
        this.Update();
    }

//
//
//
EffectGameLoading.prototype.Update =
    function () 
    {
        // Set visibility for the previous image in false
        this.images[this.previousImg].style.visibility = 'hidden';
        
        this.images[this.currentImg].style.top      = 0;  // TODO: Fix the 0. It must dinamic. in the center probably
        this.images[this.currentImg].style.left     = 0;  // TODO: Fix the 0
        this.images[this.currentImg].style.visibility = 'visible';
        
        this.previousImg = this.currentImg;
        this.currentImg++;
        
        if ( this.currentImg<this.numImages )
        {
            // Set the timer to see the next image
            setTimeout( 'currentEffect.Update()', 200 );  // TODO: It looks that I'm not showing the last image.
        }
        else
        {
            this.images[this.previousImg].style.visibility = 'hidden';
            
            // Continue the game
            //game.Continue();

            // This is going to show the next effect. Pacman persecution.
            game.WaitMode();
        }
    }


/************************************/
/* Effect Input Screen              */
/************************************/
//
//
//
function EffectInputScreen( name, durationms )
{
    // Set the name for the sound
    this.effectName     = name;
    this.durationms     = durationms;
    this.previousImg    = 0;
    this.currentImg     = 0;
    this.numImages      = 16;

    this.isActive   = false;
    this.cancel     = false; 

    // Create an array of images
    this.images = [];
 
    this.divInputScreen = document.getElementById('divInputScreen');
    
    for ( var i=0; i<this.numImages; i++ )
    {
        var img = document.createElement('img');
        img.id      = this.effectName + i;
        img.border  = 0;
        img.src     = 'pacman/effects/inputscreen/inputscreen' + i +'.gif';
        img.style.position      = 'absolute';
        img.style.zIndex        = 950;
        img.style.top           = 0;
        img.style.left          = 0;
        img.style.visibility    = 'hidden';
        
        //document.appendChild( img );
        //document.body.insertBefore(img)
        //this.divInputScreen.appendChild(img);

        // Insert the referece to the image into the array        
        this.images.push( img );
    }
    
    // Load the images into the div
    this.LoadImages();
}

// Setup the inheritance
EffectInputScreen.prototype = new Effect();

//
//
//
EffectInputScreen.prototype.Clean =
    function () 
    {
        // Clean the divInputScreen 
        //this.divInputScreen.innerHTML = '';
        
        for ( var i=0; i<this.images.length; i++ )
        {
            // Hide all the images.
            this.images[i].style.visibility = 'hidden';
        }          
    }

//
//
//
EffectInputScreen.prototype.IsLoaded =
    function () 
    {
        // this.images[] = The images to show in the effect.
        var loaded = true;
        for( var i=0; i<this.images.length; i++ )
        {
            if ( !this.images[i].complete )
            {
                loaded = false;
                break;
            }
        }
        
        return loaded;
    }

//
//
//
EffectInputScreen.prototype.GetNumImages =
    function () 
    {
        return this.numImages;
    };

//
//
//
EffectInputScreen.prototype.GetNumImagesLoaded =
    function () 
    {
        var imagesLoaded = 0;
        for( var i=0; i<this.images.length; i++ )
        {
            if ( this.images[i].complete )
            {
                imagesLoaded++;
            }
        }
        
        return imagesLoaded;
    };
            
//
//
//
EffectInputScreen.prototype.LoadImages =
    function () 
    {
        for ( var i=0; i<this.images.length; i++ )
        {
            // Hide all the images.
            this.images[i].style.visibility = 'hidden';
            // Add the images to the div
            this.divInputScreen.appendChild( this.images[i] );
        }        
    }
    
    
//
//
//
EffectInputScreen.prototype.Run =
    function () 
    {
        // Set the cancel variable to false
        this.Cancel( false );        
        
        // Clean all the content of the div. Its really to hide all the images
        this.Clean();
        
        // Show the divInputScreen
        //this.LoadImages();
        
        // Hide the pacman
        for (var i=0; i<pacmans.length; i++)
            pacmans[i].Hide();

        // Hide the monsters
        for (var i=0; i<ghosts.length; i++)
            ghosts[i].Hide();
    
        this.currentImg = 0;
        this.previousImg = 0;
        this.Update();
    }

//
//
//
EffectInputScreen.prototype.Update =
    function () 
    {
        // Set visibility for the previous image in false
        this.images[this.previousImg].style.visibility = 'hidden';
        
        // Verify if we must to cancel the effect
        if ( !game.GetWaitMode() ) 
        {
            this.Clean();
            return;
        }

                
        this.images[this.currentImg].style.top      = 0;  // TODO: Fix the 0. It must dinamic. in the center probably
        this.images[this.currentImg].style.left     = 0;  // TODO: Fix the 0
        this.images[this.currentImg].style.visibility = 'visible';
        
        this.previousImg = this.currentImg;
        this.currentImg++;
        
        if ( this.currentImg<this.numImages )
        {
            // Set the timer to see the next image
            setTimeout( 'currentEffect.Update()', 700 );  // TODO: It looks that I'm not showing the last image.
        }
        else
        {
            // TODO: Don't hide the last image. Do this in a elegant way
            //this.images[this.previousImg].style.visibility = 'hidden';
            
            // Run the persecution effect. 
            effectManager.Run( 'persecution' );
        }
    }


/************************************/
/* Effect Persecution               */
/************************************/
//
//
//
function EffectPersecution( name, durationms )
{
    // Set the name for the sound
    this.effectName     = name;
    this.durationms     = durationms;
    this.previousImg    = 0;
    this.currentImg     = 0;
    this.numImages      = 55;

    this.isActive   = false;
    this.cancel     = false; 

    // Create an array of images
    this.images = [];
 
    this.divPersecution = document.getElementById('divPersecution');
    
    for ( var i=0; i<this.numImages; i++ )
    {
        var img = document.createElement('img');
        img.id      = this.effectName + i;
        img.border  = 0;
        img.src     = 'pacman/effects/persecution/persecution' + i +'.gif';
        img.style.position      = 'absolute';
        img.style.zIndex        = 950;
        img.style.top           = 0;
        img.style.left          = 0;
        img.style.visibility    = 'hidden';
        
        //document.appendChild( img );
        //document.body.insertBefore(img)
        //this.divInputScreen.appendChild(img);

        // Insert the referece to the image into the array        
        this.images.push( img );
    }
    
    // Load the images into the div
    this.LoadImages();
}

// Setup the inheritance
EffectPersecution.prototype = new Effect();

//
//
//
EffectPersecution.prototype.Clean =
    function () 
    {
        // Clean the divInputScreen 
        //this.divPersecution.innerHTML = '';
        for ( var i=0; i<this.images.length; i++ )
        {
            // Hide all the images.
            this.images[i].style.visibility = 'hidden';
        }         
    }
    
//
//
//
EffectPersecution.prototype.LoadImages =
    function () 
    {
        for ( var i=0; i<this.images.length; i++ )
        {
            // Hide all the images.
            this.images[i].style.visibility = 'hidden';
            // Add the images to the div
            this.divPersecution.appendChild( this.images[i] );
        }        
    }

//
//
//
EffectPersecution.prototype.GetNumImages =
    function () 
    {
        return this.numImages;
    };

//
//
//
EffectPersecution.prototype.GetNumImagesLoaded =
    function () 
    {
        var imagesLoaded = 0;
        for( var i=0; i<this.images.length; i++ )
        {
            if ( this.images[i].complete )
            {
                imagesLoaded++;
            }
        }
        
        return imagesLoaded;
    };
    
//
//
//
EffectPersecution.prototype.IsLoaded =
    function () 
    {
        // this.images[] = The images to show in the effect.
        var loaded = true;
        for( var i=0; i<this.images.length; i++ )
        {
            if ( !this.images[i].complete )
            {
                loaded = false;
                break;
            }
        }
        
        return loaded;
    }
    
//
//
//
EffectPersecution.prototype.Run =
    function () 
    {
        // Set the cancel variable to false
        this.Cancel( false );  
        
        // Clean all the content of the div
        this.Clean();
        
        // Show the divInputScreen
        //this.LoadImages();
        
        // Hide the pacman
        for (var i=0; i<pacmans.length; i++)
            pacmans[i].Hide();

        // Hide the monsters
        for (var i=0; i<ghosts.length; i++)
            ghosts[i].Hide();
    
        this.currentImg = 0;
        this.previousImg = 0;
        this.Update();
    }

//
//
//
EffectPersecution.prototype.Update =
    function () 
    {
        // Set visibility for the previous image in false
        this.images[this.previousImg].style.visibility = 'hidden';
        
        // Verify if we must to cancel the effect
        if ( !game.GetWaitMode() ) 
        {
            this.Clean();
            return;
        }
                
        this.images[this.currentImg].style.top      = 0;  // TODO: Fix the 0. It must be dinamic. in the center probably
        this.images[this.currentImg].style.left     = 0;  // TODO: Fix the 0
        this.images[this.currentImg].style.visibility = 'visible';
        
        this.previousImg = this.currentImg;
        this.currentImg++;
        
        if ( this.currentImg<this.numImages )
        {
            // Set the timer to see the next image
            setTimeout( 'currentEffect.Update()', 200 );  // TODO: It looks that I'm not showing the last image.
        }
        else
        {
            // TODO: Don't hide the last image. Do this in a elegant way
            //this.images[this.previousImg].style.visibility = 'hidden';
            
            // Continue with the effect indefinetly
            this.currentImg = 0;
            // Set the timer to see the next image
            setTimeout( 'currentEffect.Update()', 200 );
        }
    }
