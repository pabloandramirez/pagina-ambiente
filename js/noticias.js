const apiUrlBase = 'http://localhost:8080/noticia/paginado';
const apiUrlNoticias = 'http://localhost:8080/noticia/';
const noticiasPorPagina = 8;
const previousPageBtn = document.getElementById('previous-page');
const nextPageBtn = document.getElementById('next-page');
const firstPageBtn = document.getElementById('first-page');
const lastPageBtn = document.getElementById('last-page');
let totalPages = 1;
let paginaActual = 1;


window.addEventListener('load', function() {
    cargarNoticias(1)
        .then(() => todasLasNoticias())
        .catch(error => console.error('Error al cargar las noticias:', error));
});


document.getElementById('pagination').addEventListener('click', function(event) {
    if (event.target.tagName === 'A' && !event.target.classList.contains('page-link-disabled')) {
        event.preventDefault();
        const paginaClicada = parseInt(event.target.textContent);
        if (!isNaN(paginaClicada) && paginaClicada !== paginaActual) {
            paginaActual = paginaClicada;
            cargarNoticias(paginaActual)
                .then(() => updatePagination())
                .catch(error => console.error('Error al cargar las noticias:', error));
        }

        if(event.target.classList.contains('previous-page')) {
            cargarNoticias(paginaActual - 1);
            paginaActual--;
        };
        
        if(event.target.classList.contains('next-page')) {
            cargarNoticias(paginaActual + 1);
            paginaActual++;
        };

        if(event.target.classList.contains('first-page')) {
            cargarNoticias(1);
            paginaActual = 1;
        };

        if(event.target.classList.contains('last-page')) {
            cargarNoticias(totalPages);
            paginaActual = totalPages;
        };
    }
});

async function cargarNoticias(numeroPagina) {
    try {
        mostrarCargando();
        const apiUrl = `${apiUrlBase}?pagina=${numeroPagina}&noticiasPorPagina=${noticiasPorPagina}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        const noticias = data;

        const noticiasUl = document.getElementById('noticias');
        noticiasUl.innerHTML = '';

        noticias.forEach((noticia, index) => {
            // Crear elementos de noticias
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
                    <div class="fecha-publicacion">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
                        </svg>
                        <p id="fecha-noticia-1" class="fecha-noticia">${noticia.fechaPublicacionString}</p>
                    </div>
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

        updatePagination(); // Actualizar la paginación después de cargar las noticias

        ocultarCargando();

        return Promise.resolve(); // Promesa resuelta para indicar que la carga de noticias se completó correctamente
    } catch (error) {
        return Promise.reject(error); // Rechazar la promesa en caso de error
    }
}

function updatePagination() {
    const paginas = document.querySelectorAll('.pagination .page-item');
    paginas.forEach(function(pagina) {
        pagina.classList.remove('active');
        if (parseInt(pagina.querySelector('.page-link').textContent) === paginaActual) {
            pagina.classList.add('active');
        }
    });
    // Actualizar el estado de los botones de página anterior y siguiente
    // según la página actual y el número total de páginas
    if (paginaActual === totalPages && paginaActual === 1) {
        nextPageBtn.parentElement.style.display = 'none';
        lastPageBtn.parentElement.style.display = 'none';
        previousPageBtn.parentElement.style.display = 'none';
        firstPageBtn.parentElement.style.display = 'none';
      } else if(paginaActual === totalPages) {
        nextPageBtn.parentElement.style.display = 'none';
        lastPageBtn.parentElement.style.display = 'none';
        previousPageBtn.parentElement.style.display = 'list-item';
        firstPageBtn.parentElement.style.display = 'list-item';
      } else if(paginaActual === 1) {
        previousPageBtn.parentElement.style.display = 'none';
        firstPageBtn.parentElement.style.display = 'none';
        nextPageBtn.parentElement.style.display = 'list-item';
        lastPageBtn.parentElement.style.display = 'list-item';
      } else {
        previousPageBtn.parentElement.style.display = 'list-item';
        nextPageBtn.parentElement.style.display = 'list-item';
        firstPageBtn.parentElement.style.display = 'list-item';
        lastPageBtn.parentElement.style.display = 'list-item';
      }
}

async function todasLasNoticias() {
    try {
        const response = await fetch(apiUrlNoticias);
        const data = await response.json();

        const cantidadNoticias = data.length;
        const cantidadPaginas = Math.ceil(cantidadNoticias / noticiasPorPagina);
        totalPages = cantidadPaginas;

        // Inicializar la paginación
        const paginadoList = document.getElementById('pagination');
        /*paginadoList.innerHTML = ''; // Limpiar el contenido existente*/
        for (let index = 1; index <= cantidadPaginas; index++) {
            const newPageItem = document.createElement('li');
            newPageItem.classList.add('page-item');
            if (index === paginaActual) {
                newPageItem.classList.add('active');
            }
            const newPageLink = document.createElement('a');
            newPageLink.classList.add('page-link');
            newPageLink.href = '#';
            newPageLink.textContent = index;
            newPageItem.appendChild(newPageLink);
            paginadoList.appendChild(newPageItem);
            paginadoList.insertBefore(newPageItem, nextPageBtn.parentNode);
        }
    } catch (error) {
        console.error('No se cargaron todas las noticias:', error);
    }
}

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


function mostrarCargando() {
    const cargando = document.querySelector('.cargando');
    cargando.style.display = 'block';
}
  
  function ocultarCargando() {
    const cargando = document.querySelector('.cargando');
    cargando.style.opacity = 0;
    setTimeout(() => {
        cargando.style.display = 'none';
        cargando.style.opacity = 1; // Restaurar la opacidad por si se vuelve a mostrar
    }, 500); // Ajusta el tiempo según la duración de tu transición CSS
}