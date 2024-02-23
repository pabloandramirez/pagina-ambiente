document.addEventListener("DOMContentLoaded", function() {
    fetch(`http://127.0.0.1:8080/noticia/${}`)
    .then(response => response.json())
    .then(data => {
        // Filtrar los primeros 4 resultados
        const primerosResultados = data.slice(0, 4);
  
        // Actualizar los elementos HTML con los resultados
        primerosResultados.forEach((result, index) => {
            var { titulo, subtitulo, contenido } = result;
            
            // Obtener los elementos HTML por clase o id
            const titleElement = document.querySelector(`#noticia-titulo-${index + 1}`);
            const subtitleElement = document.querySelector(`#noticia-subtitulo-${index + 1}`);
            const contentElement = document.querySelector(`#noticia-resumen-${index + 1}`);
  
            const limiteCaracteres = 50;
            if (contenido.length > limiteCaracteres) {
              contenido = contenido.substring(0, limiteCaracteres) + '...Ver más'; // Agregar puntos suspensivos
            }
  
            // Actualizar el contenido de los elementos
            titleElement.textContent = titulo;
            subtitleElement.textContent = subtitulo;
            contentElement.textContent = contenido;
        });
    })
    .catch(error => {
        console.error('Hubo un error al obtener los datos:', error);
    });
  });