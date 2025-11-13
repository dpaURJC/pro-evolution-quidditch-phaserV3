class Level extends Phaser.Scene {
  constructor(){ super('Level'); }

  create(){
    this.add.tileSprite(0,0,800,600,'stadium1').setOrigin(0);
    this.music = this.sound.add('gameMusic', { loop: true }); 
    this.music.play();

    // Marcadores
    this.griff = this.add.sprite(10,10,'griffindor').setScale(0.5).setOrigin(0,0);
    this.score = 0;
    this.scoreText = this.add.text(
      this.griff.x + this.griff.displayWidth + 16, this.griff.y, '0',
      { font: '70px Arial', fill:'#000' }
    );

    // Jugador 1
    this.harry = this.physics.add.sprite(10, 515, 'harry').setScale(0.5);
    this.harry.setCollideWorldBounds(true);

    // Jugador 2 opcional (versus)
    if (ProEvolutionQuidditch.VERSUS) {
      this.sly = this.add.sprite(670,10,'slytherin').setScale(0.5).setOrigin(0,0);
      this.scoreDraco = 0;
      this.scoreDracoText = this.add.text(this.sly.x - 200, this.sly.y, '0', { font: '70px Arial', fill:'#000' });

      this.draco = this.physics.add.sprite(110,515,'draco').setScale(0.5);
      this.draco.setCollideWorldBounds(true);
    }

    // Crear snitch y arrancar el temporizador de movimiento aleatorio
    this.createSnitch();
    this.startSnitchJitter();   // ← NUEVO

    // Teclado
    this.keys = this.input.keyboard.addKeys({ W:'W', A:'A', S:'S', D:'D', I:'I', J:'J', K:'K', L:'L', ESC:'ESC' });
  }

  createSnitch(){
    // Si ya existía, destrúyala (por captura) para recrearla
    if (this.snitch) this.snitch.destroy();

    const x = Phaser.Math.Between(50, 750);
    const y = Phaser.Math.Between(50, 550);

    this.snitch = this.physics.add.sprite(x, y, 'snitch').setScale(0.5);
    this.snitch.body.setAllowGravity(false);

    // Overlaps
    this.physics.add.overlap(this.harry, this.snitch, () => this.catchSnitch('harry'));
    if (ProEvolutionQuidditch.VERSUS && this.draco) {
      this.physics.add.overlap(this.draco, this.snitch, () => this.catchSnitch('draco'));
    }
  }

  // ─────────────────────────────────────────────────────────────
  // NUEVO: temporizador y rutina de movimiento aleatorio (cada 500 ms)
  // ─────────────────────────────────────────────────────────────
  startSnitchJitter(){
    // Si ya hubiera un temporizador (reinicios), elimínelo
    if (this.snitchJitter) this.snitchJitter.remove(false);

    this.snitchJitter = this.time.addEvent({
      delay: 500,               // 0,5 s
      callback: this.jitterSnitch,
      callbackScope: this,
      loop: true
    });
  }

  jitterSnitch(){
    if (!this.snitch || !this.snitch.body) return;

    // Margen para no rozar bordes
    const pad = 40;
    const W = this.scale.width;
    const H = this.scale.height;

    const nx = Phaser.Math.Between(pad, W - pad);
    const ny = Phaser.Math.Between(pad, H - pad);

    // Tween suave hacia la nueva posición (≈350 ms)
    this.tweens.add({
      targets: this.snitch,
      x: nx,
      y: ny,
      duration: 350,
      ease: 'Sine.easeInOut'
    });
  }
  // ─────────────────────────────────────────────────────────────

  catchSnitch(who){
    if (who === 'harry') {
      this.score += 1;
      this.scoreText.setText(String(this.score));
      if (this.score === 3) return this.endLevel();
    } else {
      this.scoreDraco += 1;
      this.scoreDracoText.setText(String(this.scoreDraco));
      if (this.scoreDraco === 3) return this.endLevel();
    }
    this.sound.play('snitchSFX');
    this.createSnitch(); // el temporizador seguirá moviendo la nueva snitch
  }

  endLevel(){
    // Limpieza del temporizador antes de salir
    if (this.snitchJitter) {
      this.snitchJitter.remove(false);
      this.snitchJitter = null;
    }
    this.music.stop();
    this.scene.start('Ending');
  }

  update(){
    const v = 5;
    if (this.keys.ESC.isDown) this.scene.start('Menu');

    if (this.keys.W.isDown) this.harry.y -= v;
    if (this.keys.S.isDown) this.harry.y += v;
    if (this.keys.A.isDown) { this.harry.x -= v; this.harry.setScale(-0.5, 0.5); }
    if (this.keys.D.isDown) { this.harry.x += v; this.harry.setScale( 0.5, 0.5); }

    if (ProEvolutionQuidditch.VERSUS && this.draco) {
      if (this.keys.I.isDown) this.draco.y -= v;
      if (this.keys.K.isDown) this.draco.y += v;
      if (this.keys.J.isDown) { this.draco.x -= v; this.draco.setScale(-0.5, 0.5); }
      if (this.keys.L.isDown) { this.draco.x += v; this.draco.setScale( 0.5, 0.5); }
    }
  }
}
