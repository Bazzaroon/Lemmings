class Main extends Phaser.Scene{
    constructor(){
        super('Main');
        this.lems = [];
    };

    preload(){
        this.load.spritesheet('lemming', 'Assets/Sprites/lemmings2.png',{frameWidth:38, frameHeight:38});
        this.load.spritesheet('blocker', 'Assets/Sprites/blocker.png',{frameWidth:100, frameHeight:113});
        this.load.image('ground', 'Assets/Images/ground.png');
        this.load.image('ball', 'Assets/Images/ball.png');
    };

    create(){
         this.cameras.main.setBackgroundColor('#74c6e0');

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(180, 633, 'ground').refreshBody;
        this.platforms.create(40, 200, 'ground').refreshBody;
        this.platforms.create(280, 300, 'ground').refreshBody;
        this.platforms.create(40, 450, 'ground').refreshBody;

        var T = this.time.addEvent({
            delay:1000,
            callback:this.dropLemming,
            repeat:12,
            callbackScope:this,
        }, this);
        
        
        


    };
    update(){

    };

    dropLemming(){
        this.lems.push(new LemBase(this, 30, 50));
        this.lems[this.lems.length-1].data = 'L' + String(this.lems.length-1);
        this.lems[this.lems.length-1].name = 'walker';
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
            debug: true,
            gravity: {
                y:100
            }
        }
    },
    scene: [Main]
    
};

var game = new Phaser.Game(config);
