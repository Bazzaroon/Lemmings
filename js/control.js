class Control{
    constructor(scene, x, y){
        this.scene = scene;
        this.state = 'docked'; // docked or undocked
        this.control = [];
        this.controlactive = [];
        this.vStart = -35;
        this.TW;
        
        for(var i=0;i<3;i++){
            this.control.push(this.scene.add.image((155 + (i*40)), this.vStart,this.scene.src[i]));
            this.control[i].setInteractive();
            this.control[i].name = 'worker';
        }

        this.selectedIndex = -1;

        this.scene.input.on('pointerdown', this.show, this);
            
    }
    show(pointer, gameObject){
    if(gameObject[0].name == 'background'){
        this.finalpos = this.finalpos == 23 ? -35 : 23;
        this.TW = this.scene.tweens.add(
            {
                targets:this.control,
                y:this.finalpos,
                ease:'Linear',
                duration:500,
                repeat:0,
                yoyo:false
        },this);
        this.TW.play();
    }
    
        if(gameObject[0].name == 'worker'){
            this.reset();
            var key = gameObject[0].texture.key.replace('idle','active');
            gameObject[0].setTexture(key);
            this.scene.activeWorker = key;
        }
    }

    reset(){
        for(var k=0;k<this.control.length;k++){
            this.control[k].setTexture(this.scene.src[k]);
        }
    }

    close(){
        this.closeTW = this.scene.tweens.add({
            targets:this.control,
            duration:500,
            y:-35,
            repeat:0,
            yoyo:false
        }, this);
        this.closeTW.play();
    }

}