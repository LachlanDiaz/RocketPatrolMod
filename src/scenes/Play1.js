class Play1 extends Phaser.Scene {
    constructor() {
        super("playScene1");
    }

    preload() {
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('planetbackground', './assets/planetbackground.png');
        this.load.image('asteriods', './assets/asteriods.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });
        this.load.spritesheet('EnemyShip', './assets/EnemyShip.png', {
            frameWidth: 64,
            frameHeight: 64,
            startFrame: 0,
            endFrame: 4
        });
        this.load.spritesheet('bordertop', './assets/bordertop.png', {
            frameWidth: 640,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 3
        });
        this.load.spritesheet('borderside', './assets/borderside.png', {
            frameWidth: 32,
            frameHeight: 480,
            startFrame: 0,
            endFrame: 3
        });
    }

    create() {
        //place starfield
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield').setOrigin(0, 0);
        this.planetbackground = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'planetbackground').setOrigin(0, 0);
        this.asteriods = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'asteriods').setOrigin(0, 0);

        
        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 9,
                first: 0
            }),
            frameRate: 30
        });

        this.anims.create({
            key: 'EnemyShip',
            frames: this.anims.generateFrameNumbers('EnemyShip', {
                start: 0,
                end: 4,
                first: 0
            }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'bordertop',
            frames: this.anims.generateFrameNumbers('bordertop', {
                start: 0,
                end: 2,
                first: 0
            }),
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: 'borderside',
            frames: this.anims.generateFrameNumbers('borderside', {
                start: 0,
                end: 2,
                first: 0
            }),
            frameRate: 3,
            repeat: -1
        });
        

        // add rocket (player 1)
        this.p1Rocket = new Rocket1(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'EnemyShip', 0, 30).setOrigin(0,0);
        this.ship01.anims.play('EnemyShip');
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'EnemyShip', 0, 20).setOrigin(0,0);
        this.ship02.anims.play('EnemyShip');
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'EnemyShip', 0, 10).setOrigin(0,0);
        this.ship03.anims.play('EnemyShip');

        //green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width,
            borderUISize * 2, 0x00FF00).setOrigin(0,0);
    
        //boarders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.top = this.add.sprite(320, 16, 'bordertop');
        this.top.anims.play('bordertop');
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.bot = this.add.sprite(320, game.config.height - 16, 'bordertop');
        this.bot.anims.play('bordertop');
        this.add.rectangle(0,0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        this.leftside = this.add.sprite(16, 240, 'borderside');
        this.leftside.anims.play('borderside');
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        this.leftside = this.add.sprite(game.config.width - 16, 240, 'borderside');
        this.leftside.anims.play('borderside');


        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Consolas',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'left',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 170
        }

        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        this.timerRight = this.add.text(game.config.width - borderUISize - borderPadding - 120, borderUISize + borderPadding*2, "Time:" + this.clock.getElapsedSeconds(), scoreConfig);

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, "Score:" + this.p1Score, scoreConfig);
    }

    update() {

        this.timeLeft = Math.trunc(60 - this.clock.getElapsedSeconds());
        this.timerRight.text = "Time:" + this.timeLeft;
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
        this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        this.starfield.tilePositionX -= starSpeed;
        this.planetbackground.tilePositionX -= .5;
        this.asteriods.tilePositionX += .75;
        this.asteriods.tilePositionY -= 1;

        if (!this.gameOver) {
            //update rocket and ships
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }

        //check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
    }

    checkCollision(rocket, ship) {
        //simple AABB checking
        if(rocket.x < ship.x + ship.width &&
            rocket.x - rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        //temporarily hide ship
        ship.alpha = 0;
        //create explosion animation at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        //score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = "Score: " + this.p1Score;
        this.sound.play('sfx_explosion');
    }
}