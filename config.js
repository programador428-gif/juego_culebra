const canvas = $("#canvasJuego");
const ctx = canvas.getContext("2d");
const TAMANIO_CELDA = 30;

const CENTRO_X = Math.floor(canvas.width / 2 / TAMANIO_CELDA);
const CENTRO_Y = Math.floor(canvas.height / 2 / TAMANIO_CELDA);

const SERPIENTE = [{ x: CENTRO_X, y: CENTRO_Y }];

let direccionActual = "derecha";
let proximaDireccion = "derecha";
let pausado = false;
let mensajeInicial = true;
let gameOver = false;
let intervalo;
let comida = { x: 5, y: 5 };
let puntaje = 0;

const NIVELES = {
  facil: { velocidad: 200, tiempo: 15 },
  medio: { velocidad: 120, tiempo: 10 },
  dificil: { velocidad: 70, tiempo: 7 },
};

let nivelGuardado = localStorage.getItem("nivelSerpiente") || "facil";
let velocidad = NIVELES[nivelGuardado].velocidad;
let tiempoMaximo = NIVELES[nivelGuardado].tiempo;
let tiempoRestante = tiempoMaximo;
let intervaloTiempo;

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