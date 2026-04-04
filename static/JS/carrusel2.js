const progressCurrent = document.querySelector('.exercise-carousel__current');
const progressTotal = document.querySelector('.exercise-carousel__total');
const progressFill = document.querySelector('.exercise-carousel__progress-fill');
const slideContainer = document.querySelector('.exercise-carousel');
const btnPrev = document.querySelector('.exercise-carousel__button--prev');
const btnNext = document.querySelector('.exercise-carousel__button--next');

let ejercicioActual = 1
const CANTIDAD_EJERCICIOS = 10

function mostrarFeedback(feedback){
    feedback.classList.add('exercise-carousel__feedback--visible')
    setTimeout(() => {
        feedback.classList.remove('exercise-carousel__feedback--visible')
    }, 2000);
}

function actualizarBarraProgreso() {
    const porcentaje = (ejercicioActual / CANTIDAD_EJERCICIOS) * 100;
    progressFill.style.width = porcentaje + '%';
}

function verificarRespuesta() {
    const slideActivo = document.querySelector('.exercise-carousel__slide--active');
    const feedback = slideActivo.querySelector('.exercise-carousel__feedback')
    if (!slideActivo) return;

    const form = slideActivo.querySelector('.exercise-carousel__options');
    if (!form) return;

    const radioSeleccionado = form.querySelector('input[name^="exercise"]:checked');
    if (!radioSeleccionado) {
        feedback.querySelector('p').textContent = 'Por favor selecciona una respuesta'
        mostrarFeedback(feedback)
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

slideContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('exercise-carousel__verify')) {
        verificarRespuesta();
    }
});

btnNext.addEventListener('click', function(){
    ejercicioActual++
    verificarEjercicioActual()
    document.querySelector('.exercise-carousel__current').textContent = ejercicioActual
    actualizarBarraProgreso()
    moverSlide('next') 
})

btnPrev.addEventListener('click', function(){
    ejercicioActual--
    verificarEjercicioActual()
    document.querySelector('.exercise-carousel__current').textContent = ejercicioActual
    actualizarBarraProgreso()
    moverSlide('prev') 
})