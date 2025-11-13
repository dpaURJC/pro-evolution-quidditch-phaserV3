# README — Proyecto Phaser 3 (JWRS)

> **Asignatura:** *Juegos para Web y Redes Sociales* (Grado en Diseño y Desarrollo de Videojuegos, **Universidad Rey Juan Carlos**)  
> **Autores:** **Daniel Palacios Alonso**, **Julio Guillén García**, **Raúl Fernández Ruiz**, **Nikola Hristov Kalamov**

---

## 1. Descripción general

Repositorio docente con un **ejercicio resuelto en Phaser 3** que muestra, de forma modular, las **partes esenciales** de un juego 2D para la web: **carga de recursos**, **arquitectura por escenas**, **entrada de usuario**, **temporización**, **Arcade Physics** y **pantalla de cierre** con retorno a la página inicial.  
Está pensado para ejecutarse con **Visual Studio Code** y **Live Server (Go Live)** sin *tooling* adicional, facilitando que el estudiantado **lea, ejecute, modifique y evalúe** cada bloque por separado.

---

## 2. Objetivos docentes

- Introducir la **arquitectura por escenas** (Boot → Preload → Menu → Intro → Level → Ending).  
- Fijar la **separación de responsabilidades**: *cargar* en `preload`, *instanciar/usar* en `create`, *lógica* en `update`.  
- Practicar **Arcade Physics** con `overlap` (detección sin respuesta) y pautas de uso de `collider`.  
- Emplear **tweens** para micro-animaciones de UI y **fundidos** de audio.  
- Asegurar **responsividad** (escala/centrado) y **accesibilidad de salida** (botón y atajo).

---

## 3. Características

- **Phaser 3** (render automático WebGL/Canvas).  
- **Escenas independientes** (clases ES6).  
- **Arcade Physics** sin gravedad global; jugador con `setCollideWorldBounds(true)`.  
- **Snitch** con movimiento aleatorio periódico (timer + tween cada 500 ms).  
- **Atajos**: `S`, `SPACE`, `ESC`; movimiento `WASD` (y `IJKL` opcional); en *Ending*, `H` para volver a inicio.  
- **Escalado**: `Phaser.Scale.FIT` + `CENTER_BOTH`.  
- **Audio** con reproducción tras gesto de usuario y *fade* en transiciones.

---

## 4. Requisitos

- **VS Code** + extensión **Live Server** (recomendada), o un servidor estático sencillo.  
- **Navegador moderno** con soporte ES6.  
- (Opcional) **Node.js** si se prefiere `http-server`.

---

## 5. Estructura del proyecto

```
/ (raíz)
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
└─ assets/
   ├─ images/ ...
   └─ audio/ ...
```

**Rutas:** utilice siempre rutas **relativas** (`./js/...`, `./assets/...`) y respete mayúsculas/minúsculas.

---

## 6. Puesta en marcha

**Opción A — VS Code + Live Server (recomendada):**  
1) Abra la carpeta del proyecto en VS Code.  
2) Abra `index.html` y pulse **Go Live**.  
3) Navegue a `http://localhost:5500/` (o puerto asignado).

**Opción B — Servidor estático alternativo:**
```bash
# http-server
npx http-server -p 5500
# o con Python
python -m http.server 5500
```

---

## 7. Configuración de Phaser 3 (resumen)

```javascript
// js/main.js
const GAME_W = 800, GAME_H = 600;

const config = {
  type: Phaser.AUTO,
  width: GAME_W,
  height: GAME_H,
  physics: { default: 'arcade', arcade: { gravity: { y: 0 }, debug: false } },
  scene: [Boot, Preload, Menu, Intro, Level, Ending],
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH }
};

window.addEventListener('load', () => new Phaser.Game(config));
```

---

## 8. Flujo de escenas

- **Boot** → preparación mínima; transfiere a **Preload**.  
- **Preload** → **carga** de imágenes/audio con `this.load.*` (no instanciar todavía).  
- **Menu** → fondo, título, música en bucle; *tweens* (parpadeo, “flotar”); tecla **S** para iniciar.  
- **Intro** → breve transición narrativa; *fade* de música; **SPACE** para continuar.  
- **Level** → Arcade Physics; jugador (`WASD`); **snitch** con timer+tween cada 500 ms; `overlap` para captura; **ESC** vuelve al menú.  
- **Ending** → UI **responsiva** (posiciones relativas + *autofit*); botón/atajo **H** para **volver a la página inicial**.

---

## 9. Controles

- **Menú**: `S` (iniciar), `1/2` (modo 1P/2P si procede).  
- **Nivel**: `W A S D` (J1), `I J K L` (J2 opcional), `ESC` (volver al menú).  
- **Cierre**: clicar en “Ir a la página inicial” o pulsar `H`.

---

## 10. Recursos y audio

- **Cargar** siempre en `Preload.js` con `this.load.image/audio/...`.  
- **Instanciar/usar** en `create()` de cada escena con `this.add.*` o `this.physics.add.*`.  
- **Audio**: reproducir tras **gesto** del usuario; aplicar **fundidos** de volumen en transiciones.

---

## 11. Tweens y tiempo

- **Tween**: interpolaciones declarativas para UI (opacidad, escala, posición, volumen).  
- **Temporizadores** (`time.addEvent`): lógica **periódica** (p. ej., movimiento de la snitch) o **retardos** para encadenar escenas.

---

## 12. Arcade Physics (patrón)

- Crear **cuerpos** con `this.physics.add.sprite(...)`.  
- **`overlap`**: detección sin bloqueo (coleccionables/disparadores).  
- **`collider`**: choque con respuesta (muros/obstáculos).  
- **`setCollideWorldBounds(true)`**: mantener al jugador dentro del marco.  
- **`debug: true`** solo durante prácticas (desactivado en producción).

---

## 13. Responsividad y accesibilidad

- **Escala** global: `FIT + CENTER_BOTH`.  
- **UI responsiva**: posiciones relativas y *autofit* (especialmente en *Ending*).  
- **Salida accesible**: botón visible + atajo `H`; temporizador opcional de retorno.

---

## 14. Buenas prácticas

- Una **clase por escena**; entradas **declaradas** en `create()` y **evaluadas** en `update()`.  
- Evitar **números mágicos**: calcular sobre `this.scale.width/height`.  
- **Limpiar** música, tweens y timers al cambiar de escena.  
- Mantener un **estilo consistente** y mensajes de *commit* informativos.

---

## 15. Solución de problemas

- **“X is not defined”** → verifique **orden de scripts**: Phaser → escenas → `main.js`.  
- **No suena música** → los navegadores exigen **gesto de usuario** previo.  
- **404 en assets** → revise rutas relativas y capitalización.  
- **UI se sale en *Ending*** → confirme `FIT + CENTER_BOTH` y *autofit* relativo en la escena.  
- **Colisiones extrañas** → active `debug:true` temporalmente y ajuste tamaños/offsets.

---

## 16. Guía de contribución (docencia)

1. Mantener **coherencia** de estilos (ES6, claves de *assets* en inglés).  
2. Las nuevas escenas deben incluir `preload` (si procede), `create` y `update`.  
3. En *pull requests*, describir **objetivo docente**, escena afectada, controles y criterios de prueba.  
4. No incorporar *assets* sin **licencia compatible**; indicar créditos cuando corresponda.

---

## 17. Licencia

Este proyecto se distribuye bajo **MIT License**.  
El texto completo de la licencia se incluye a continuación y debe acompañar a cualquier redistribución del software.

```text
MIT License

Copyright (c) 2025
Daniel Palacios Alonso, Julio Guillén García, Raúl Fernández Ruiz, Nikola Hristov Kalamov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

---

## 18. Créditos y agradecimientos

- **Asignatura:** *Juegos para Web y Redes Sociales* (Grado en Diseño y Desarrollo de Videojuegos, **URJC**).  
- **Autores:** **Daniel Palacios Alonso**, **Julio Guillén García**, **Raúl Fernández Ruiz**, **Nikola Hristov Kalamov**.  
- Agradecimientos a los estudiantes y colaboradores que han validado las prácticas y propuesto mejoras.

---

## 19. Cita sugerida

Palacios Alonso, D., Guillén García, J., Fernández Ruiz, R., & Hristov Kalamov, N. (2025). *Proyecto docente Phaser 3: ejercicio resuelto para web 2D*. Asignatura **Juegos para Web y Redes Sociales**, Grado en Diseño y Desarrollo de Videojuegos, Universidad Rey Juan Carlos. MIT License.
