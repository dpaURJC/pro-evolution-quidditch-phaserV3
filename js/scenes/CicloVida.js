class MyScene extends Phaser.Scene {
  constructor(){ super('MyScene'); }
  init(data){ /* preparar estado */ }
  preload(){ /* this.load.image/audio/... */ }
  create(){  /* this.add.sprite/text/... */ }
  update(time, delta){ /* bucle del juego */ }
}
