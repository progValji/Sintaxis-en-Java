document.addEventListener("DOMContentLoaded", function () {
    const yaVisito = localStorage.getItem("visito_antes_de_comenzar");

    if (!yaVisito) {
        window.location.href = "/antes_de_comenzar";
    }
});
