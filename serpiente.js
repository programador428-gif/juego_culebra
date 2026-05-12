const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const TAMANIO_CELDA = 100;

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
  pintarParte(5, 1);
  pintarParte(0, 3);
}

function pintarParte(lineaX, lineaY) {
  let posX = lineaX * TAMANIO_CELDA;
  let posY = lineaY * TAMANIO_CELDA;

  ctx.fillStyle = "green";
  ctx.fillRect(posX, posY, TAMANIO_CELDA, TAMANIO_CELDA);
}

dibujarTodo();