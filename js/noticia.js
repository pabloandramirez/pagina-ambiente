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

const apiUrl = `http://127.0.0.1:8080/noticia/noticiaPorLong/${idNoticia}`;

// Función para cargar las imágenes desde la API y crear el carousel
async function cargarCarousel() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const imagenes = data.imagenesUrl;
        const carouselIndicators = document.getElementById('carouselIndicators');
        const carouselInner = document.getElementById('carouselInner');

        imagenes.forEach((imagen, index) => {
            // Crear el indicador del carousel
            const indicator = document.createElement('button');
            indicator.type = 'button';
            indicator.dataset.bsTarget = '#carouselExampleCaptions';
            indicator.dataset.bsSlideTo = index;
            if (index === 0) {
                indicator.classList.add('active');
            }
            carouselIndicators.appendChild(indicator);

            // Crear el elemento del carousel
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            if (index === 0) {
                carouselItem.classList.add('active');
            }
            carouselItem.innerHTML = `
            <svg
                class="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
                width="800"
                height="400"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: First slide"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
            >
                <title>Placeholder</title>
                <image
                class="imagen-ambiente"
                href="${imagen}"
                width="100%"
                />
                <text x="50%" y="50%" fill="#555" dy=".3em">First slide</text>
            </svg>
            `;
            carouselInner.appendChild(carouselItem);
        });

        const botonPrevio = document.querySelector(".carousel-control-prev");
        const botonNext = document.querySelector(".carousel-control-next");

        if(imagenes.length===1){
            carouselIndicators.setAttribute('style', 'display: none');
            botonPrevio.setAttribute('style', 'display: none');
            botonNext.setAttribute('style', 'display: none');
        }

    } catch (error) {
        console.error('Error al cargar el carousel:', error);
    }
}

// Llamar a la función para cargar el carousel al cargar la página
window.addEventListener('load', cargarCarousel);