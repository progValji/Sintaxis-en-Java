// ============================================
// CARRUSEL DE EJERCICIOS
// ============================================

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