const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const TAMANIO_CELDA = 30;

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
  // Prueba 1
  pintarParte(5, 5);
  // Prueba 2
  pintarParte(10, 2);
  // Prueba 3 -> Pintar un cuadrado pegado al borde inferior del canvas.
  pintarParte((canvas.width - TAMANIO_CELDA) / TAMANIO_CELDA, (canvas.height - TAMANIO_CELDA) / TAMANIO_CELDA);
  // Prueba 4 -> Pintar un cuadrado pegado al borde derecho del canvas.
  pintarParte((canvas.width - TAMANIO_CELDA) / TAMANIO_CELDA, 10);
  // Prueba 5 -> Pintar un cuadrado pegado al borde izquierdo del canvas.
  pintarParte(0, 10);
  // Prueba 6 -> Pintar un cuadrado en cualquier esquina del canvas.
  pintarParte(0, (canvas.height - TAMANIO_CELDA) / TAMANIO_CELDA);
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

dibujarTodo();