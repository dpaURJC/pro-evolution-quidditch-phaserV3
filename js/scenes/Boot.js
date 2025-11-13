class Boot extends Phaser.Scene {
  constructor(){ super('Boot'); }
  preload(){
    this.load.image('loading1', 
      './assets/images/text/loading1.png');
  }
  create(){
    this.scene.start('Preload');
  }
}
