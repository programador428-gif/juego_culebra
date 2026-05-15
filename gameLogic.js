function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarSerpiente();
  pintarComida();
  if (!intervalo && !pausado && !gameOver) {
    mensajeInicial = !mensajeInicial;
    $("#estado").innerText = "Listo";
    if (mensajeInicial) mostrarMensajeGrande("¡Vamos a Jugar!");
    else dibujarTodo();
  }
}

function pintarSerpiente() {
  let distancia = SERPIENTE.length - 1;
  SERPIENTE.forEach((parte, index) => {
    let color = index === distancia ? "yellow" : "green";
    pintarParte(parte.x, parte.y, color);
  });
}

function moverSerpiente() {
  direccionActual = proximaDireccion;
  let cabezaActual = SERPIENTE[SERPIENTE.length - 1];
  let nuevaCabeza = { x: cabezaActual.x, y: cabezaActual.y };

  if (direccionActual === "derecha") nuevaCabeza.x++;
  if (direccionActual === "izquierda") nuevaCabeza.x--;
  if (direccionActual === "arriba") nuevaCabeza.y--;
  if (direccionActual === "abajo") nuevaCabeza.y++;

  if (nuevaCabeza.x < 0 || nuevaCabeza.x >= canvas.width / TAMANIO_CELDA ||
      nuevaCabeza.y < 0 || nuevaCabeza.y >= canvas.height / TAMANIO_CELDA) {
    finalizarJuego();
    return;
  }

  SERPIENTE.push(nuevaCabeza);

  if (nuevaCabeza.x === comida.x && nuevaCabeza.y === comida.y) {
    reproducirCrunchAudio();
    puntaje++;
    $("#puntaje").innerText = puntaje;
    generarComida();
  } else {
    SERPIENTE.shift();
  }

  if (SERPIENTE.slice(0, -1).some(p => p.x === nuevaCabeza.x && p.y === nuevaCabeza.y)) {
    finalizarJuego();
  }
}

function generarComida() {
  comida.x = Math.floor(Math.random() * (canvas.width / TAMANIO_CELDA));
  comida.y = Math.floor(Math.random() * (canvas.height / TAMANIO_CELDA));
  if (SERPIENTE.some(p => p.x === comida.x && p.y === comida.y)) generarComida();
}

function pintarComida() {
  pintarParte(comida.x, comida.y, "red");
}

function cambiarDireccion(nueva) {
  if (!intervalo) return;
  if (direccionActual === "derecha" && nueva === "izquierda") return;
  if (direccionActual === "izquierda" && nueva === "derecha") return;
  if (direccionActual === "arriba" && nueva === "abajo") return;
  if (direccionActual === "abajo" && nueva === "arriba") return;
  proximaDireccion = nueva;
}