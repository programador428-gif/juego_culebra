const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const TAMANIO_CELDA = 30;
const centroX = Math.floor(canvas.width / 2 / TAMANIO_CELDA);
const centroY = Math.floor(canvas.height / 2 / TAMANIO_CELDA);

const SERPIENTE = [
  { x: centroX - 2, y: centroY },
  { x: centroX - 1, y: centroY },
  { x: centroX, y: centroY },
  { x: centroX + 1, y: centroY }
];

let direccionActual = "derecha";
let pausado = false;
let intervalo;
let comida = { x: 5, y: 5 };

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
  pintarComida();
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

function generarComida() {
  const columnas = canvas.width / TAMANIO_CELDA;
  const filas = canvas.height / TAMANIO_CELDA;

  comida.x = Math.floor(Math.random() * columnas);
  comida.y = Math.floor(Math.random() * filas);
}

function pintarComida() {
  pintarParte(comida.x, comida.y, "red");
}

function pintarSerpiente() {
  let distancia = SERPIENTE.length - 1;
  SERPIENTE.forEach((parte, index) => {
    let color = index === distancia ? "yellow" : "green";
    pintarParte(parte.x, parte.y, color);
  });
}

function moverDerecha() {
  let cabezaActual = SERPIENTE[SERPIENTE.length - 1];
  let nuevaCabeza = { x: cabezaActual.x + 1, y: cabezaActual.y };
  SERPIENTE.push(nuevaCabeza);
  SERPIENTE.shift();
}

function moverIzquierda() {
  let cabezaActual = SERPIENTE[SERPIENTE.length - 1];
  let nuevaCabeza = { x: cabezaActual.x - 1, y: cabezaActual.y };
  SERPIENTE.push(nuevaCabeza);
  SERPIENTE.shift();
}

function moverArriba() {
  let cabezaActual = SERPIENTE[SERPIENTE.length - 1];
  let nuevaCabeza = { x: cabezaActual.x, y: cabezaActual.y - 1 };
  SERPIENTE.push(nuevaCabeza);
  SERPIENTE.shift();
}

function moverAbajo() {
  let cabezaActual = SERPIENTE[SERPIENTE.length - 1];
  let nuevaCabeza = { x: cabezaActual.x, y: cabezaActual.y + 1 };
  SERPIENTE.push(nuevaCabeza);
  SERPIENTE.shift();
}

function cambiarDireccion(nueva) {
  if (direccionActual === "derecha" && nueva === "izquierda") return;
  if (direccionActual === "izquierda" && nueva === "derecha") return;
  if (direccionActual === "arriba" && nueva === "abajo") return;
  if (direccionActual === "abajo" && nueva === "arriba") return;

  direccionActual = nueva;
}

function cicloJuego() {
  if (!pausado) {
    if (direccionActual === "derecha") moverDerecha();
    if (direccionActual === "izquierda") moverIzquierda();
    if (direccionActual === "arriba") moverArriba();
    if (direccionActual === "abajo") moverAbajo();
    dibujarTodo();
  }
}

function iniciarJuego() {
  if (!intervalo) {
    intervalo = setInterval(cicloJuego, 150);
  }
  pausado = false;
}

function pausarJuego() {
  pausado = !pausado;
}

dibujarTodo();

document.getElementById("derecha").onclick = () => cambiarDireccion("derecha");
document.getElementById("izquierda").onclick = () => cambiarDireccion("izquierda");
document.getElementById("arriba").onclick = () => cambiarDireccion("arriba");
document.getElementById("abajo").onclick = () => cambiarDireccion("abajo");
document.getElementById("btnIniciar").onclick = () => iniciarJuego();
document.getElementById("pausa").onclick = () => pausarJuego();

window.addEventListener("keydown", (event) => {
  const tecla = event.key;

  if (tecla === "w" || tecla === "W" || tecla === "ArrowUp") {
    cambiarDireccion("arriba");
  }
  if (tecla === "s" || tecla === "S" || tecla === "ArrowDown") {
    cambiarDireccion("abajo");
  }
  if (tecla === "a" || tecla === "A" || tecla === "ArrowLeft") {
    cambiarDireccion("izquierda");
  }
  if (tecla === "d" || tecla === "D" || tecla === "ArrowRight") {
    cambiarDireccion("derecha");
  }

  if (event.code === "Space") {
    event.preventDefault();
    pausarJuego();
  }
});