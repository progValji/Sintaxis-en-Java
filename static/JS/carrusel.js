// ============================================
// DATOS DE LOS EJERCICIOS
// ============================================

const ejercicios = [
    {
        id: 1,
        tipo: "errores",
        titulo: "Encuentra los errores en el código",
        descripcion: "Selecciona las líneas que contienen errores de sintaxis o lógica.",
        codigo: `public class Calculadora {
    public static void main(String[] args) {
        int numero1 = 10;
        int numero2 = 0;
        int resultado = numero1 / numero2;
        System.out.println("Resultado: " + resultado);
        String mensaje = "El calculo esta completo"
    }
}`,
        opciones: [
            { value: "1", texto: 'Línea 1' },
            { value: "5", texto: 'Línea 5' },
            { value: "6", texto: 'Línea 6' },
            { value: "7", texto: 'Línea 7' }
        ],
        respuestasCorrectas: ["5", "7"]
    },
    {
        id: 2,
        tipo: "errores",
        titulo: "Encuentra los errores en el bucle",
        descripcion: "Identifica las líneas con errores en este código.",
        codigo: `public class Bucles {
    public static void main(String[] args) {
        for (int i = 0; i < 10, i++) {
            System.out.println("Iteración: " + i);
        }
        
        int contador = 5;
        while (contador > 0) {
            System.out.println(contador);
            contador--;
        }
    }
}`,
        opciones: [
            { value: "3", texto: 'Línea 3' },
            { value: "4", texto: 'Línea 4' },
            { value: "8", texto: 'Línea 8' },
            { value: "10", texto: 'Línea 10' }
        ],
        respuestasCorrectas: ["3"]
    },
    {
        id: 3,
        tipo: "errores",
        titulo: "Errores en condicionales",
        descripcion: "Encuentra los errores en este código con condicionales.",
        codigo: `public class Condicionales {
    public static void main(String[] args) {
        int edad = 18;
        
        if (edad = 18) {
            System.out.println("Eres mayor de edad");
        } else if (edad < 18) {
            System.out.println("Eres menor de edad");
        }
        
        String nombre;
        if (nombre.equals("Juan")) {
            System.out.println("Hola Juan");
        }
    }
}`,
        opciones: [
            { value: "5", texto: 'Línea 5'},
            { value: "7", texto: 'Línea 7'},
            { value: "12", texto: 'Línea 12' },
            { value: "13", texto: 'Línea 13' }
        ],
        respuestasCorrectas: ["5", "12"]
    }
];

// ============================================
// VARIABLES GLOBALES
// ============================================

let ejercicioActual = 0;
let ejerciciosResueltos = new Set();

// ============================================
// ELEMENTOS DEL DOM
// ============================================

const progressCurrent = document.querySelector('.exercise-carousel__current');
const progressTotal = document.querySelector('.exercise-carousel__total');
const progressFill = document.querySelector('.exercise-carousel__progress-fill');
const slideContainer = document.querySelector('.exercise-carousel__slide');
const btnPrev = document.querySelector('.exercise-carousel__button--prev');
const btnNext = document.querySelector('.exercise-carousel__button--next');

// ============================================
// FUNCIONES PRINCIPALES
// ============================================

/**
 * Renderiza el ejercicio actual en el DOM
 */
function renderizarEjercicio() {
    const ejercicio = ejercicios[ejercicioActual];
    
    // Actualizar instrucciones
    slideContainer.querySelector('.exercise-carousel__title').textContent = ejercicio.titulo;
    slideContainer.querySelector('.exercise-carousel__description').textContent = ejercicio.descripcion;
    
    // Actualizar código
    const codeElement = slideContainer.querySelector('.exercise-carousel__code code');
    codeElement.textContent = ejercicio.codigo;
    
    // Re-aplicar Prism.js para resaltado de sintaxis
    if (typeof Prism !== 'undefined') {
        Prism.highlightElement(codeElement);
    }
    
    // Actualizar opciones
    const optionsContainer = slideContainer.querySelector('.exercise-carousel__options');
    optionsContainer.innerHTML = '';
    
    ejercicio.opciones.forEach((opcion, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'exercise-carousel__option';
        
        const inputId = `ex${ejercicio.id}-opt${index}`;
        
        optionDiv.innerHTML = `
            <input type="checkbox" id="${inputId}" name="errors" value="${opcion.value}" class="exercise-carousel__checkbox">
            <label for="${inputId}" class="exercise-carousel__label">${opcion.texto}</label>
        `;
        
        optionsContainer.appendChild(optionDiv);
    });
    
    // Actualizar botón verificar
    const btnVerificar = slideContainer.querySelector('.exercise-carousel__verify');
    btnVerificar.setAttribute('data-answer', ejercicio.respuestasCorrectas.join(','));
    
    // Limpiar feedback
    const feedback = slideContainer.querySelector('.exercise-carousel__feedback');
    feedback.className = 'exercise-carousel__feedback';
    feedback.textContent = '';
    
    // Actualizar progreso
    actualizarProgreso();
    
    // Actualizar estado de botones de navegación
    actualizarBotonesNavegacion();
}

/**
 * Actualiza la barra de progreso
 */
function actualizarProgreso() {
    const totalEjercicios = ejercicios.length;
    const progreso = ((ejercicioActual + 1) / totalEjercicios) * 100;
    
    progressCurrent.textContent = ejercicioActual + 1;
    progressTotal.textContent = totalEjercicios;
    progressFill.style.width = `${progreso}%`;
}

/**
 * Actualiza el estado de los botones de navegación
 */
function actualizarBotonesNavegacion() {
    // Botón Anterior: deshabilitado en el primer ejercicio
    btnPrev.disabled = ejercicioActual === 0;
    
    // Botón Siguiente: deshabilitado si no ha resuelto el ejercicio actual
    const estaResuelto = ejerciciosResueltos.has(ejercicioActual);
    btnNext.disabled = !estaResuelto;
}

/**
 * Verifica si la respuesta del usuario es correcta
 */
function verificarRespuesta() {
    const ejercicio = ejercicios[ejercicioActual];
    const checkboxes = slideContainer.querySelectorAll('input[type="checkbox"]:checked');
    const respuestasUsuario = Array.from(checkboxes).map(cb => cb.value).sort();
    const respuestasCorrectas = ejercicio.respuestasCorrectas.sort();
    
    const feedback = slideContainer.querySelector('.exercise-carousel__feedback');
    const btnVerificar = slideContainer.querySelector('.exercise-carousel__verify');
    
    // Comparar respuestas
    const esCorrecta = JSON.stringify(respuestasUsuario) === JSON.stringify(respuestasCorrectas);
    
    if (esCorrecta) {
        // Respuesta correcta
        feedback.className = 'exercise-carousel__feedback exercise-carousel__feedback--visible exercise-carousel__feedback--success';
        feedback.textContent = '¡Correcto! Has identificado todos los errores.';
        
        // Marcar ejercicio como resuelto
        ejerciciosResueltos.add(ejercicioActual);
        
        // Deshabilitar verificar y habilitar siguiente
        btnVerificar.disabled = true;
        actualizarBotonesNavegacion();
        
    } else {
        // Respuesta incorrecta
        feedback.className = 'exercise-carousel__feedback exercise-carousel__feedback--visible exercise-carousel__feedback--error';
        
        if (respuestasUsuario.length === 0) {
            feedback.textContent = 'Por favor, selecciona al menos una opción.';
        } else if (respuestasUsuario.length < respuestasCorrectas.length) {
            feedback.textContent = 'Te faltan errores por identificar. Revisa el código nuevamente.';
        } else if (respuestasUsuario.length > respuestasCorrectas.length) {
            feedback.textContent = 'Has seleccionado opciones incorrectas. Intenta de nuevo.';
        } else {
            feedback.textContent = 'Respuesta incorrecta. Verifica las líneas que seleccionaste.';
        }
    }
}

/**
 * Navega al ejercicio anterior
 */
function navegarAnterior() {
    if (ejercicioActual > 0) {
        ejercicioActual--;
        renderizarEjercicio();
    }
}

/**
 * Navega al siguiente ejercicio
 */
function navegarSiguiente() {
    if (ejercicioActual < ejercicios.length - 1 && ejerciciosResueltos.has(ejercicioActual)) {
        ejercicioActual++;
        renderizarEjercicio();
    }
}

// ============================================
// EVENT LISTENERS
// ============================================

// Botón Verificar
slideContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('exercise-carousel__verify')) {
        verificarRespuesta();
    }
});

// Botón Anterior
btnPrev.addEventListener('click', navegarAnterior);

// Botón Siguiente
btnNext.addEventListener('click', navegarSiguiente);

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    renderizarEjercicio();
});