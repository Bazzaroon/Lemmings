class Control{
    constructor(scene, x, y){
        this.scene = scene;
        this.state = 'docked'; // docked or undocked
        this.control = [];
        this.vStart = -35;
        for(var i=0;i<this.scene.src.length;i++){
            this.control.push(this.scene.add.image((160 + (i*32)), this.vStart,this.scene.src[i]));
            this.control[i].setInteractive();
        }
        this.selectedIndex = -1;

        this.scene.input.on('pointerdown', this.show, this)    
    }
    show(pointer, gameObject){
        var finalpos = finalpos == 20 ? -35 : 20;
        var TW = this.scene.tweens.add(
            {
                targets:this.control,
                y:finalpos,
                ease:'Linear',
                duration:500,
                repeat:0,
                yoyo:false
        },this);
        TW.play();
    }

}