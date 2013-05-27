//*******************************************************************************
// Author: Harry Guillermo Mendoza
// Email: hguillermo@yahoo.com
// All copyrights are reserved
// Date: 08/22/2008
// Web site: http://www.harryguillermo.com
//*******************************************************************************
//
//
// Game Manager definition 
//
//
var game;

function Game() {
    this.currentLevel = 1;
    this.nextTick = true;
    this.tick = 20;

    // Pacman ticks
    this.pacmanTicks = [80, 60, 40];
    // Ghost ticks
    this.ghostTicks = [100, 80, 60]

    // Acum to control the ghost in eatable mode
    this.acumGhostEatables = 0;
    this.areGhostEatables = false;

    // TODO: Put this variable in the setters and getters
    this.highScore = 0;
    this.currentScore = 0;

    this.currentLevelScore = 0;

    // Multiplier. This is to set the 200, 400, 800 and 1600 points when the pacman eat the ghost
    this.multiplier = 1;
    this.maxMultiplier = 8;

    // Boolean to know if the user got a extra life
    this.gotExtraLife = false;

    // To store the currents coinds to the user
    this.currentCoins = 0;

    // Boolean to know if we are in wait mode. This is expecting for user add a coin.
    this.waitMode = false;
}

//
//
//
Game.prototype.GetCurrentCoins =
    function() {
        return this.currentCoins;
    }

//
//
//
Game.prototype.UpdateCurrentCoins =
    function(value) {
        this.currentCoins += value;
    }

//
//
//
Game.prototype.GetWaitMode =
    function() {
        return this.waitMode;
    }

//
//
//
Game.prototype.SetWaitMode =
    function(value) {
        this.waitMode = value;
    }

//
//
//
Game.prototype.GetTick =
    function() {
        return this.tick;
    }

//
//
//
Game.prototype.SetNextTick =
    function(nextTick) {
        this.nextTick = nextTick;
    }

//
//
//
Game.prototype.SetAcumGhostEatables =
    function(tick) {
        this.acumGhostEatables = +tick;
    }

//
//
//
Game.prototype.ResetAcumGhostEatables =
    function() {
        this.acumGhostEatables = 0; ;
    }

//
//
//
Game.prototype.UpdateScore =
    function(addValue) {
        this.currentScore += addValue;
        this.currentLevelScore += addValue;

        // Set the score with digits
        score.SetTotalPoints(this.currentScore, this.highScore);
        if (this.currentScore >= this.highScore)
            this.highScore = this.currentScore;

        // Verify if the player get a extra life
        if (this.currentScore >= 5000 && !this.gotExtraLife) // 10000 Extra life
        {
            // Add one life
            pacmans[0].UpdateCurrentLifes(1);
            // Show the number of lifes in the screen
            life.ShowLifes(pacmans[0].GetCurrentLifes() - 1);
            // Play the sound of extra life
            soundPlayer.Play('extraPacman');

            this.gotExtraLife = true;
        }
    }

//
//
//
Game.prototype.ResetMultiplier =
    function() {
        this.multiplier = 1;
    }

//
//
//
Game.prototype.ResetScore =
    function() {
        this.currentScore = 0;

        // Reset the score with digits
        score.SetTotalPoints(0, this.highScore);
    }

//
//
//
Game.prototype.SetHighScore =
    function(value) {
        this.highScore = value;
    }

//
//
//
Game.prototype.GetHighScore =
    function() {
        return this.highScore;
    }


//
//
//
Game.prototype.GetCurrentLevelScore =
    function() {
        return this.currentLevelScore;
    }

//
//
//
Game.prototype.Load =
    function() {
        InitLoader();
        InitSounds();
        InitScore();
        InitCredit();
        InitMessage();
        InitLifes();
        InitFruits();
        InitInput();
        InitMaze();
        InitFood();
        InitGhosts();
        InitPacmans();
        InitEffects();

     //   InitEdibleFruit();
    };

//
//
//
Game.prototype.Play =
    function() {
    };

//
//
//
Game.prototype.SetTheGhostEatables =
    function(value) {
        // Change the monsters and set it like eatable or not.
        for (var i = 0; i < ghosts.length; i++) {
            ghosts[i].SetCanBeEaten(value);
            // This is for change the ghost iin the eatable mode from blue to white.
            if (value) ghosts[i].ResetTickAcumEatable();
        }

        // Set the boolean to control if the ghost are in eatable mode
        this.areGhostEatables = value; //true; TODO: This was a bug. The ghost must update this according to the value
        this.acumGhostEatables = 0;
    };
//
//
    //
/*
Game.prototype.SetFruitEatables =
    function(value) {
        // Change the monsters and set it like eatable or not.
        for (var i = 0; i < ediblefruit.length; i++) {
            ediblefruit[i].SetCanBeEaten(value);
            // This is for change the ghost iin the eatable mode from blue to white.
            //TODO
        }
    };
*/
//
//
//
    Game.prototype.GotoNextLevel =
    function() {
        food.Refresh();
        food.SetActualDots(0);

        // TODO: Verify if the need to run some effect.
        // TODO: Increase speed an AI to the ghosts.

        // Put the monster in normal mode
        for (var i = 0; i < ghosts.length; i++) {
            ghosts[i].SetInEyeMode(false);
            ghosts[i].SetCanBeEaten(false);
        }

        // TODO: Reset all the variables

        // Update the current level
        this.currentLevel++;
        this.currentLevelScore = 0;

        // Set the pacman and ghosts speed
        this.SetPacmanAndGhostsSpeed(this.currentLevel);

        // Update the fruits in the screen
        fruit.ShowFruits(this.currentLevel);

        // Continue the game.
        this.Continue();
    };

//
//
//
Game.prototype.New =
    function() {
        // Play the start sound
        soundPlayer.Play('startStage');

        // Reset the number of lives
        pacmans[0].SetCurrentLifes(3); // TODO: Parametrize the 3. LIFES

        // Show the number of lifes in the screen
        life.ShowLifes(pacmans[0].GetCurrentLifes());

        // Reset the points.
        this.ResetScore();

        // Refresh the food
        food.Refresh();
        food.SetActualDots(0);

        // Update the current level
        this.currentLevel = 1;

        // Update the fruits in the screen
        fruit.ShowFruits(this.currentLevel);

        // Reset the extra life flag
        this.gotExtraLife = false;

        // Reset the variables to control the eatable mode
        this.ResetAcumGhostEatables();
        this.areGhostEatables = false;

        // Set the pacman and ghosts speed
        this.SetPacmanAndGhostsSpeed(this.currentLevel);

        // Remove the messages from the screen
        message.CleanMessage();
        message.ShowMessage('readyplayer1');

        // Continue with the game after the start sound finish
        setTimeout('game.Continue()', 4300); // TODO: Fix this 4500. 4300 is the duration for the start stage sound
        setTimeout('message.CleanMessage();', 4300);
        setTimeout('game.ShowPacmanAndGhostDelay();', 3000);
    }

//
//
//
Game.prototype.SetPacmanAndGhostsSpeed =
    function(currentLevel) {
        var pacmanSpeed = currentLevel > this.pacmanTicks.length ?
                            this.pacmanTicks[this.pacmanTicks.length - 1] :
                            this.pacmanTicks[currentLevel - 1];
        var ghostsSpeed = currentLevel > this.ghostTicks.length ?
                            this.ghostTicks[this.ghostTicks.length - 1] :
                            this.ghostTicks[currentLevel - 1];

        // Set the speed for the pacman
        for (var i = 0; i < pacmans.length; i++)
            pacmans[i].SetTick(pacmanSpeed);

        // Set the speed for the pacman
        for (var i = 0; i < ghosts.length; i++)
            ghosts[i].SetTick(ghostsSpeed);
    }

//
//
//
    Game.prototype.ShowPacmanAndGhostDelay =
    function() {
        // Remove the messages from the screen
        message.CleanMessage();
        message.ShowMessage('ready');

        // Show the pacmans
        for (var i = 0; i < pacmans.length; i++) {
            pacmans[i].SetDefaultPosition();
            pacmans[i].Show();
        }

        // Show the ghosts
        for (var i = 0; i < ghosts.length; i++) {
            ghosts[i].SetDefaultPosition();
            ghosts[i].Show();
        }
/*
        for (var i = 0; i < ediblefruit.length; i++) {
            ediblefruit[i].SetDefaultPosition();
            ediblefruit[i].Hide();
        }
*/

        // Show the lifes minus 1. The current pacman is in the screen now.
        life.ShowLifes(pacmans[0].GetCurrentLifes() - 1);
    }

//
//
//
Game.prototype.Continue =
    function() {
        /**************************************/
        // Verify the number of pacman lifes. //
        /**************************************/
        if (pacmans[0].GetCurrentLifes() == 0) {
            // Show the game over message
            message.ShowMessage('gameover');

            // Go to the wait mode or input screen
            this.SetWaitMode(true);
            setTimeout('game.WaitMode()', 2000);

            return; // Finish the game
        }

        // Show the ghosts
        for (var i = 0; i < ghosts.length; i++) {
            // Reset all the control variables.
            ghosts[i].SetInDoorOfCave(false);
            // Not this value for the pink because it is outside the cave at the beginnig
            if (i != 3)
                ghosts[i].SetIsInTheCave(true);
            ghosts[i].SetInEyeMode(false);
            ghosts[i].SetCanBeEaten(false);
            ghosts[i].SetIsGoingUpOutside(false);
            ghosts[i].ResetCurrentHits();
            ghosts[i].ResetTickAcumEatable();

            ghosts[i].SetDefaultPosition();
            ghosts[i].Show();
        }
        ghosts[0].SetWaitToGetOutCave(true); //TODO: Maybe remove this 2 lines
        ghosts[2].SetWaitToGetOutCave(true);

        // Show the pacmans
        for (var i = 0; i < pacmans.length; i++) {
            pacmans[i].SetDefaultPosition();
            pacmans[i].Show();
        }

        // Continue with the game
        this.nextTick = true;

        // Set the last key pressed
        input.SetLastKeyPressed('left');

        // Set the next update for the game. This is the wait after to star the game again.
        setTimeout('game.Run()', 200); // TODO: Fix this 1000. Maybe global variable
    };


//
// Main loop
//
    Game.prototype.Run =
    function() {
        // Update the sounds time acums
        //soundPlayer.Update( this.tick ); // TODO: Maybe remove this
        soundPlayer.PlayLoop();

        // Update the acum for ghost in the eatable mode
        if (this.areGhostEatables) {
            this.acumGhostEatables += this.tick;
            if (this.acumGhostEatables >= 8600) // TODO: Parametrize the 8600
            {
                this.ResetAcumGhostEatables();
                game.SetTheGhostEatables(false);
                // Reset the multiplier. This is to control the 200, 400, 800 and 1600 points
                game.ResetMultiplier();

                this.areGhostEatables = false;
            }
        }

        /********************************************/
        // Update the pacmans in the screen         //
        /********************************************/
        for (var i = 0; i < pacmans.length; i++)
            pacmans[i].Update(this.tick);

        /********************************************/
        // Update the ghosts position in the screen //
        /********************************************/
        for (var i = 0; i < ghosts.length; i++) {
            ghosts[i].Update(this.tick);
            if (ghosts[i].IsPacmanTouched() && !ghosts[i].IsInEyeMode()) {
                // If the ghost can be eaten change the state to the eye
                if (ghosts[i].CanBeEaten()) {
                    // Hide the current pacman while we show the points in the screen
                    pacmans[0].Hide();

                    // TODO: Increase the points. Parametrize this.
                    var bonus = 200 * this.multiplier;
                    game.UpdateScore(bonus);
                    // Set the ghost in the point mode.
                    ghosts[i].SetInPointMode(bonus);

                    this.multiplier = this.multiplier * 2;
                    if (this.multiplier > this.maxMultiplier)
                        this.ResetMultiplier(); // To 1 again

                    // Set the ghost in the eye mode
                    setTimeout('ghosts[' + i + '].SetInEyeMode( true );', 500); // ORI CODE ghosts[i].SetInEyeMode( true )

                    // Do a sound when the ghost is eaten
                    soundPlayer.Play('ghostEaten');

                    // Update the game after 800ms. TODO: change this. It looks there is an error when pacman eats 2 ghost close
                    setTimeout('game.Run()', 800); // 1200 works ok
                    // Show the pacman after 800 ms
                    setTimeout('pacmans[0].Show();', 800)

                    // TODO: By the moment break but it must be setTimeout
                    return;
                }
                else {
                    /**********************************/
                    // The pacman just die            //
                    /**********************************/
                    // Stop all the sounds
                    soundPlayer.StopAll();
                    // Set the ghost in normals
                    this.SetTheGhostEatables(false);
                    // The pacman just die
                    pacmans[0].UpdateCurrentLifes(-1);
                    // Show the number of lifes in the screen
                    //setTimeout('life.ShowLifes( pacmans[0].GetCurrentLifes()-1 );', 1000 ); // TODO: I put this at the end of the dying effect.
                    // Show the effect 1 seconds after the dead
                    setTimeout('effectManager.Run( "pacmanDying" )', 1000);
                    //effectManager.Run( 'pacmanDying' );
                    this.nextTick = false;
                }
            }
        }

        /**********************************************************************/
        // Update the food in the maze. It will be 0 at the end of the level.
        /**********************************************************************/
        food.Update(this.tick);

/*
        if (food.GetActualDots() >= 10) {
            if (ediblefruit[0] == null) {
                InitEdibleFruit();
                ediblefruit[0].SetDefaultPosition();
                this.SetFruitEatables(true);
            }
            else {
                ediblefruit[0].Update(this.tick);
                if (ediblefruit[0].IsPacmanTouched() && ediblefruit[0].CanBeEaten()) {
                    this.SetFruitEatables(false);
                    ediblefruit[0].Hide();
                }
            }
        }
*/
/*
        for (var i = 0; i < ediblefruit.length; i++) {
            ediblefruit[i].Update(this.tick);
            if (ediblefruit[i].CanBeEaten()) {
                if (ediblefruit[i].IsPacmanTouched()) {
                    ediblefruit[i].Hide();
                    this.SetFruitEatables(false);
                }
            }
            else {
                if (food.GetActualDots() >= 3) {
                    this.SetFruitEatables(true);
                    ediblefruit[i].Show();
                }
            }

        }
*/
        /**********************************************************************/
        // Verify if the pacman has eatean all the dots
        /**********************************************************************/
        if (food.GetActualDots() == food.GetTotalDots()) {
            // Cancel all the sounds
            soundPlayer.StopAll();

            // Show the effect 1 seconds after finish with the maze
            setTimeout('effectManager.Run( "mazeBlinking" )', 1000);

            //this.GotoNextLevel();   // TODO: Possible bug. I'm calling this.GotoNextLevel()method and from that method I'm calling this. Recursive??
            setTimeout('game.GotoNextLevel();', 3000); // 3000= 1000+ 1800+ 200 ( wait time + effect duration + delay)

            return;
            //this.nextTick = false; // TODO: Maybe this is not necessary
        }

        /****************************************************************/
        // If we can continue running execute the next tick in the game //
        /****************************************************************/
        if (this.nextTick) {
            // Set the next update for the game
            setTimeout('game.Run()', this.tick);
        }
    };


//
//
//
Game.prototype.WaitMode =
    function() {
        // Set the wait mode in true
        this.SetWaitMode(true);

        // Show the actual coins in the screen
        credit.SetTotalCoins(this.GetCurrentCoins());

        // Set the high score
        score.SetHighScore(this.GetHighScore());

        // Run the effect to wait the user input
        effectManager.Run('inputScreen');
    };    