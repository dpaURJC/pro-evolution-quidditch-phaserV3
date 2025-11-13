// Intro.js — versión robusta con containers
class Intro extends Phaser.Scene {
  constructor(){ super('Intro'); }

  create(){
    const music = this.sound.add('versusMusic', { loop: true }); 
    music.play();
    this.add.tileSprite(0,0,800,600,'background2').setOrigin(0);

    // SINGLE
    const singleIntro = this.add.container();
    singleIntro.add([
      this.add.sprite(400,225,'referee').setOrigin(0.5),
      this.add.sprite(400,450,'cleangame').setScale(0.5).setOrigin(0.5)
    ]);

    // VERSUS
    const versusIntro = this.add.container();
    versusIntro.add([
      this.add.sprite(200,200,'griffindor').setOrigin(0.5),
      this.add.sprite(600,200,'slytherin').setOrigin(0.5),
      this.add.sprite(400,200,'vs').setScale(2).setOrigin(0.5),
      this.add.sprite(50,325,'harry'),
      this.add.sprite(750,325,'draco').setScale(-1,1)
    ]);

    singleIntro.setVisible(!ProEvolutionQuidditch.VERSUS);
    versusIntro.setVisible(!!ProEvolutionQuidditch.VERSUS);

    // Lógica de avance (SPACE) dentro de update()
    this.modeStep = ProEvolutionQuidditch.VERSUS ? 1 : 0;
    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.fadeToLevel = () => {
      this.tweens.add({
        targets: music, // ver nota 3) abajo
        volume: 0,
        duration: 1000,
        onComplete: () => this.scene.start('Level')
      });
    };

    this.toggleToSingle = () => {
      singleIntro.setVisible(true);
      versusIntro.setVisible(false);
    };
  }

  update(){
    if (Phaser.Input.Keyboard.JustDown(this.space)) {
      if (this.modeStep-- > 0) {
        this.toggleToSingle();
      } else {
        this.fadeToLevel();
      }
    }
  }
}
