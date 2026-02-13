// === ELEMENTOS DEL DOM ===
const modalInicio = document.querySelector('.modal-inicio');
const btnEmpezar = document.getElementById('btn-empezar');
const palabraDisplay = document.getElementById('palabra-secreta');
const contadorErr = document.getElementById('errores');
const teclado = document.querySelectorAll('.tecla');
const modalVictoria = document.querySelector('.modal-victoria');
const modalDerrota = document.querySelector('.modal-derrota');
const btnJugarNuevamenteVictoria = document.querySelectorAll('.btn-jugar-nuevamente');
const contadorVictoria = document.getElementById('victorias');
const contadorDerrota = document.getElementById('derrotas');
const palabraCorrecta = document.getElementById('palabra-correcta');
const partesAhorcado = document.querySelectorAll('.parte-ahorcado');

// === VARIABLES GLOBALES ===
const palabras = [
    "Goku",
    "Vegeta",
    "Gohan",
    "Naruto Uzumaki",
    "Sasuke Uchiha",
    "Sakura Haruno",
    "Kakashi Hatake",
    "Luffy",
    "Zoro",
    "Nami",
    "Sanji",
    "Ichigo Kurosaki",
    "Rukia Kuchiki",
    "Light Yagami",
    "Eren Yeager",
    "Mikasa Ackerman",
    "Levi Ackerman",
    "Tanjiro Kamado",
    "Nezuko Kamado",
    "Zenitsu",
    "Inosuke",
    "Saitama",
    "Deku",
    "Fushiguro",
    'javascript', 
    'programacion', 
    'desarrollo', 'frontend', 
    'computacion', 
    'ingenieria', 
    'universidad', 
    'escuela', 
    'profesor', 
    'estudiante', 
    'aplicacion', 
    'web',
    'backend', 
    'topicos avanzados de programacion', 
    "pizza",
    "hamburguesa",
    "tacos",
    "burrito",
    "sushi",
    "pasta",
    "spaghetti", "carro",
    "camioneta",
    "moto",
    "motocicleta",
    "bicicleta",
    "patineta",
    "scooter",
    ];

    
let palabraSecreta = '';
let palabrasHistorial = [];
let letrasAdivinadas = [];
let errores = 6;
let victorias = 0;
let derrotas = 0;

// === MANEJO DE EVENTOS ===
// Carga inicial
window.addEventListener('DOMContentLoaded', cargarModalInicio);

btnEmpezar.addEventListener('click', () => {
    modalInicio.style.display = 'none';
    empezarJuego();
    modalInicio.style.display = 'none';
});

teclado.forEach(tecla => {
    tecla.addEventListener('click', () => {
        const letra = tecla.textContent.toLowerCase();
        console.log(`Letra seleccionada: ${letra}`);
        if (!letrasAdivinadas.includes(letra) && errores < 6) {
            letrasAdivinadas.push(letra);
            if (palabraSecreta.includes(letra)) {
                renderizarPalabra();
                verificarVictoriaDerrota();
                tecla.disabled = true;
                tecla.classList.add('tecla-acertada');
            } else {
                errores++;
                contadorErr.textContent = `${ errores}`;
                verificarVictoriaDerrota();
                dibujarAhorcado();
                tecla.disabled = true;
                tecla.classList.add('tecla-incorrecta');
            }
        }
    });
});

btnJugarNuevamenteVictoria.forEach(btn => {
    btn.addEventListener('click', () => {
        modalVictoria.style.display = 'none';
        modalDerrota.style.display = 'none';
        empezarJuego();
    });
});

// === FUNCIONES ===
function cargarModalInicio() {
    modalInicio.style.display = 'flex';
}

function empezarJuego() {
    console.log('Empezando juego...');
    letrasAdivinadas = [];
    errores = 0;
    seleccionarPalabra();
    renderizarPalabra();
    // Reiniciar el estado del teclado
    reiniciarTeclado();
    dibujarAhorcado();
}

function seleccionarPalabra(){
    do{
        palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)].toLocaleLowerCase();
        if(palabrasHistorial.length == palabras.length){
            alert('¡Has adivinado todas las palabras! El historial se reiniciará.');
            palabrasHistorial = [];
        }
    }while(palabrasHistorial.includes(palabraSecreta));
    palabrasHistorial.push(palabraSecreta);
}

function renderizarPalabra() {
    palabraDisplay.innerHTML = ``;

    // Construimos los divs para encerrar cada palabra
    const palabrasArr = palabraSecreta.split(' ');
    palabrasArr.forEach((palabra, index) => {
        if (index != 0) {
            const espacio = document.createElement('span');
            espacio.classList.add('espacio');
            palabraDisplay.appendChild(espacio);
        }

        const palabraDiv = document.createElement('div');
        palabraDiv.classList.add('palabra');
        palabraDiv.classList.add(`${index + 1}`);
        palabraDisplay.appendChild(palabraDiv);
        // Agregamos los spans dentro del div correspondiente
        for (let i = 0; i < palabra.length; i++) {
            const span = document.createElement('span');
            if (letrasAdivinadas.includes(palabra[i])) {
                span.textContent = palabra[i];
                span.classList.add('adivinada');
            } else {
                span.textContent = '_';
                span.classList.add('secreta');
            }
            palabraDiv.appendChild(span);
        }
    });

    contadorErr.textContent = `${errores}`;
}

function reiniciarTeclado() {
    for (let tecla of teclado) {
        tecla.disabled = false;
        tecla.classList.remove('tecla-acertada', 'tecla-incorrecta');
    }
}

function verificarVictoriaDerrota() {
    // Join junta los elementos del array en una cadena, usando el vacio como separador entre cada elemento
    const palabraActual = palabraSecreta.split('').map(letra => letrasAdivinadas.includes(letra) ? letra : ' ').join('');

    if (palabraActual === palabraSecreta) {
        mostrarModalVictoria();
        victorias++;
        contadorVictoria.textContent = `${victorias}`;
    } else if (errores == 6) {
        mostrarModalDerrota();
        derrotas++;
        contadorDerrota.textContent = `${derrotas}`;
    }
}

function mostrarModalVictoria() {
    modalVictoria.style.display = 'flex';
}

function mostrarModalDerrota() {
    modalDerrota.style.display = 'flex';
    palabraCorrecta.textContent = `${palabraSecreta}`;
}

function dibujarAhorcado() {
    partesAhorcado.forEach((parte, index) => {
        if (index < errores) {
            parte.classList.add('mostrar');
        } else {
            parte.classList.remove('mostrar');
        }
    });
}