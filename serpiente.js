// --- CONFIGURACIÓN Y VARIABLES GLOBALES ---
const canvas = $("#canvasJuego");
const ctx = canvas.getContext("2d");
const TAMANIO_CELDA = 30;

const CENTRO_X = Math.floor(canvas.width / 2 / TAMANIO_CELDA);
const CENTRO_Y = Math.floor(canvas.height / 2 / TAMANIO_CELDA);

const SERPIENTE = [
  { x: CENTRO_X, y: CENTRO_Y },
];

let direccionActual = "derecha";
let proximaDireccion = "derecha";
let pausado = false;
let mensajeInicial = true;
let gameOver = false;
let intervalo;
let comida = { x: 5, y: 5 };
let puntaje = 0;
let velocidad = 150;

// --- FUNCIONES DE DIBUJO ---
function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTablero() {
  ctx.strokeStyle = "#d84ff3";
  ctx.lineWidth = 0.1;

  for (let x = 0; x <= canvas.width; x += TAMANIO_CELDA) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  for (let y = 0; y <= canvas.height; y += TAMANIO_CELDA) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function pintarParte(lineaX, lineaY, color) {
  let posX = lineaX * TAMANIO_CELDA;
  let posY = lineaY * TAMANIO_CELDA;

  ctx.fillStyle = color;
  ctx.fillRect(posX, posY, TAMANIO_CELDA, TAMANIO_CELDA);

  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.strokeRect(posX, posY, TAMANIO_CELDA, TAMANIO_CELDA);
}

function mostrarMensajeGrande(texto) {
  ctx.fillStyle = "#d3bbff";
  ctx.font = "bold 60px 'Segoe UI'";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillText(texto, canvas.width / 2, canvas.height / 2);

  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.strokeText(texto, canvas.width / 2, canvas.height / 2);
}

function mostrarMensajeInicial() {
  if (intervalo) return;
  if (pausado) return;
  if (gameOver) return;

  mensajeInicial = !mensajeInicial;
  $("#estado").innerText = "Listo";

  if (mensajeInicial) mostrarMensajeGrande("¡Vamos a Jugar!");
  else {
    dibujarTodo();
  }
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarSerpiente();
  pintarComida();
  mostrarMensajeInicial();
}

// --- LÓGICA DE LA SERPIENTE ---
function pintarSerpiente() {
  let distancia = SERPIENTE.length - 1;
  SERPIENTE.forEach((parte, index) => {
    let color = index === distancia ? "yellow" : "green";
    pintarParte(parte.x, parte.y, color);
  });
}

function moverSerpiente() {
  direccionActual = proximaDireccion;

  let cabezaActual = SERPIENTE[SERPIENTE.length - 1];
  let nuevaCabeza = { x: cabezaActual.x, y: cabezaActual.y };

  if (direccionActual === "derecha") nuevaCabeza.x++;
  if (direccionActual === "izquierda") nuevaCabeza.x--;
  if (direccionActual === "arriba") nuevaCabeza.y--;
  if (direccionActual === "abajo") nuevaCabeza.y++;

  const limiteDerecho = canvas.width / TAMANIO_CELDA;
  const limiteInferior = canvas.height / TAMANIO_CELDA;

  if (
    nuevaCabeza.x < 0 ||
    nuevaCabeza.x >= limiteDerecho ||
    nuevaCabeza.y < 0 ||
    nuevaCabeza.y >= limiteInferior
  ) {
    finalizarJuego();
    return;
  }

  SERPIENTE.push(nuevaCabeza);

  if (atrapaComida()) {
    reproducirCrunchAudio();
    puntaje++;
    $("#puntaje").innerText = puntaje;
    generarComida();
  } else {
    SERPIENTE.shift();
  }

  if (verificarAutoColision(nuevaCabeza, SERPIENTE.slice(0, -1))) {
    finalizarJuego();
  }
}

function cambiarDireccion(nueva) {
  if (!intervalo) return;
  if (direccionActual === "derecha" && nueva === "izquierda") return;
  if (direccionActual === "izquierda" && nueva === "derecha") return;
  if (direccionActual === "arriba" && nueva === "abajo") return;
  if (direccionActual === "abajo" && nueva === "arriba") return;

  proximaDireccion = nueva;
}

// --- LÓGICA DE LA COMIDA ---
function generarComida() {
  const COLUMNAS = canvas.width / TAMANIO_CELDA;
  const FILAS = canvas.height / TAMANIO_CELDA;

  comida.x = Math.floor(Math.random() * COLUMNAS);
  comida.y = Math.floor(Math.random() * FILAS);

  if (SERPIENTE.some((parte) => parte.x === comida.x && parte.y === comida.y)) {
    generarComida();
  }
}

function pintarComida() {
  pintarParte(comida.x, comida.y, "red");
}


// --- Colisiones ---
function atrapaComida() {
  let cabeza = SERPIENTE[SERPIENTE.length - 1];
  return cabeza.x === comida.x && cabeza.y === comida.y;
}

function verificarAutoColision(nuevaCabeza, cuerpoActual) {
  return cuerpoActual.some((parte) => parte.x === nuevaCabeza.x && parte.y === nuevaCabeza.y);
}

// --- Sonidos ---
function reproducirFondoAudio() {
  fondoSound.loop = true;
  fondoSound.volume = 0.5;
  fondoSound.play();
}

function reproducirCrunchAudio() {
  crunchSound.currentTime = 0;
  crunchSound.volume = 1;
  crunchSound.play();
}

// --- CONTROL DEL JUEGO ---
function cicloJuego() {
  if (!pausado) {
    moverSerpiente();
    if (intervalo) {
      dibujarTodo();
    }
  }
}

function iniciarJuego() {
  if (!intervalo) {
    proximaDireccion = "derecha";
    intervalo = setInterval(cicloJuego, velocidad);
  }
  pausado = false;
  $("#estado").innerText = "Jugando";
  reproducirFondoAudio();
}

function pausarJuego() {
  if (!intervalo) return;

  pausado = !pausado;
  $("#estado").innerText = pausado ? "Pausa" : "Jugando";

  if (pausado) { 
    fondoSound.pause();
    mostrarMensajeGrande("| |");
  } else {
    reproducirFondoAudio();
    dibujarTodo();
  }
}

function reiniciarJuego() {
  clearInterval(intervalo);
  intervalo = null;

  puntaje = 0;
  direccionActual = "derecha";
  proximaDireccion = "derecha";
  pausado = false;
  gameOver = false;

  SERPIENTE.length = 0;
  SERPIENTE.push({ x: CENTRO_X, y: CENTRO_Y });

  generarComida();

  fondoSound.currentTime = 0;
  crunchSound.currentTime = 0;
  gameOverSound.currentTime = 0;

  $("#puntaje").innerText = puntaje;
  $("#estado").innerText = "Listo";
  $("#mensaje").innerText = "¡Presiona iniciar para comenzar!";

  dibujarTodo();
}

function finalizarJuego() {
  gameOverSound.currentTime = 0;
  gameOverSound.volume = 1;
  gameOverSound.play();
  fondoSound.pause();
  clearInterval(intervalo);
  gameOver = true;
  intervalo = null;

  $("#estado").innerText = "Game Over";
  dibujarTodo();
  mostrarMensajeGrande("GAME OVER");
}

// --- EVENTOS E INTERACCIÓN ---
generarComida();
dibujarTodo();

$("#btnIniciar").onclick = () => {
  if (gameOver || intervalo) return;
  iniciarJuego();
};
$("#btnReiniciar").onclick = () => {
  if (pausado || gameOver) reiniciarJuego();
}
$("#pausa").onclick = () => pausarJuego();

window.addEventListener("keydown", (event) => {
  if (!intervalo) return;

  const TECLA = event.key;

  if (TECLA === "w" || TECLA === "W" || TECLA === "ArrowUp") cambiarDireccion("arriba");
  if (TECLA === "s" || TECLA === "S" || TECLA === "ArrowDown") cambiarDireccion("abajo");
  if (TECLA === "a" || TECLA === "A" || TECLA === "ArrowLeft") cambiarDireccion("izquierda");
  if (TECLA === "d" || TECLA === "D" || TECLA === "ArrowRight") cambiarDireccion("derecha");

  if (event.code === "Space") {
    event.preventDefault();
    pausarJuego();
  }
});