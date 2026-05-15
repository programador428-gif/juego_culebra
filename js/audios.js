const gameOverSound = new Audio("./assets/audio/game-over.mp3");
const fondoSound = new Audio("./assets/audio/fondo.mp3");
const crunchSound = new Audio("./assets/audio/crunching.mp3");

const sonidos = {
    gameOver: gameOverSound,
    fondo: fondoSound,
    crunch: crunchSound
};

const totalSonidos = Object.keys(sonidos).length;
let sonidosListos = 0;

const loader = $("#loader");
const contenedorJuego = $(".contenedor-juego");

for (let clave in sonidos) {
    sonidos[clave].addEventListener('canplaythrough', () => {
        if (!sonidos[clave].datasetLoaded) {
            sonidos[clave].datasetLoaded = true;
            sonidosListos++;
            
            let porcentaje = Math.round((sonidosListos / totalSonidos) * 100);
            if (loader) loader.innerText = `Cargando recursos... ${porcentaje}%`;

            if (sonidosListos === totalSonidos) {
                finalizarCarga();
            }
        }
    }, { once: true });
}

function finalizarCarga() {
    if (loader) loader.style.display = 'none';
    if (contenedorJuego) contenedorJuego.style.display = 'block';
    console.log("¡Todos los audios cargados obligatoriamente!");
}