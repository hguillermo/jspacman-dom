//*******************************************************************************
// Author: Harry Guillermo Mendoza
// Email: hguillermo@yahoo.com
// All copyrights are reserved
// Date: 08/22/2008
// Web site: http://www.harryguillermo.com
//*******************************************************************************
//
//
// Message definition 
//
//
var message;

//
//
//
function InitMessage()
{
    /*****************************************************************************/
    // TODO: Comment why I'm loading this images. Cache!
    // Get the divMessages
    var divMessages = document.getElementById('divMessages');

    // Create the array of messages    
    this.messages = new Array();
    this.messages = ['gameover','gameoverplayer1','ready','readyplayer1'];
    
    for ( var i=0; i<this.messages.length; i++ )
    {
        var img = document.createElement('img');
        img.id = 'id'+i;
        img.border = 0;
        img.src = 'pacman/messages/'+this.messages[i]+'.gif';
        // Set the styles
        img.style.visibility = 'hidden'; // TODO: Comment why I'm loading this images. Cache!
        divMessages.appendChild( img );
    }
    /*****************************************************************************/
    
    message = new Message( this.messages );
};



/***************************/
/* Message object definition */
/***************************/
//
//
//
function Message( messages )
{
    this.messages = messages;
    this.divMessages    = document.getElementById('divMessages');
    this.dummy = 0;
    
    // This is to know what score update
    this.currentMessage = '';
};

//
//
//
Message.prototype.AddMessage =
    function ( img )
    {
        this.divMessages.appendChild( img );
    };
    
//
//
//
Message.prototype.LoadImageMessage =
    function ( message )
    {
        // Create an image
        var img = document.createElement('img');
        img.id = 'message'+message;
        img.border = 0;
        img.src = 'pacman/messages/'+message+'.gif';
        // Set the styles
        img.style.visibility = 'visible'; 
           
        return img;
    };
    
//
//
//
Message.prototype.ShowMessage =
    function ( message )
    {
        // Clean the messages
        this.CleanMessage();
        
        for (var i=0; i<this.messages.length; i++)
        {
            if ( this.messages[i]==message )
            {
                // Add the image to the div messages
                var img = this.LoadImageMessage( message );
                this.AddMessage( img );
                break;
            }
        }        
    };

//
//
//
Message.prototype.CleanMessage =
    function ()
    {
        // Delete all the images inside the divMessages
        this.divMessages.innerHTML = '';    
    };
    
   