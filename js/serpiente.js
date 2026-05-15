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
    resetearTiempo();
  }
  pausado = false;
  reproducirFondoAudio();
}

function pausarJuego() {
  if (!intervalo) return;
  pausado = !pausado;
  if (pausado) {
    clearInterval(intervaloTiempo);
    fondoSound.pause();
    mostrarMensajeGrande("| |");
  } else {
    intervaloTiempo = setInterval(actualizarTemporizador, 1000);
    reproducirFondoAudio();
    dibujarTodo();
  }
}

function reiniciarJuego() {
  clearInterval(intervalo);
  clearInterval(intervaloTiempo);
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
  $("#mensaje").innerText = "¡Presiona iniciar para comenzar!";
  dibujarTodo();
}

function finalizarJuego() {
  clearInterval(intervaloTiempo);
  gameOverSound.play();
  fondoSound.pause();
  clearInterval(intervalo);
  gameOver = true;
  intervalo = null;
  $("#estado").innerText = "GameOver";
  dibujarTodo();
  pintarSerpiente("#ff2a6d", "rgba(255, 42, 109, 0.6)");
  mostrarMensajeGrande("GAME OVER");
}

function ajustarNivel(nivel) {
  if (intervalo) return;
  localStorage.setItem("nivelSerpiente", nivel);
  velocidad = NIVELES[nivel].velocidad;
  tiempoMaximo = NIVELES[nivel].tiempo;
  tiempoRestante = tiempoMaximo;
  $("#mensaje").innerText = `Nivel: ${nivel.toUpperCase()}`;
}

generarComida();
dibujarTodo();
$("#estado").innerText = `${tiempoMaximo}s`;

$("#btnIniciar").onclick = () => {
  if (!gameOver && !intervalo) iniciarJuego();
};
$("#btnReiniciar").onclick = () => {
  if (pausado || gameOver) reiniciarJuego();
};
$("#pausa").onclick = () => pausarJuego();

$("#nivelFacil").onclick = () => ajustarNivel("facil");
$("#nivelMedio").onclick = () => ajustarNivel("medio");
$("#nivelDificil").onclick = () => ajustarNivel("dificil");

window.addEventListener("keydown", (e) => {
  if (!intervalo) return;
  if (e.key === "ArrowUp" || e.key.toLowerCase() === "w")
    cambiarDireccion("arriba");
  if (e.key === "ArrowDown" || e.key.toLowerCase() === "s")
    cambiarDireccion("abajo");
  if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a")
    cambiarDireccion("izquierda");
  if (e.key === "ArrowRight" || e.key.toLowerCase() === "d")
    cambiarDireccion("derecha");
  if (e.code === "Space") {
    e.preventDefault();
    pausarJuego();
  }
});