class Splash extends Phaser.Scene{
    constructor(){
        super('Splash')
    }
    preload(){
        this.load.image('lem', 'Assets/Images/lemming-brolly.png')
        this.load.image('title', 'Assets/Images/title.png');
        this.load.image('touch', 'Assets/Images/touchtoplay.png');
    }
    create(){
        this.add.image(175,300,'lem')
        this.add.image(185, 100, 'title');
        this.add.image(180, 450, 'touch');
        this.cameras.main.setBackgroundColor('#008040');

        this.input.on('pointerdown', function(){
            this.scene.launch('Main');
        },this);
    }
}