const progressFill = document.querySelector('.exercise-carousel__progress-fill');
const slideContainer = document.querySelector('.exercise-carousel');
const btnPrev = document.querySelector('.exercise-carousel__button--prev');
const btnNext = document.querySelector('.exercise-carousel__button--next');

let ejercicioActual = 1
const CANTIDAD_EJERCICIOS = 10

function mostrarFeedback(feedback, categoria){
    feedback.classList.add(`exercise-carousel__feedback--${categoria}`)
    feedback.classList.add('exercise-carousel__feedback--mostrar')
}

function actualizarBarraProgreso() {
    const porcentaje = (ejercicioActual / CANTIDAD_EJERCICIOS) * 100;
    progressFill.style.width = porcentaje + '%';
}

function verificarRespuesta() {
    const slideActivo = document.querySelector('.exercise-carousel__slide--active');
    const feedback = slideContainer.querySelector('.exercise-carousel__feedback')
    if (!slideActivo) return;

    const form = slideActivo.querySelector('.exercise-carousel__options');
    if (!form) return;

    const radioSeleccionado = form.querySelector('input[name^="exercise"]:checked');
    if (!radioSeleccionado) {
        feedback.querySelector('p').textContent = 'Por favor selecciona una respuesta'
        mostrarFeedback(feedback, 'warning')
        return;
    }

    const respuestaUsuario = radioSeleccionado.value;

    if(respuestaUsuario === slideActivo.dataset.respuesta){
        feedback.querySelector('p').textContent = slideActivo.dataset.explicacion
    }
    else{
        feedback.querySelector('p').textContent = '¡Oh no!, vuelve a intentarlo'
    }
    mostrarFeedback(feedback)
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
    if(ejercicioActual >= CANTIDAD_EJERCICIOS)
        btnNext.disabled = true
    else if(ejercicioActual == 1)
        btnPrev.disabled = true
    else{
        btnNext.disabled = false
        btnPrev.disabled = false
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

slideContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('exercise-carousel__verify')) {
        verificarRespuesta();
    }
});

document.querySelectorAll('.exercise-carousel__dot').forEach(dot => {
    dot.addEventListener('click', function() {
        const numeroEjercicio = parseInt(this.dataset.dotIndex);
        irAEjercicio(numeroEjercicio);
    });
});

btnNext.addEventListener('click', function(){
    ejercicioActual++
    verificarEjercicioActual()
    document.querySelector('.exercise-carousel__current').textContent = ejercicioActual
    actualizarBarraProgreso()
    actualizarDotActivo()
    moverSlide('next') 
})

btnPrev.addEventListener('click', function(){
    ejercicioActual--
    verificarEjercicioActual()
    document.querySelector('.exercise-carousel__current').textContent = ejercicioActual
    actualizarBarraProgreso()
    actualizarDotActivo()
    moverSlide('prev') 
})