var hoop = false;
class LemBase extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setTexture('lemming');
        this.setPosition(x,y);
        this.scene = scene;
        this.create();
        this.speed = 0.5;
        this.vpos = 0;
        this.setInteractive();
        this.animation = 'walking';
        this.animStarted = false;
    }
    
    create(){
       
        var config = {
            key:'walking',
            frames:this.scene.anims.generateFrameNumbers('lemming', { start:0, end:12}),
            frameRate:17,
            yoyo:false,
            repeat:-1
        }
        this.scene.anims.create(config);

        this.wCollider = this.scene.physics.add.collider(this, this.scene.platforms, this.walkon, null, this);
 
        this.scene.anims.create(
            { 
                key:'blockstart', 
                frames:this.scene.anims.generateFrameNumbers('lemming', { start: 13, end:32}),
                frameRate:17,
                repeat:0    
            }, this);

        this.scene.anims.create(
            {
                key:'foottap',
                frames:this.scene.anims.generateFrameNumbers('lemming',{ start:19, end:32}),
                frameRate:17,
                repeat:-1
            }, this);    

        this.scene.input.on('pointerdown', this.setLemmingType, this);

        this.on('animationcomplete', function(err, obj){
            if(this.animation == 'blockstart'){
                this.animation = 'foottap';
            }
        },this);
    
    }

    preUpdate(time,delta){
        super.preUpdate(time,delta);
        if(this.anims.isPlaying && this.animation == 'walking'){
            this.setPosition(this.x += this.speed, this.y);
        }
        if(this.x > this.scene.physics.world.bounds.width){
            this.speed = -this.speed;
            this.toggleFlipX();
        }
        if(this.x < this.scene.physics.world.bounds.x){
            this.speed = 0.5;
            this.toggleFlipX();
        }
        if(this.y > this.vpos){
            this.anims.stop();
         } 
        

    }
    walkon(obj,obj2){
        obj.anims.play(this.animation, true);
        this.vpos = this.y;
    }

    setLemmingType(pointer, gameObject){
        if(gameObject[0].name == 'walker' && this.data == gameObject[0].data){
            this.animation = 'blockstart';
            this.anims.play('blockstart', true);
            this.name = 'blocker';
            this.bcol = this.scene.physics.add.collider(this, this.scene.lems, this.changedirection, null, this);
        } else {
            if(gameObject[0].name == 'blocker' && this.data == gameObject[0].data){
                this.animation = 'walking';
                this.anims.play('walking', true);
                this.name = 'walker';
                this.bcol.destroy();
        }
    }

    }
    changedirection(a,b){
        if(b.name == 'walker'){
            b.toggleFlipX();
            b.speed = -this.speed;
        }
    }

    

}