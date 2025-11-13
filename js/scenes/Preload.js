class Preload extends Phaser.Scene {
  constructor(){ super('Preload'); }
  preload(){
    const loading = this.add.sprite(this.scale.width/2, 360, 'loading1').setScale(0.5);
    this.tweens.add({ targets: loading, alpha: { from: 0.2, to: 1 }, duration: 800, yoyo: true, repeat: -1 });

    // Música
    this.load.audio('introMusic',  './assets/music/intro.mp3');
    this.load.audio('versusMusic', './assets/music/versus.mp3');
    this.load.audio('gameMusic',   './assets/music/game.mp3');

    // SFX
    this.load.audio('winSFX',   './assets/audio/youwin.ogg');
    this.load.audio('oneSFX',   './assets/audio/1.ogg');
    this.load.audio('twoSFX',   './assets/audio/2.ogg');
    this.load.audio('snitchSFX','./assets/audio/snitch.ogg');

    // Imágenes
    const img = './assets/images/';
    this.load.image('title',    img + 'text/title.png');
    this.load.image('player1',  img + 'text/player1.png');
    this.load.image('player2',  img + 'text/player2.png');
    this.load.image('press1',   img + 'text/press1.png');
    this.load.image('press2',   img + 'text/press2.png');
    this.load.image('start',    img + 'text/start.png');
    this.load.image('vs',       img + 'text/vs.png');
    this.load.image('cleangame',img + 'text/cleangame.png');
    this.load.image('winner',   img + 'text/winner.png');
    this.load.image('return',   img + 'text/return.png');

    this.load.image('griffindor', img + 'griffindor.png');
    this.load.image('slytherin',  img + 'slytherin.png');
    this.load.image('harry',      img + 'harry.png');
    this.load.image('draco',      img + 'draco.png');
    this.load.image('referee',    img + 'referee.png');
    this.load.image('snitch',     img + 'snitch.png');
    this.load.image('trophy',     img + 'trophy.png');

    const bg = img + 'background/';
    this.load.image('background',  bg + 'background.png');
    this.load.image('background2', bg + 'background2.png');
    this.load.image('stadium1',    bg + 'stadium1.png');
  }
  create(){ this.scene.start('Menu'); }
}
