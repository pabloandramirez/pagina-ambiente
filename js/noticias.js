var pagina = 1;
const noticiasPorPagina = 8;

// URL de la API de noticias (ficticia)
const apiUrl = `http://localhost:8080/noticia/paginado?pagina=${pagina}&noticiasPorPagina=${noticiasPorPagina}`;

// Función para obtener datos de la API y generar elementos li
async function cargarNoticias() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        // Obtener la lista de noticias del objeto de respuesta (suponiendo que es un arreglo llamado "noticias")
        const noticias = data;

        const cantidadPaginas = Math.floor(noticias.length / 8);
        
        pagina = (cantidadPaginas + 1);
        
        // Obtener el elemento <ul> donde se agregarán las noticias
        const noticiasUl = document.getElementById('noticias');
        
        // Generar elementos <li> para cada noticia y agregarlos al <ul>
        noticias.forEach((noticia, index) => {
            const li = document.createElement('li');
            li.classList.add('noticia-card');
            var { imagenesUrl, contenido } = noticia;
            var primeraImagen = "";
            if(imagenesUrl != null){
                primeraImagen = imagenesUrl.slice(0,1);
            }
            const limiteCaracteres = 75;
            if (contenido.length > limiteCaracteres) {
                contenido = contenido.substring(0, limiteCaracteres) + '...Ver más'; // Agregar puntos suspensivos
            }
            li.innerHTML = `
                <a data-id="${index +1}" class="enlace-noticia" href='/noticia.html?id=${noticia.identificador}'>
                    <img src="${primeraImagen}" alt="noticia-imagen" class="noticia-imagen">
                    <h3 class="noticia-titulo">${noticia.titulo}</h3>
                    <h3 class="noticia-subtitulo">${noticia.subtitulo}</h3>
                    <p class="noticia-resumen">${contenido}</p>
                    <p class="fecha-noticia">${noticia.fechaPublicacionString}</p>
                    <div>
                        <a data-id="${index + 1}" class="enlace-facebook" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http://127.0.0.1:5500/noticia.html?id=${noticia.identificador}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 50 50">
                                <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M37,19h-2c-2.14,0-3,0.5-3,2 v3h5l-1,5h-4v15h-5V29h-4v-5h4v-3c0-4,2-7,6-7c2.9,0,4,1,4,1V19z"></path>
                            </svg>
                        </a>
                        <a data-id="${index + 1}" class="enlace-x" target="_blank" href="https://twitter.com/intent/tweet?url=http://127.0.0.1:5500/noticia.html?id=${noticia.identificador}&text=Lee%20esta%20noticia%20interesante%20sobre%20ambiente!">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 50 50">
                            <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
                            </svg>
                        </a>
                    </div>
                </a>`;
            noticiasUl.appendChild(li);
        });
    } catch (error) {
        console.error('Error al cargar las noticias:', error);
    }
}

// Llamar a la función para cargar las noticias al cargar la página
window.addEventListener('load', cargarNoticias);

//Get the button
let mybutton = document.getElementById("btn-back-to-top");

// Cuando el usuario baja 20px se muestra el boton de subir para arriba
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {

  let offset = 0 // Desplazamiento de 75px hacia arriba
        
  if(window.innerWidth <= 768){
    offset += 75;
  }
  window.scrollTo({
    top: document.body.scrollTop = 0, // Posición de desplazamiento
    behavior: 'smooth' // Desplazamiento suave
  });
  /*document.body.scrollTop = 0;
  behavior: 'smooth' // Desplazamiento suave
  document.documentElement.scrollTop = 0;*/
}


