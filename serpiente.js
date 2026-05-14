// --- CONFIGURACIÓN Y VARIABLES GLOBALES ---
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const TAMANIO_CELDA = 30;

const CENTRO_X = Math.floor(canvas.width / 2 / TAMANIO_CELDA);
const CENTRO_Y = Math.floor(canvas.height / 2 / TAMANIO_CELDA);

const SERPIENTE = [
  { x: CENTRO_X, y: CENTRO_Y },
];

let direccionActual = "derecha";
let pausado = false;
let intervalo;
let comida = { x: 5, y: 5 };
let puntaje = 0;

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
  ctx.fillStyle = "#facc15";
  ctx.font = "bold 60px 'Segoe UI'";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillText(texto, canvas.width / 2, canvas.height / 2);

  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.strokeText(texto, canvas.width / 2, canvas.height / 2);
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarSerpiente();
  pintarComida();
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
  let cabezaActual = SERPIENTE[SERPIENTE.length - 1];
  let nuevaCabeza = { x: cabezaActual.x, y: cabezaActual.y };

  if (direccionActual === "derecha") nuevaCabeza.x++;
  if (direccionActual === "izquierda") nuevaCabeza.x--;
  if (direccionActual === "arriba") nuevaCabeza.y--;
  if (direccionActual === "abajo") nuevaCabeza.y++;

  SERPIENTE.push(nuevaCabeza);

  if (atrapaComida()) {
    puntaje++;
    document.getElementById("puntaje").innerText = puntaje;
    generarComida();
  } else {
    SERPIENTE.shift();
  }
}

function cambiarDireccion(nueva) {
  if (direccionActual === "derecha" && nueva === "izquierda") return;
  if (direccionActual === "izquierda" && nueva === "derecha") return;
  if (direccionActual === "arriba" && nueva === "abajo") return;
  if (direccionActual === "abajo" && nueva === "arriba") return;

  direccionActual = nueva;
}

// --- LÓGICA DE LA COMIDA ---
function generarComida() {
  const COLUMNAS = canvas.width / TAMANIO_CELDA;
  const FILAS = canvas.height / TAMANIO_CELDA;

  comida.x = Math.floor(Math.random() * COLUMNAS);
  comida.y = Math.floor(Math.random() * FILAS);
}

function pintarComida() {
  pintarParte(comida.x, comida.y, "red");
}

function atrapaComida() {
  let cabeza = SERPIENTE[SERPIENTE.length - 1];
  return cabeza.x === comida.x && cabeza.y === comida.y;
}

// --- CONTROL DEL JUEGO ---
function cicloJuego() {
  if (!pausado) {
    moverSerpiente();
    dibujarTodo();
  }
}

function iniciarJuego() {
  if (!intervalo) {
    intervalo = setInterval(cicloJuego, 150);
  }
  pausado = false;
  document.getElementById("estado").innerText = "Jugando";
}

function pausarJuego() {
  pausado = !pausado;
  document.getElementById("estado").innerText = pausado ? "Pausa" : "Jugando";

  if (pausado) mostrarMensajeGrande("| |");
  else {
    dibujarTodo();
  }
}

// --- EVENTOS E INTERACCIÓN ---
dibujarTodo();

document.getElementById("btnIniciar").onclick = () => iniciarJuego();
document.getElementById("pausa").onclick = () => pausarJuego();

window.addEventListener("keydown", (event) => {
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