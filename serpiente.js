const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const TAMANIO_CELDA = 30;
const centroX = Math.floor(canvas.width / 2 / TAMANIO_CELDA);
const centroY = Math.floor(canvas.height / 2 / TAMANIO_CELDA);

const SERPIENTE = [
  { x: centroX - 1, y: centroY - 1 },
  { x: centroX, y: centroY - 1 },
  { x: centroX + 1, y: centroY - 1 },
  { x: centroX + 1, y: centroY }
];

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

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarSerpiente();
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

// Serpiente
function pintarSerpiente() {
  let distancia = SERPIENTE.length - 1;
  SERPIENTE.forEach((SERPIENTE, index) => {
    let color = index == distancia ? "yellow" : "green";
    pintarParte(SERPIENTE.x, SERPIENTE.y, color);
  });
}

function moverDerecha() {
  let distancia = SERPIENTE.length - 1;
  let cabezaActual = SERPIENTE[distancia];
  let nuevaCabeza = {
    x: cabezaActual.x + 1,
    y: cabezaActual.y
  }

  SERPIENTE.push(nuevaCabeza);

  SERPIENTE.shift();
  dibujarTodo();
}

dibujarTodo();

document.getElementById("derecha").addEventListener('click', moverDerecha);