/* 
Name: Lachlan Diaz
Project Title: UFO Blaster
Date: 4/21/2021
Time Spent on Project: ~15hrs
*/

/*
POINT BREAKDOWN:
Implement a simultaneous two-player mode (30)
Create a new scrolling tile sprite for the background (5)
Display the time remaining (in seconds) on the screen (10)
Replace the UI borders with new artwork (10)
Create a new animated sprite for the Spaceship enemies (10)
Implement parallax scrolling (10)
Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
Implement a new timing/scoring mechanism that adds time to the clock for successful hits (20)

TOTAL: 115
*/




// game configureation
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play1, Play2, GameOver1, GameOver2]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let score = 0;
let starSpeed = 5;

//reserve keyboard bindings
let keyR, keyLEFT, keyRIGHT, keyUP, keyA, keyD, keyW;