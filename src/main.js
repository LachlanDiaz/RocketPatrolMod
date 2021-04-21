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