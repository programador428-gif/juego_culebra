function reproducirFondoAudio() {
  fondoSound.loop = true;
  fondoSound.volume = 0.5;
  fondoSound.play();
}

function reproducirCrunchAudio() {
  crunchSound.currentTime = 0;
  crunchSound.play();
}

function cicloJuego() {
  if (!pausado) {
    moverSerpiente();
    if (intervalo) dibujarTodo();
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
  $("#puntaje").innerText = puntaje;
  $("#estado").innerText = "Listo";
  dibujarTodo();
}

function finalizarJuego() {
  gameOverSound.play();
  fondoSound.pause();
  clearInterval(intervalo);
  gameOver = true;
  intervalo = null;
  $("#estado").innerText = "Game Over";
  dibujarTodo();
  mostrarMensajeGrande("GAME OVER");
}

generarComida();
dibujarTodo();

$("#btnIniciar").onclick = () => { if (!gameOver && !intervalo) iniciarJuego(); };
$("#btnReiniciar").onclick = () => { if (pausado || gameOver) reiniciarJuego(); };
$("#pausa").onclick = () => pausarJuego();

window.addEventListener("keydown", (e) => {
  if (!intervalo) return;
  if (e.key === "ArrowUp" || e.key.toLowerCase() === "w") cambiarDireccion("arriba");
  if (e.key === "ArrowDown" || e.key.toLowerCase() === "s") cambiarDireccion("abajo");
  if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") cambiarDireccion("izquierda");
  if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") cambiarDireccion("derecha");
  if (e.code === "Space") { e.preventDefault(); pausarJuego(); }
});