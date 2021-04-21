class SpaceshipBoss extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); //add to existing scene
        this.points = pointValue; //store pointValue
        this.moveSpeedX = game.settings.spaceshipSpeed * 2;  //pixels per frame
        this.moveSpeedY = game.settings.spaceshipSpeed;  //pixels per frame
    }

    update() {
        //move spaceship left
        this.x += this.moveSpeedX;
        this.y += this.moveSpeedY
        //wrap around from left to right edge
        if(this.x >= game.config.width - this.width){
            this.reset();
        }

        if(this.y <= borderUISize*4) {
            this.moveSpeedY *= -1
        }
        else if(this.y >= borderUISize*6 + borderPadding*4 + 60) {
            this.moveSpeedY *= -1
        }
    }

    //position reset
    reset() {
        this.x = 0;
    }
}