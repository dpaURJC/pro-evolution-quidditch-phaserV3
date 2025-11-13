class Menu extends Phaser.Scene {
  constructor(){ super('Menu'); }
  create(){
    this.add.tileSprite(0,0,800,600,'background').setOrigin(0);
    this.add.sprite(400,125,'title').setScale(0.5).setOrigin(0.5);
    const start  = this.add.sprite(400,550,'start').setScale(0.5).setOrigin(0.5);
    const snitch = this.add.sprite(400,250,'snitch').setOrigin(0.5);

    this.tweens.add({ targets: snitch, y: '+=100', duration: 1000, yoyo: true, repeat: -1 });
    this.tweens.add({ targets: start,  alpha: { from: 0, to: 1 }, duration: 1000, yoyo: true, repeat: -1 });

    this.harry = this.add.sprite(50,250,'harry');
    this.draco = this.add.sprite(750,250,'draco').setScale(-1,1);

    this.player1 = this.add.sprite(400,500,'player1').setScale(0.5).setOrigin(0.5).setVisible(true);
    this.player2 = this.add.sprite(400,500,'player2').setScale(0.5).setOrigin(0.5).setVisible(false);
    this.press1  = this.add.sprite(400,450,'press1').setScale(0.5).setOrigin(0.5).setVisible(false);
    this.press2  = this.add.sprite(400,450,'press2').setScale(0.5).setOrigin(0.5).setVisible(false);

    this.music  = this.sound.add('introMusic', { loop: true }); 
    this.music.play();
    this.oneSFX = this.sound.add('oneSFX');
    this.twoSFX = this.sound.add('twoSFX');

    this.keyS   = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.key1   = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    this.key2   = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
  }

  update(){
    if (Phaser.Input.Keyboard.JustDown(this.keyS)) {
      this.tweens.add({
        targets: this.music, // ver nota 3) abajo
        volume: 0, duration: 1200,
        onComplete: () => this.scene.start('Intro')
      });
    }
    if (Phaser.Input.Keyboard.JustDown(this.key1)) {
      this.oneSFX.play();
      this.player1.setVisible(true);  this.player2.setVisible(false);
      this.press1.setVisible(false);  this.press2.setVisible(true);
      ProEvolutionQuidditch.VERSUS = 0;
    }
    if (Phaser.Input.Keyboard.JustDown(this.key2)) {
      this.twoSFX.play();
      this.player1.setVisible(false); this.player2.setVisible(true);
      this.press1.setVisible(true);   this.press2.setVisible(false);
      ProEvolutionQuidditch.VERSUS = 1;
    }
  }
}
