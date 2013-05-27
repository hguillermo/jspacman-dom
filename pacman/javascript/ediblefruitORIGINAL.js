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
function InitEdibleFruit() {
    ediblefruit.push(new EdibleFruit('cherry', 'cherry', 12, 11, 200));
}

function EdibleFruit(fruitName, fruittype, x, y, score) {
    // Initialize the members for the ghost
    this.Initialize(fruitName, fruittype, x, y, score)
}

//
//
//
EdibleFruit.prototype.Initialize =
    function(fruitName, fruittype, x, y, score) {
        // Tick acum before to update the fruit
        this.tickAcum = 0;

        // Tick acum before to change to eatable from blue to white
        this.tickAcumEatable = 0;

        // Move the ghost after this acum is reached
        this.fruitTick = 120; // 125

        // Move the fruit after this acum is reached
        this.ediblefruitTick = 5000; // 125

        this.fruitScore = score;


        // Set the movements for the fruit in pixels
        this.xDeltafruitTick = 16;
        this.yDeltafruitTick = 16;


        // Set the Ghost name
        this.FruitName = fruitName;
        this.FruitType = fruittype;

        // Boolean to tell the ghost to wait in cave before exit
        this.foodEatenBeforeShow = 0;
        this.currentFoodEaten = 0;

        // Initial position in the maze
        this.iniX = x;
        this.iniY = y;

        // Actual position in the maze
        this.x = x;
        this.y = y;

        // Position in the screen
        this.xScreen = (x - 1) * 16 + 16; // 1 = 0 // TODO: Fix this 16
        this.yScreen = (y - 1) * 16 + 72; // 448; // (28) // TODO: Fix this 16

        // Current ghost direction 
        this.currentDirFruit = 'right';


        // Boolean to now if the ghost can be eaten
        this.canBeEaten = true;


        // Current image number. This is to blink the ghost in the eaten mode. White to blue and so on...
        this.currentImageNumber = 0;

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


        // Add the images for the movement in normal mode plus eatable mode. Here are 12 images
        this.arrImages = [];
        this.arrDirection = ['u', 'd', 'r', 'l'];  // up, down, right and left
        this.arrState = ['o', 'c'];            // open or close
        /*
        for (var i = 0; i < this.arrDirection.length; i++) {
        for (var j = 0; j < this.arrState.length; j++) {
        var img = this.CreateImageElement(div);
        this.arrImages.push(img);
        }
        }
        */
        var img = this.CreateImageElement(div);
        this.arrImages.push(img);

        // Add the 200, 400, 800 and 1600 images
        var pointImg;
        switch (this.fruitScore) {
            case 200: pointImg = this.CreateImage('pacman/ghosts/200.gif');
                break;
            case 400: pointImg = this.CreateImage('pacman/ghosts/400.gif');
                break;
            case 800: pointImg = this.CreateImage('pacman/ghosts/800.gif');
                break;
            case 1600: pointImg = this.CreateImage('pacman/ghosts/1600.gif');
                break;
            default: pointImg = this.CreateImage('pacman/ghosts/200.gif');
                break;
        }

        div.appendChild(pointImg);
        this.arrImages.push(pointImg);

        // Set the last image showed. It will be useful to simulate the legs movement
        this.lastImageShowed = this.arrImages[0];

        // Add the Ghost images to the document
        //document.body.appendChild( div );
        var divContent = document.getElementById('content');
        divContent.appendChild(div);

        this.EdibleFruit = div;

        // Set the start position in the screen
        this.SetDefaultPosition();
        this.SetCanBeEaten(true);
    }
//
//
//
EdibleFruit.prototype.SetTick =
function(value) {
    this.fruitTick = value;
}

//
//
//
EdibleFruit.prototype.GetTick =
function() {
    return this.fruitTick;
}


EdibleFruit.prototype.GetScore =
function() {
    return this.fruitScore;
}


//
//
//
EdibleFruit.prototype.SetDefaultPosition =
    function() {
        // Position in the screen
        this.xScreen = (this.iniX - 1) * this.xDeltafruitTick + 16; // (x-1)*16, 1 = 0 // TODO: Fix this 16
        this.yScreen = (this.iniY - 1) * this.yDeltafruitTick + 72; // (y-1)*16, 448; // (28) // TODO: Fix this 16

        // Update the actual Position in the maze
        this.x = this.iniX;
        this.y = this.iniY;

        // Current pacman direction
        this.currentDirFruit = 'right'

        // Get the ghost image to show and show it
        var img = this.GetImageState(this.currentDirFruit);
        img.style.visibility = 'visible';

        // Update the ghost visual representation in the maze
        this.EdibleFruit.style.top = this.yScreen + 'px';
        this.EdibleFruit.style.left = this.xScreen + 'px';
    }


EdibleFruit.prototype.CreateImageElement =
    function(container) {

        //this.FruitType
        var fPNGType;
        switch (this.FruitType) {
            case "cherry": fPNGType = "1";
                break;
        }
        // Set the source
        var source = 'pacman/Fruits/' + fPNGType + '.png';

        // Create an image
        var img = this.CreateImage(source);

        // Add the Pacman to the maze
        container.appendChild(img);

        return img;
    };
//
//
//
EdibleFruit.prototype.CreateImage =
    function(source) {
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
EdibleFruit.prototype.Hide =
    function() {
        this.EdibleFruit.style.visibility = 'hidden';
        // TODO: Verify why if we hide the div the images are visible yet....???
        this.lastImageShowed.style.visibility = 'hidden';
    }

//
//
//
EdibleFruit.prototype.Show =
    function() {
        this.EdibleFruit.style.visibility = 'visible';
    }
//
//
//
EdibleFruit.prototype.SetCanBeEaten =
    function(value) {
        // Boolean to now if the ghost can be eaten
        this.canBeEaten = value;
        // Current image number. This is to blink the ghost in the eaten mode. White to blue and so on...
        this.currentImageNumber = 0;
    }
//
//
//
EdibleFruit.prototype.CanBeEaten =
    function() {
        // Boolean to now if the ghost can be eaten
        return this.canBeEaten;
    }

//
//
//
EdibleFruit.prototype.GetImageState =
    function(currentDir) {
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
        currentImage = this.arrImages[0];


        // Update the last image showed
        this.lastImageShowed = currentImage;

        // Return the images
        //return [imgopen, imgclose];
        return currentImage;
    };



//
//
//
    EdibleFruit.prototype.Update =
    function(tick) {

        // Update the time transcurred
        this.tickAcum += tick;

        if (this.tickAcum < this.fruitTick)
            return;

        this.tickAcum = 0;

        if (this.CanBeEaten()) {
            this.tickAcumEatable += tick;
            if (this.tickAcumEatable >= this.ediblefruitTick) {
                this.SetCanBeEaten(false);
                this.Hide();
                this.tickAcumEatable = 0;
            }
            else {
                if (this.CanBeEaten())
                    this.MoveRandom();
            }
        }

    };



//
//
//
EdibleFruit.prototype.IsPacmanTouched =
    function(x, y) {
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
    function() {
        this.lastImageShowed.style.visibility = 'hidden';

        var currentImage = this.arrImages[1];

        // Get the ghost image to show and show it
        var img = currentImage; // TODO: Put this line inside this method-->this.GetImageState( this.currentDirGhost ); 
        img.style.visibility = 'visible';

        this.lastImageShowed = currentImage;
    }


//
//
//
EdibleFruit.prototype.Move =
    function() {
        var dx = 0, dy = 0;
        var difx = this.xDeltafruitTick;
        var dify = this.yDeltafruitTick;

        if (this.x == 0 && this.y == 14) {
            this.x = 27;
            this.y = 14;
            this.xScreen = (this.x - 1) * this.xDeltafruitTick + 16; // TODO: Fix this 16
            this.yScreen = (this.y - 1) * this.yDeltafruitTick + 72; // TODO: Fix this 16
        }
        else if (this.x == 27 && this.y == 14) {
            this.x = 0;
            this.y = 14;
            this.xScreen = (this.x - 1) * this.xDeltafruitTick + 16; // TODO: Fix this 16
            this.yScreen = (this.y - 1) * this.yDeltafruitTick + 72; // TODO: Fix this 16
        }
        else {
            switch (this.currentDirFruit) {
                case 'up':
                    dx = 0; dy = -1 * dify;
                    break;
                case 'down':
                    dx = 0; dy = dify;
                    break;
                case 'left':
                    dx = -1 * dify; dy = 0;
                    break;
                case 'right':
                    dx = dify; dy = 0;
                    break;
            }

            this.xScreen += dx; //TODO: Ori was this.xScreen += dx;
            this.yScreen += dy; //TODO: Ori was this.yScreen += dy;
        }


        // Update the ghost visual representation in the maze
        this.EdibleFruit.style.top = this.yScreen + 'px'; // TODO: Fix this 16. this with the positio of the origin of the maze
        this.EdibleFruit.style.left = this.xScreen + 'px'; // TODO: Fix this 16. with the positio of the origin of the maze
    };




//
//
//
EdibleFruit.prototype.MoveRandom =
    function() {
        /*********************************************************************************/
        // Normal moves.
        /*********************************************************************************/
        if (this.IsIntersection()) {
            var nextStep = '';
            var newX = 0;
            var newY = 0;
            var x = this.x;
            var y = this.y;
            var found = false;

            // Try to go to the right or left
            if (this.currentDirFruit == 'up' || this.currentDirFruit == 'down') {
                var rand_no = Math.random();
                rand_no = (Math.ceil(rand_no * 100) % 2);

                if (rand_no == 0) {
                    // Try to go to the right
                    if (mazze[this.y][this.x + 1] == '..') {
                        this.currentDirFruit = 'right';
                        newX = x + 1; newY = y;
                        found = true;
                    }
                    else if (mazze[this.y][this.x - 1] == '..') {
                        this.currentDirFruit = 'left';
                        newX = x - 1; newY = y;
                        found = true;
                    }
                }
                else {
                    // Try to go to the left
                    if (mazze[this.y][this.x - 1] == '..') {
                        this.currentDirFruit = 'left';
                        newX = x - 1; newY = y;
                        found = true;
                    }

                    else if (mazze[this.y][this.x + 1] == '..') {
                        this.currentDirFruit = 'right';
                        newX = x + 1; newY = y;
                        found = true;
                    }
                }
            }
            //
            // Try to go to the up or down
            //
            if (!found) {
                var rand_no = Math.random();
                rand_no = (Math.ceil(rand_no * 100) % 2);

                if (rand_no == 0) {
                    // Try to go to the up
                    if (mazze[this.y - 1][this.x] == '..') {
                        this.currentDirFruit = 'up';
                        newX = x; newY = y - 1;
                    }
                    else if (mazze[this.y + 1][this.x] == '..') {
                        this.currentDirFruit = 'down';
                        newX = x; newY = y + 1;
                    }
                }
                else {
                    // Try to go to the down
                    if (mazze[this.y + 1][this.x] == '..') {
                        this.currentDirFruit = 'down';
                        newX = x; newY = y + 1;
                    }
                    else if (mazze[this.y - 1][this.x] == '..') {
                        this.currentDirFruit = 'up';
                        newX = x; newY = y - 1;
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
        switch (this.currentDirFruit) {
            case 'up':
                this.x = x; this.y = y - 1;
                break;
            case 'down':
                this.x = x; this.y = y + 1;
                break;
            case 'left':
                this.x = x - 1; this.y = y;
                break;
            case 'right':
                this.x = x + 1; this.y = y;
                break;
        }

        /**/
        // Move the ghost in the current direction
        this.Move();
    };



//
//
//
EdibleFruit.prototype.IsIntersection =
    function() {
        var isIntersection = false;

        // Get the current ghost position 
        var x = this.x;
        var y = this.y;

        var nextStep = ''
        var counter = 0;
        // Verify if the ghost can move in more than one direction.
        if (mazze[y - 1][x] == '..' && this.currentDirFruit != 'up') counter++;
        if (mazze[y + 1][x] == '..' && this.currentDirFruit != 'down') counter++;
        if (mazze[y][x - 1] == '..' && this.currentDirFruit != 'left') counter++;
        if (mazze[y][x + 1] == '..' && this.currentDirFruit != 'right') counter++;

        if (counter > 1)
            isIntersection = true;

        //alert('isIntersection='+isIntersection);
        // Return id the ghost is in one intersection or not
        return isIntersection;
    }