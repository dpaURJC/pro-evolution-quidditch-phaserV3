# Pro-Evolution-Quidditch con PhaserV3

Asignatura: Juegos para Web y Redes Sociales (Grado en Diseño y Desarrollo de Videojuegos, Universidad Rey Juan Carlos)
Autores: Daniel Palacios Alonso, Julio Guillén García, Raúl Fernández Ruiz, Nikola Hristov Kalamov

1. Descripción general

Este repositorio contiene un ejercicio resuelto con Phaser 3 pensado para la docencia universitaria. El proyecto muestra, de forma clara y modular, las partes esenciales de un juego 2D en la web: carga de recursos, escenas, entrada de usuario, tiempo/eventos, físicas Arcade y pantalla de cierre con salida a la página inicial.

Se ha diseñado para ser ejecutado en Visual Studio Code con Live Server (Go Live) sin necesidad de tooling adicional. El código y la estructura están orientados a que el alumnado pueda leer, ejecutar, modificar y evaluar cada bloque por separado.

2. Objetivos docentes

Presentar la arquitectura por escenas de Phaser 3 (Boot → Preload → Menu → Intro → Level → Ending).

Ilustrar la separación de responsabilidades: cargar en preload, instanciar/usar en create, lógica en update.

Practicar Arcade Physics con detecciones por overlap (coleccionables/disparadores) y apuntes sobre collider.

Mostrar tweens para micro-animaciones de interfaz y gestión de audio con fundidos (fade in/out).

Asegurar responsividad (escala/centrado) y accesibilidad de salida (botón + atajo de teclado).

3. Características principales

🔹 Phaser 3 (render automático WebGL/Canvas).

🔹 Escenas independientes (clases ES) para cada sección del flujo.

🔹 Físicas Arcade activadas y configuradas (sin gravedad global).

🔹 Snitch con movimiento aleatorio cada 500 ms (timer + tween).

🔹 Atajos de teclado:

Menú/Intro/Level: S, SPACE, ESC.

Movimiento: W A S D (Jugador 1) y I J K L (Jugador 2 opcional).

Ending: H para volver a la página inicial.

🔹 Escalado y centrado: Phaser.Scale.FIT + CENTER_BOTH.

🔹 Audio con fade entre escenas y disparo tras gesto del usuario.

4. Requisitos

Node.js no es imprescindible (se recomienda para alternativas a Live Server).

Visual Studio Code con extensión Live Server o un servidor estático sencillo:

npx http-server

python -m http.server

Navegador moderno (Chrome, Edge, Firefox) con soporte ES6.

5. Estructura del proyecto
/ (raíz del proyecto)
├─ index.html
├─ js/
│  ├─ main.js
│  └─ scenes/
│     ├─ Boot.js
│     ├─ Preload.js
│     ├─ Menu.js
│     ├─ Intro.js
│     ├─ Level.js
│     └─ Ending.js
├─ assets/
│  ├─ images/
│  │  ├─ background/
│  │  ├─ text/
│  │  └─ ... (sprites varios)
│  ├─ audio/
│  └─ music/
└─ .vscode/
   ├─ settings.json
   └─ launch.json

Notas importantes de rutas:

Usar rutas relativas (p. ej., ./js/..., ./assets/...) para que funcione con Live Server.

Evitar espacios y respetar mayúsculas/minúsculas (Linux es sensible).

6. Puesta en marcha
Opción A: VS Code + Live Server (recomendada)

Abrir la carpeta raíz del proyecto en VS Code.

Abrir index.html y pulsar Go Live (barra inferior).

El navegador se abrirá en http://localhost:5500/index.html (o puerto similar).

Opción B: Servidor estático alternativo
# http-server (Node)
npx http-server -p 5500

# o con Python
python -m http.server 5500

Abrir http://localhost:5500/index.html.

7. Configuración de Phaser 3 (resumen)

js/main.js:
const GAME_W = 800, GAME_H = 600;

const config = {
  type: Phaser.AUTO,
  width: GAME_W,
  height: GAME_H,
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 0 }, debug: false }
  },
  scene: [Boot, Preload, Menu, Intro, Level, Ending],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};

window.addEventListener('load', () => new Phaser.Game(config));

8. Flujo de escenas

Boot
Preparación mínima; arranca Preload.

Preload
Carga de imágenes y audio con this.load.*.
➜ No se instancian objetos de juego aquí.

Menu
Fondo, título, música en bucle.
Tween de parpadeo del botón Start y snitch “flotando”.
Tecla S para avanzar. Selección opcional 1/2 jugadores.

Intro
Presentación breve. Fade de música.
Tecla SPACE para continuar.

Level
Físicas Arcade: jugador (WASD), snitch móvil cada 500 ms (timer + tween).
Overlap para detectar capturas; marcador. ESC para volver al menú.

Ending
Pantalla final responsiva (posiciones relativas + autofit).
Botón y atajo H para volver a la página inicial.

9. Controles

Menú:

S: iniciar

1 / 2: modo 1P/2P (si está habilitado)

Juego (Level):

Jugador 1: W A S D

Jugador 2: I J K L (si está habilitado)

ESC: volver al menú

Ending:

Click en “Ir a la página inicial”

H: volver a la página inicial

10. Gestión de recursos y audio

Cargar en Preload.js con this.load.image(...), this.load.audio(...).

Instanciar/usar en create() de cada escena con this.add.* o this.physics.add.*.

Audio: reproducir tras gesto del usuario (exigencia de navegadores).

Transiciones: fade de volumen antes de cambiar de escena para evitar cortes bruscos.

11. Tweens y tiempo

Tween: interpolaciones declarativas (opacidad, posición, escala, volumen) para UI y micro-feedback.

Temporizadores (time.addEvent): acciones periódicas (p. ej., movimiento de la snitch cada 500 ms) o retardos para encadenar eventos/escenas.

12. Físicas Arcade (patrón básico)

Activadas en config.physics.

Crear cuerpos con this.physics.add.sprite(...).

overlap para detección sin bloqueo (coleccionables/disparadores).

collider para choque con respuesta (muros/obstáculos).

setCollideWorldBounds(true) para mantener visibilidad en el marco de juego.

Depuración: debug: true durante prácticas para ver hitboxes (desactivarlo en producción).

13. Responsividad y accesibilidad

Escala: Phaser.Scale.FIT + CENTER_BOTH (encaje proporcional y centrado).

UI responsiva: posiciones relativas al tamaño de la escena; autofit de sprites en Ending.

Salida accesible: botón visible + atajo de teclado (H) + temporizador opcional.

14. Estructura de código recomendada

Una clase por escena (Boot.js, Preload.js, Menu.js, Intro.js, Level.js, Ending.js).

Lógica de entrada: declarar teclas en create(), evaluar en update().

Evitar números mágicos: preferir cálculo relativo (this.scale.width/height).

Limpieza: detener música/tweens/timers al salir de la escena.

15. Solución de problemas (FAQ breve)

Pantalla en blanco / error “X is not defined”
Revise el orden de scripts en index.html: Phaser → escenas → main.js.

No suena la música
Los navegadores requieren gesto del usuario. Inicie la música tras pulsar una tecla/botón.

Assets no cargan / 404
Compruebe rutas relativas y mayúsculas/minúsculas.

Elementos “se salen” en Ending
Asegure scale: FIT + CENTER_BOTH y use posiciones relativas + autofit (ver Ending.js).

Solapes/colisiones “raras”
Active debug: true (temporalmente) y verifique tamaños/offsets de cuerpos.

17. Licencia

Este proyecto se distribuye bajo MIT License.
El texto completo de la licencia se incluye a continuación y debe acompañar a cualquier redistribución del software.

MIT License

Copyright (c) 2025 Daniel Palacios Alonso,
Julio Guillén García, Raúl Fernández Ruiz, Nikola Hristov Kalamov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

18. Créditos y agradecimientos

Asignatura: Juegos para Web y Redes Sociales (Grado en Diseño y Desarrollo de Videojuegos, URJC).

Autores: Daniel Palacios Alonso, Julio Guillén García, Raúl Fernández Ruiz, Nikola Hristov Kalamov.

Agradecimientos a los estudiantes y colaboradores que han validado las prácticas y propuesto mejoras.

19. Cita sugerida

Palacios Alonso, D., Guillén García, J., Fernández Ruiz, R., & Hristov Kalamov, N. (2025). Proyecto docente Phaser 3: ejercicio resuelto para web 2D. Asignatura Juegos para Web y Redes Sociales, Grado en Diseño y Desarrollo de Videojuegos, Universidad Rey Juan Carlos. MIT License.