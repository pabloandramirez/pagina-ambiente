const urlParams = new URLSearchParams(window.location.search);
const idNoticia = urlParams.get('id');

document.addEventListener("DOMContentLoaded", function() {
    fetch(`http://127.0.0.1:8080/noticia/noticiaPorLong/${idNoticia}`)
    .then(response => response.json())
    .then(data => {
        var { titulo, subtitulo, contenido, fechaPublicacion } = data;

        const titleElement = document.querySelector(`#noticia-titulo`);
        const subtitleElement = document.querySelector(`#noticia-subtitulo`);
        const contentElement = document.querySelector(`#noticia-contenido`);
        const fechaElement = document.querySelector(`#fechaPublicacion`)

        titleElement.textContent = titulo;
        subtitleElement.textContent = subtitulo;
        contentElement.textContent = contenido;
        fechaElement.textContent = fechaPublicacion;

    })
    .catch(error => {
        console.error('Hubo un error al obtener los datos:', error);
    });
  });