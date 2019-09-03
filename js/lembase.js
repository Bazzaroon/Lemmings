var hoop = false;
class LemBase extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setTexture('lemming');
        this.setPosition(x,y);
        this.body.offset.x = 5;
        this.scene = scene;
        this.speed = 0.5;
        this.vpos = 0;
        this.setInteractive();
        this.animation = 'walking';
        this.animStarted = false;
        this.hasboinged = true;
         this.create();
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
        this.wallcollider = this.scene.physics.add.collider(this, this.scene.wall, this.changedirection, null, this);
        
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
            
        this.scene.anims.create(
            {
                key:'die',
                frames:this.scene.anims.generateFrameNumbers('lemming', {start:33, end:39}),
                frameRate:17,
                repeat:0

        },this);

        this.scene.anims.create(
            {
                key:'floater',
                frames:this.scene.anims.generateFrameNumbers('brolly', { start:0, end:4}),
                frameRate:17,
                repeat:0
        },this);

        this.scene.input.on('pointerdown', this.setWorker, this);

        this.on('animationcomplete', function(err, obj){
            if(this.animation == 'blockstart'){
                this.animation = 'foottap';
            }
        },this);
    
    }

    preUpdate(time,delta){
        super.preUpdate(time,delta);

        if(this.anims == undefined) return;
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
            
            if(this.y > (this.vpos + 70) && !this.hasboinged && this.name == 'walker'){
                this.anims.play('die');
                this.animation = 'die';
                this.scene.yippee.play();
                this.hasboinged = true;
            }
        } 
        

    }
    walkon(obj,obj2){
        obj.anims.play(this.animation, true);
        this.vpos = this.y;
        this.hasboinged = false;
        if(this.anims.currentAnim.key == 'die'){
            this.on('animationcomplete', function(anim, frame){
                if(frame.index >= 7){
                    if(obj.scene != undefined){ obj.scene.diesound.play()};
                    this.destroy();
                }
            },this)
        }
    }

    TouchControl(pointer, gameObject){


    }
    
    setWorker(pointer, gameObject){

        if(gameObject[0].name == 'walker') {
            switch(this.scene.activeWorker){
                case 'blocker-active':
                    this.setBlocker(gameObject[0]);
                    this.scene.test.close();
                    break;
                case 'brolly-active':
                    this.setFloater(gameObject[0]);
                    this.scene.test.close();
                    break;    
            }
        } else {
            if(gameObject[0].name == 'blocker'){
                this.setBlocker(gameObject[0]);
            }
        }
    }

    setBlocker(gObj){
            if(gObj.name == 'walker' && this.data == gObj.data){
                this.animation = 'blockstart';
                this.anims.play('blockstart', true);
                this.name = 'blocker';
                 
                this.bcol = this.scene.physics.add.collider(this, this.scene.lems, this.changedirection, null, this);
            } else {
                if(gObj.name == 'blocker' && this.data == gObj.data){
                    this.animation = 'walking';
                    this.anims.play('walking', true);
                    this.name = 'walker';
                    this.bcol.destroy();
            }
        }
    }

    setFloater(gObj){
        if(gObj.name == 'walker'){
            this.animation = 'floater';
            this.anims.play('floater', true);
            this.name = 'floater';
            this.body.offset.y = 15;
            this.on('animationcomplete', function(anim, frame){
                if(frame.index >= 4){
                    this.animation = 'walking';
                    this.anims.play('walking', true);
                    this.body.offset.y = 0;
                    this.name = 'walker';
                }
            }, this);

        }
    }

    
    changedirection(a,b){
        if(a.name == 'walker'){
            this.toggleFlipX();
            this.speed = -this.speed;
        }
    }

    

}