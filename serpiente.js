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

function pintarParte(lineaX, lineaY) {
  let posX = lineaX * TAMANIO_CELDA;
  let posY = lineaY * TAMANIO_CELDA;

  ctx.fillStyle = "green";
  ctx.fillRect(posX, posY, TAMANIO_CELDA, TAMANIO_CELDA);

  ctx.strokeStyle = "#ea00ff";
  ctx.lineWidth = 1;
  ctx.strokeRect(posX, posY, TAMANIO_CELDA, TAMANIO_CELDA);
}

function pintarSerpiente() {
  SERPIENTE.forEach((SERPIENTE) => {
    pintarParte(SERPIENTE.x, SERPIENTE.y);
  });
}

dibujarTodo();