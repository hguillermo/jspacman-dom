//*******************************************************************************
// Author: Harry Guillermo Mendoza
// Email: hguillermo@yahoo.com
// All copyrights are reserved
// Date: 08/22/2008
// Web site: http://www.harryguillermo.com
//*******************************************************************************
//
//
// Input definition 
//
//
var input;

//
//
//
function InitInput()
{
    // Set the global input
    input = new Input();
    
    // Set the event for the keypress
    //document.onkeypress = function(){ input.KeyPress(); };
    
    // evt is defined to support Firefox. In this browser the event is passed like a parameter
    document.onkeydown = function( evt ){ input.KeyPress( evt ); };
}

//
//
//
function Input()
{
    this.lastKeyPressed = 'left';
}

//
//
//
Input.prototype.GetLastKeyPressed =
    function () 
    {
        return this.lastKeyPressed;
    };

//
//
//
Input.prototype.SetLastKeyPressed =
    function ( lastKeyPressed ) 
    {
        this.lastKeyPressed = lastKeyPressed;
    };

//
//
//
Input.prototype.KeyPress =
    function ( evt )
    {
        var e = window.event? event : evt;
        var unicode = e.keyCode? e.keyCode : e.charCode
        ///alert(String.fromCharCode(unicode));
        var key = unicode; //String.fromCharCode(unicode);
        switch ( key )
        {
            case 38: //'w':
                this.SetLastKeyPressed( 'up' );
                break;
            case 40: //'s':
                this.SetLastKeyPressed( 'down' );
                break;
            case 39: //'d':
                this.SetLastKeyPressed( 'right' );
                break;
            case 37: //'a':
                this.SetLastKeyPressed( 'left' );
                break;
            case 81: //'q':
                // Add a coin
                if ( game.GetWaitMode() )
                {
                    // Play the sound for add a coin
                    soundPlayer.Play( 'newCredit' );
                    // Update the current coins
                    game.UpdateCurrentCoins( 1 );
                    // Increase the coins in the screen
                    credit.SetTotalCoins( game.GetCurrentCoins() );
                }
                break;
            case 80: //'p':
                // Play a game
                if ( game.GetWaitMode() && game.GetCurrentCoins()>0 )
                {
                    // Update the current coins
                    game.UpdateCurrentCoins( -1 );
                    // Clean the credits in the screen
                    credit.Clean();
                    // Disable the wait mode
                    game.SetWaitMode( false );
                    
                    // Clean the input screen to show the maze and pacman and ghosts
                    effectManager.Clean( 'inputScreen' );
                    // TODO: Change this. It's horrible.
                    effectManager.Clean( 'persecution' );

                    // Play pacman
                    game.New();
                }
                break;
            default:
                break;
        }
    };
    
//
//
//
Input.prototype.Error =
    function ( e )
    {  
        alert('AAAA')  
        alert( e.keyCode)
        alert('Is not possible to detect the keyboards events!');
        return;
    }
    