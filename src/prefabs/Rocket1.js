//Rocket (player) prefab
class Rocket1 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        //add object to existing scene
        scene.add.existing(this);
        this.isFiring = false; //track firing status of 1
        this.moveSpeed = 4; //pixels per frame
        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
    }

    update() {
        //left/right movement
        if(!this.isFiring) {
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed
            }
        }
        //fire button
        if(Phaser.Input.Keyboard.JustDown(keyF) &&!this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play(); //play sfx
        }

        //if fired move the rocket up
        if(this.isFiring) {
            this.y -= this.moveSpeed;
        }

        if (this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }
    }

    // reset rocket to ground
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }

}