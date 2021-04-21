class GameOver2 extends Phaser.Scene {
    constructor() {
        super("gameoverScene2");
    }

    create() {
        let overConfig = {
            fontFamily: 'Consolas',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }


        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

        
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Game Over', overConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Press (R) to Restart or ← for Menu', overConfig).setOrigin(0.5);
        overConfig.backgroundColor = '#00FF00';
        overConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Score: ' + score, overConfig).setOrigin(0.5);
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.start("playScene2");
            }
    
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
    }
}