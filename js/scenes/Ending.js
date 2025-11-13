class Ending extends Phaser.Scene {
  constructor(){ super('Ending'); }

  create(){
    const { width: W, height: H } = this.scale;

    // Fondo (ajústelo a tileSprite o image según su asset)
    const bg = this.add.tileSprite(0, 0, W, H, 'background2').setOrigin(0);

    // Trofeo (centrado superior) + rótulo "winner" (centro inferior)
    this.trophy = this.add.image(W * 0.5, H * 0.25, 'trophy').setOrigin(0.5);
    this.fitSprite(this.trophy, W * 0.35, H * 0.30);

    this.winner = this.add.image(W * 0.5, H * 0.60, 'winner').setOrigin(0.5).setAlpha(0);
    this.fitSprite(this.winner, W * 0.60, H * 0.18);
    this.tweens.add({ targets: this.winner, alpha: 1, duration: 900, yoyo: true, repeat: -1 });

    // Botón existente de retorno al menú (si lo tiene)
    this.btn = this.add.image(W * 0.5, H * 0.80, 'return')
      .setOrigin(0.5).setInteractive({ useHandCursor: true });
    this.fitSprite(this.btn, W * 0.30, H * 0.10);
    this.btn.on('pointerdown', () => this.scene.start('Menu'));

    // ─────────────────────────────────────────────────────────────
    // NUEVO: Botón textual para ir a la PÁGINA INICIAL + atajo H
    // ─────────────────────────────────────────────────────────────
    const homeLabel = 'Ir a la página inicial (H)';
    this.homeText = this.add.text(W * 0.5, H * 0.90, homeLabel, {
      font: '20px Arial',
      fill: '#ffffff',
      backgroundColor: 'rgba(0,0,0,0.45)',
      padding: { left: 12, right: 12, top: 6, bottom: 6 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    // Click → navegar a la página inicial
    this.homeText.on('pointerdown', () => this.goHome());

    // Atajo de teclado H
    this.keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);

    // Temporizador opcional (si UI.AUTO_HOME_AFTER_MS > 0)
    if (UI.AUTO_HOME_AFTER_MS > 0) {
      this.time.delayedCall(UI.AUTO_HOME_AFTER_MS, () => this.goHome());
    }
    // ─────────────────────────────────────────────────────────────

    // SFX de victoria
    this.sound.play('winSFX');

    // Soporte de *resize* (si usa modo FIT + CENTER_BOTH)
    this.scale.on('resize', this.onResize, this);
  }

  update(){
    // Atajo H → página inicial
    if (Phaser.Input.Keyboard.JustDown(this.keyH)) {
      this.goHome();
    }
  }

  // Navegación a la página inicial
  goHome(){
    try {
      window.location.href = UI.HOMEPAGE_URL;
    } catch (e) {
      // Fallback: recargar
      window.location.reload();
    }
  }

  // Ajuste proporcional para no salirse de pantalla
  fitSprite(sprite, maxW, maxH) {
    const sw = sprite.width, sh = sprite.height;
    if (!sw || !sh) return;
    const k = Math.min(maxW / sw, maxH / sh, 1);
    sprite.setScale(k);
  }

  // Recolocación/reescalado en *resize*
  onResize(gameSize) {
    const W = gameSize.width, H = gameSize.height;
    const bg = this.children.list.find(o => o.texture && o.texture.key === 'background2');
    if (bg && bg.setSize) bg.setSize(W, H);

    this.trophy.setPosition(W * 0.5, H * 0.25);
    this.fitSprite(this.trophy, W * 0.35, H * 0.30);

    this.winner.setPosition(W * 0.5, H * 0.60);
    this.fitSprite(this.winner, W * 0.60, H * 0.18);

    this.btn.setPosition(W * 0.5, H * 0.80);
    this.fitSprite(this.btn, W * 0.30, H * 0.10);

    this.homeText.setPosition(W * 0.5, H * 0.90);
  }
}
