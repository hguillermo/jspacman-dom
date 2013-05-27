//*******************************************************************************
// Author: Harry Guillermo Mendoza
// Email: hguillermo@yahoo.com
// All copyrights are reserved
// Date: 08/22/2008
// Web site: http://www.harryguillermo.com
//*******************************************************************************
//
//
// Edible Fruit Definition
//
//
var ediblefruit = [];
//
//
//
function InitEdibleFruit()
{
    //ediblefruit.push(new EdibleFruit('cherry', 'cherry', 12, 11, 200));
}

function EdibleFruit( fruitName, x, y, curentLevel)
{
    // Initialize the members for the fruit
    this.Initialize( fruitName, x, y, curentLevel )
}

//
//
//
EdibleFruit.prototype.Initialize =
    function(fruitName, x, y, curentLevel)
    {
        // Tick acum before to update the fruit
        this.tickAcum = 0;

        // Tick acum before to change to eatable from blue to white
        this.tickAcumEatable = 0;

        // Move the ghost after this acum is reached
        this.fruitTick = 120; // 125

        // Time acum for the  fruit in the maze
        this.timeAcum = 0;
        
        // Move the fruit after this acum is reached. Max 8 seconds
        this.edibleFruitTime = 5000;

        // Store the current level. It will help us to show the correct fruit by level
        this.currentLevel = curentLevel;

        // Set the movements for the fruit in pixels
        this.xDeltafruitTick = 16;
        this.yDeltafruitTick = 16;

        // Set the fruit name
        this.FruitName = fruitName;

        // Initial position in the maze
        this.iniX = x;
        this.iniY = y;

        // Actual position in the maze
        this.x = x;
        this.y = y;

        // Position in the screen
        this.xScreen = (x - 1) * 16 + 16; // 1 = 0 // TODO: Fix this 16
        this.yScreen = (y - 1) * 16 + 72; // 448; // (28) // TODO: Fix this 16

        // Boolean to now if the fruit can be eaten
        this.canBeEaten = true;
        
        // Create the visual representation. 
        var div = document.createElement('div');
        div.id = this.FruitName;
        div.style.position = 'absolute';
        div.style.width = 32;
        div.style.height = 32;
        div.style.top = this.yScreen;
        div.style.left = this.xScreen;
        div.style.border = 0;
        div.style.zIndex = 920; // or 999 it was in the original. 930 was working

        // Add the fruit to the div.
        this.arrImages = [];
        var img = this.CreateImage('pacman/ediblefruits/' + this.currentLevel + '.gif');
        div.appendChild(img);
        this.arrImages.push(img);
        
        // Add the image with the points associated to the fruit nad the currect level
        var imgp = this.CreateImage('pacman/ediblefruits/' + this.currentLevel + 'p.gif');
        div.appendChild(imgp);
        this.arrImages.push(imgp);

        // Set the last image showed. It will be useful to simulate the legs movement
        this.lastImageShowed = this.arrImages[0];

        // Add the fruit and the point images to the document
        var divContent = document.getElementById('content');
        divContent.appendChild(div);
        
        // Set the pointer to the Fruit
        this.EdibleFruit = div;

        // Set the start position in the screen
        this.SetDefaultPosition();
    }
    
//
//
//
EdibleFruit.prototype.SetTick =
    function( value )
    {
        this.fruitTick = value;
    }

//
//
//
EdibleFruit.prototype.GetTick =
    function()
    {
        return this.fruitTick;
    }

//
//
//
EdibleFruit.prototype.GetScore =
    function()
    {
        var pointsToAdd = 0;
        
        switch (this.currentLevel) {
            case 1:
                pointsToAdd = 100;
                break;
            case 2:
                pointsToAdd = 300;
                break;
            case 3:
                pointsToAdd = 500;
                break;
            case 4:
                pointsToAdd = 700;
                break;
            case 5:
                pointsToAdd = 1000;
                break;
            case 6:
                pointsToAdd = 2000;
                break;
            case 7:
                pointsToAdd = 3000;
                break;
            case 8:
                pointsToAdd = 5000;
                break;                
            default:
                pointsToAdd = 5000;
                break;                
        }

        return pointsToAdd;
    }

//
//
//
EdibleFruit.prototype.SetDefaultPosition =
    function()
    {
        // Position in the screen
        this.xScreen = (this.iniX - 1) * this.xDeltafruitTick + 16; // (x-1)*16, 1 = 0 // TODO: Fix this 16
        this.yScreen = (this.iniY - 1) * this.yDeltafruitTick + 72; // (y-1)*16, 448; // (28) // TODO: Fix this 16

        // Update the actual Position in the maze
        this.x = this.iniX;
        this.y = this.iniY;

        // Get the fruit image to show and show it
        var img = this.arrImages[0];
        img.style.visibility = 'visible';

        // Update the Fruit visual representation in the maze
        this.EdibleFruit.style.top = this.yScreen + 'px';
        this.EdibleFruit.style.left = this.xScreen + 'px';
    }


//
//
//
EdibleFruit.prototype.CreateImage =
    function(source)
    {
        // Create an image
        var img = document.createElement('img');
        img.border = 0;
        img.src = source;

        // Set the styles
        img.style.position = 'absolute';
        img.style.width = 32;
        img.style.height = 32;
        img.style.top = 0;
        img.style.left = 0;

        // Set the visibility in false by default
        img.style.visibility = 'hidden';

        return img;
    };


//
//
//
    EdibleFruit.prototype.Delete =
    function()
    {
        //this.EdibleFruit.style.visibility = 'hidden';
        // Remove the fruit and the point images from the document
        //this.EdibleFruit.removeChild(this.arrImages[0]);
        //this.EdibleFruit.removeChild(this.arrImages[1]);
        var divContent = document.getElementById('content');
        divContent.removeChild(this.EdibleFruit);

        // TODO: By the moment just clean. In the future remove the correct element. Review this from John: http://ejohn.org/blog/javascript-array-remove/
        ediblefruit = [];
    }

//
//
//
EdibleFruit.prototype.Show =
    function()
    {
        this.EdibleFruit.style.visibility = 'visible';
    }


//
//
//
EdibleFruit.prototype.SetCanBeEaten =
    function(value)
    {
        // Boolean to now if the ghost can be eaten
        this.canBeEaten = value;
    }

//
//
//
EdibleFruit.prototype.CanBeEaten =
    function()
    {
        // Boolean to now if the ghost can be eaten
        return this.canBeEaten;
    }

//
//
//
    EdibleFruit.prototype.Update =
    function(tick)
    {
        // Update the time transcurred
        this.tickAcum += tick;
        this.timeAcum += tick;

        if (this.tickAcum < this.fruitTick)
            return;
        this.tickAcum = 0;

        if (this.timeAcum >= this.edibleFruitTime)
        {
            // The fruit can't be eaten
            this.SetCanBeEaten(false);
            // Delete the fruit from the array
            this.Delete();
        }
    };

//
//
//
EdibleFruit.prototype.IsPacmanTouched =
    function( x, y )
    {
        var isKilled = false;

        // Verify if the Ghost Killed the pacman
        var x = pacmans[0].GetX();
        var y = pacmans[0].GetY();

        // TODO: Pacman is killed not just with x and y is exact the same
        //if ( x==this.x && y==this.y )
        //    isKilled = true;

        if (Math.abs(x - this.x) <= 1 && Math.abs(y - this.y) <= 1)
            isKilled = true;
        return isKilled;
    };

//
//
//
EdibleFruit.prototype.SetInPointMode =
    function()
    {
        // Hide the fruir image
        this.lastImageShowed.style.visibility = 'hidden';

        // Get the current image for the points. 100, 300, 500, 700, etc
        var currentImage = this.arrImages[1];

        // Show the image with the points
        currentImage.style.visibility = 'visible';

        // Store the last imaged showed.
        this.lastImageShowed = currentImage;
    };
