const progressFill = document.querySelector('.exercise-carousel__progress-fill');
const slideContainer = document.querySelector('.exercise-carousel');
const btnPrev = document.querySelector('.exercise-carousel__button--prev');
const btnNext = document.querySelector('.exercise-carousel__button--next');
const feedback = slideContainer.querySelector('.exercise-carousel__feedback')

let ejercicioActual = 1
let categoria = null
const CANTIDAD_EJERCICIOS = 10

async function comprobarFeedback(){
    if(feedback.classList.contains('exercise-carousel__feedback--mostrar')){
        await ocultarFeedback()
    }
}

function ocultarFeedback(){
    return new Promise(resolve => {
        feedback.classList.remove('exercise-carousel__feedback--mostrar')
        setTimeout(() => {
            feedback.classList.remove(`exercise-carousel__feedback--${categoria}`)
            resolve()
        }, 500)
    })
}

function mostrarFeedback(){
    feedback.classList.add(`exercise-carousel__feedback--${categoria}`)
    feedback.classList.add('exercise-carousel__feedback--mostrar')
}

function actualizarBarraProgreso() {
    const porcentaje = (ejercicioActual / CANTIDAD_EJERCICIOS) * 100;
    progressFill.style.width = porcentaje + '%';
}

async function verificarRespuesta() {
    const slideActivo = document.querySelector('.exercise-carousel__slide--active');
    if (!slideActivo) return;

    const form = slideActivo.querySelector('.exercise-carousel__options');
    if (!form) return;

    const radioSeleccionado = form.querySelector('input[name^="exercise"]:checked');
    if (!radioSeleccionado) {
        feedback.querySelector('p').textContent = 'Por favor selecciona una respuesta'
        categoria = 'warning'
        await comprobarFeedback()
        mostrarFeedback()
        return;
    }

    const respuestaUsuario = radioSeleccionado.value;

    if(respuestaUsuario === slideActivo.dataset.respuesta){
        await comprobarFeedback()
        categoria = 'success'
        feedback.querySelector('p').textContent = '¡Bien hecho! '
        feedback.querySelector('p').textContent += slideActivo.dataset.explicacion
    }
    else{
        await comprobarFeedback()
        categoria = 'error'
        feedback.querySelector('p').textContent = '¡Oh no!, vuelve a intentarlo'
    }
    mostrarFeedback()
}

function moverSlide(sentido){
    const slideActivo = document.querySelector('.exercise-carousel__slide--active');
    const slideProximo = sentido === 'next'? slideActivo.nextElementSibling : slideActivo.previousElementSibling
    slideActivo.classList.add('exercise-carousel__slide--exit')

    setTimeout(function(){
        slideActivo.classList.remove('exercise-carousel__slide--active', 'exercise-carousel__slide--exit')
    }, 500)

    setTimeout(function(){
        slideProximo.classList.add('exercise-carousel__slide--active')
    }, 500)
}

function verificarEjercicioActual(){
    if(ejercicioActual >= CANTIDAD_EJERCICIOS){
        btnNext.disabled = true
        btnPrev.disabled = false
    }
    else if(ejercicioActual == 1){
        btnPrev.disabled = true
        btnNext.disabled = false
    }
    else{
        btnPrev.disabled = false
        btnNext.disabled = false
    }
}

function actualizarDotActivo() {
    document.querySelectorAll('.exercise-carousel__dot').forEach(dot => {
        const index = parseInt(dot.dataset.dotIndex, 10);
        dot.classList.toggle('exercise-carousel__dot--active', index === ejercicioActual);
    });
}

function irAEjercicio(numeroEjercicio) {
    const slideActual = document.querySelector('.exercise-carousel__slide--active');
    const slideDestino = document.querySelector(`[data-exercise="${numeroEjercicio}"]`);
    
    if (!slideDestino || numeroEjercicio === ejercicioActual) return;
    
    ejercicioActual = numeroEjercicio;
    verificarEjercicioActual();
    document.querySelector('.exercise-carousel__current').textContent = ejercicioActual;
    actualizarBarraProgreso();
    actualizarDotActivo()
    
    // Mover slide
    slideActual.classList.add('exercise-carousel__slide--exit');
    setTimeout(function(){
        slideActual.classList.remove('exercise-carousel__slide--active', 'exercise-carousel__slide--exit');
    }, 500);
    setTimeout(function(){
        slideDestino.classList.add('exercise-carousel__slide--active');
    }, 500);
}

feedback.querySelector('button').addEventListener('click', function(){
    ocultarFeedback()
})

slideContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('exercise-carousel__verify')) {
        verificarRespuesta();
    }
});

document.querySelectorAll('.exercise-carousel__dot').forEach(dot => {
    dot.addEventListener('click', function() {
        const numeroEjercicio = parseInt(this.dataset.dotIndex);
        comprobarFeedback()
        irAEjercicio(numeroEjercicio);
    });
});

btnNext.addEventListener('click', function(){
    ejercicioActual++
    verificarEjercicioActual()
    document.querySelector('.exercise-carousel__current').textContent = ejercicioActual
    actualizarBarraProgreso()
    actualizarDotActivo()
    comprobarFeedback()
    moverSlide('next') 
})

btnPrev.addEventListener('click', function(){
    ejercicioActual--
    verificarEjercicioActual()
    document.querySelector('.exercise-carousel__current').textContent = ejercicioActual
    actualizarBarraProgreso()
    actualizarDotActivo()
    comprobarFeedback()
    moverSlide('prev') 
})