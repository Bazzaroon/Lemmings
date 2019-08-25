class Main extends Phaser.Scene{
    constructor(){
        super('Main');
        this.lems = [];
    };

    preload(){
        this.load.spritesheet('lemming', 'Assets/Sprites/lemmings2.png',{frameWidth:38, frameHeight:38});
        this.load.spritesheet('blocker', 'Assets/Sprites/blocker.png',{frameWidth:100, frameHeight:113});
        this.load.spritesheet('blocker', 'Assets/Sprites/blocker.png',{frameWidth:100, frameHeight:113});
        this.load.spritesheet('brolly', 'Assets/Sprites/brolly.png', {frameWidth:36, frameHeight:53});
        this.load.image('ground', 'Assets/Images/ground.png');
        this.load.image('ball', 'Assets/Images/ball.png');
        this.load.audio('letsgo', 'Assets/Sounds/letsgo.wav');
        this.load.audio('music', 'Assets/Sounds/bgmusic.mp3');
        this.load.audio('yippee', 'Assets/Sounds/yippee.wav');
        this.load.audio('oing', 'Assets/Sounds/oing.wav');
        this.load.audio('die', 'Assets/Sounds/die.wav');
    };

    create(){
        this.cameras.main.setBackgroundColor('#74c6e0');

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(180, 633, 'ground').refreshBody;
        this.platforms.create(40, 200, 'ground').refreshBody;
        this.platforms.create(280, 300, 'ground').refreshBody;
        this.platforms.create(40, 450, 'ground').refreshBody;

        var letsgo = this.sound.add('letsgo');
        var music = this.sound.add('music',{volume:0.2});
        this.yippee = this.sound.add('yippee');
        this.oing = this.sound.add('oing');
        this.diesound = this.sound.add('die');

        letsgo.play();
        //music.play();
        //this.yippee.play();


        var T = this.time.addEvent({
            delay:1000,
            callback:this.dropLemming,
            repeat:2,
            callbackScope:this,
        }, this);
        
        
        


    };
    update(){

    };

    dropLemming(){
        this.lems.push(new LemBase(this, 30, 50));
        this.lems[this.lems.length-1].setData('L' + String(this.lems.length-1));
        this.lems[this.lems.length-1].name = 'walker';
        this.lems[this.lems.length-1].setInteractive();
        //this.physics.add.collider(this.lems[this.lems.length-1], this.platforms);

    };


}

// Game setup --------------------------------------------
var config = {
    type:Phaser.AUTO,
    width:375,
    height:660,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                y:100
            }
        }
    },
    scene: [Splash, Main]
    
};

var game = new Phaser.Game(config);
