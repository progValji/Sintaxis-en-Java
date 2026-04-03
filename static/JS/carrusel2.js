const progressCurrent = document.querySelector('.exercise-carousel__current');
const progressTotal = document.querySelector('.exercise-carousel__total');
const progressFill = document.querySelector('.exercise-carousel__progress-fill');
const slideContainer = document.querySelector('.exercise-carousel__slide');
const btnPrev = document.querySelector('.exercise-carousel__button--prev');
const btnNext = document.querySelector('.exercise-carousel__button--next');

let ejercicioActual = 1

function verificarRespuesta() {
    const slideActivo = document.querySelector('.exercise-carousel__slide--active');
    if (!slideActivo) return;

    const form = slideActivo.querySelector('.exercise-carousel__options');
    if (!form) return;

    const radioSeleccionado = form.querySelector('input[name^="exercise"]:checked');
    if (!radioSeleccionado) {
        alert('Por favor, selecciona una opción.');
        return;
    }

    const respuestaUsuario = radioSeleccionado.value;

    const feedback = document.querySelector('.exercise-carousel__feedback')
    if(respuestaUsuario === slideActivo.dataset.respuesta){
        feedback.querySelector('p:last-of-type').style.display = 'none'
        feedback.querySelector('p:first-of-type').style.display = 'block'
    }
    else{
        feedback.querySelector('p:first-of-type').style.display = 'none'
        feedback.querySelector('p:last-of-type').style.display = 'block'
    }
}

slideContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('exercise-carousel__verify')) {
        verificarRespuesta();
    }
});