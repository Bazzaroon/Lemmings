class Main extends Phaser.Scene{
    constructor(){
        super('Main');
        this.lems = [];
        this.src = ['digger-idle','blocker-idle','brolly-idle','digger-active','blocker-active','brolly-active'];
        this.activeWorker = '';
    };

    preload(){
        this.load.spritesheet('lemming', 'Assets/Sprites/lemmings2.png',{frameWidth:38, frameHeight:38});
        this.load.spritesheet('brolly', 'Assets/Sprites/brolly.png', {frameWidth:36, frameHeight:53});
        this.load.image('ground', 'Assets/Images/ground.png');
        this.load.image('ball', 'Assets/Images/ball.png');
        this.load.audio('letsgo', 'Assets/Sounds/letsgo.wav');
        this.load.audio('music', 'Assets/Sounds/bgmusic.mp3');
        this.load.audio('yippee', 'Assets/Sounds/yippee.wav');
        this.load.audio('oing', 'Assets/Sounds/oing.wav');
        this.load.audio('die', 'Assets/Sounds/die.wav');
        this.load.image('gamebg', 'Assets/Images/gamebg.png');
        this.load.image('obstacle', 'Assets/Images/obstacle.png');
        this.load.image('groundshort', 'Assets/Images/groundshort.png');
        

        for(var p=0;p<this.src.length;p++){
            this.load.image(this.src[p], "Assets/Images/controlimages/" + this.src[p] + '.png');
        }
    };

    create(){
        this.cameras.main.setBackgroundColor('#74c6e0');
        this.bg = this.add.image(190, 330, 'gamebg');
        this.bg.setInteractive();
        this.bg.name = 'background';

        this.platforms = this.matter.add.staticGroup();
        this.platforms.create(180, 633, 'ground').refreshBody;
        this.platforms.create(40, 200, 'ground').refreshBody;
        this.platforms.create(280, 410, 'ground').refreshBody;
        this.platforms.create(40, 450, 'ground').refreshBody;
        this.platforms.create(150,555, 'groundshort').refreshBody;

        this.wall = this.physics.add.staticImage(150,350,'obstacle');
        //this.wall.body.allowGravity = false;
        
        var letsgo = this.sound.add('letsgo');
        var music = this.sound.add('music',{volume:0.2});
        this.yippee = this.sound.add('yippee');
        this.oing = this.sound.add('oing');
        this.diesound = this.sound.add('die');

        letsgo.play();
        
        this.test = new Control(this);


        var T = this.time.addEvent({
            delay:1000,
            callback:this.dropLemming,
            repeat:3,
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
        
    };


}

// Game setup --------------------------------------------
var config = {
    type:Phaser.AUTO,
    width:375,
    height:660,
    physics: {
        default: 'matter',
        arcade: {
            debug: true,
            gravity: {
                y:100
            }
        }
    },
    scene: [Splash, Main]
    
};

var game = new Phaser.Game(config);
