const GAME_W = 800, GAME_H = 600;

const ProEvolutionQuidditch = { DEBUG: 0, VERSUS: 0 };

// URL a la que quieres volver al final (puede ser './index.html', './', o una URL externa)
const UI = {
  HOMEPAGE_URL: './',      // Página inicial del sitio (ajústelo a su caso)
  AUTO_HOME_AFTER_MS: 5000    // 0 = desactivado. Ej.: 15000 = volver a inicio a los 15 s
};


const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: { default: 'arcade', arcade: { gravity: { y: 0 }, debug: false } },
  scene: [Boot, Preload, Menu, Intro, Level, Ending],
  scale: {
    mode: Phaser.Scale.FIT,              // ajusta manteniendo aspecto
    autoCenter: Phaser.Scale.CENTER_BOTH // centra el lienzo en la página
  },
  scene: [Boot, Preload, Menu, Intro, Level, Ending]
};


window.addEventListener('load', () => new Phaser.Game(config));



