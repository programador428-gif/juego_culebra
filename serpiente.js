const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTodo() {
  limpiarCanvas();
}

dibujarTodo();