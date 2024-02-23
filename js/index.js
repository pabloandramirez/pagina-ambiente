document.addEventListener("DOMContentLoaded", function() {
  fetch('http://127.0.0.1:8080/noticia/')
  .then(response => response.json())
  .then(data => {
      // Filtrar los primeros 4 resultados
      const primerosResultados = data.slice(0, 4);

      // Actualizar los elementos HTML con los resultados
      primerosResultados.forEach((result, index) => {
          var { titulo, subtitulo, contenido, identificador } = result;
          
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
          document.querySelector(`#enlace-noticia-${index + 1}`).setAttribute('data-id', identificador);
          document.querySelector(`#enlace-facebook-${index + 1}`).setAttribute('data-id', identificador);
          document.querySelector(`#enlace-instagram-${index + 1}`).setAttribute('data-id', identificador);
      });
  })
  .catch(error => {
      console.error('Hubo un error al obtener los datos:', error);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Obtener todos los enlaces de noticias
  var enlacesNoticias = document.querySelectorAll('.enlace-noticia');

  // Agregar un evento de clic a cada enlace
  enlacesNoticias.forEach(function(enlace) {
      enlace.addEventListener('click', function(event) {
          // Prevenir el comportamiento predeterminado del enlace para evitar que se produzca la navegación
          event.preventDefault();

          // Obtener el identificador de la noticia desde el atributo data-id
          var idNoticia = enlace.getAttribute('data-id');

          // Construir la URL de la página de la noticia con el identificador como parámetro
          var urlPaginaNoticia = '/noticia.html?id=' + idNoticia;

          // Redirigir al usuario a la página de detalles de la noticia
          window.location.href = urlPaginaNoticia;
      });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Obtener el enlace de Facebook
  var enlacesFacebook = document.querySelectorAll('enlace-facebook');

  enlacesFacebook.forEach(function(enlaceFacebook) {
      enlaceFacebook.addEventListener('click', function(event) {
        // Prevenir el comportamiento predeterminado del enlace para evitar que se produzca la navegación
        event.preventDefault();

        // Obtener el id de la noticia desde el atributo data-id
        var idNoticia = enlaceFacebook.getAttribute('data-id');

        // Construir la URL completa con el id de la noticia
        var urlCompleta = 'https://www.facebook.com/sharer/sharer.php?u=http://127.0.0.1:5500/noticia.html?id=' + idNoticia;

        // Abrir la ventana de compartir de Facebook en una nueva pestaña
        window.open(urlCompleta, '_blank');
    });
  });
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        let offset = 0 // Desplazamiento de 75px hacia arriba
        
        if(window.innerWidth <= 768){
          offset += 75;
        }
        window.scrollTo({
          top: targetElement.offsetTop - offset, // Posición de desplazamiento
          behavior: 'smooth' // Desplazamiento suave
        });

        document.getElementById('items-nav').className = 'items-nav';
      }
    });
  });

var selectElement = document.getElementById('select-opciones');
var hiddenInputElement = document.getElementById('input-categoria');

// Establecer el valor predeterminado del campo oculto al valor seleccionado por defecto
hiddenInputElement.value = selectElement.value;

// Escuchar el evento de cambio en el select
selectElement.addEventListener('change', function() {
  hiddenInputElement.value = this.value;
});

var selectElement2 = document.getElementById('select-opciones-2');
var hiddenInputElement2 = document.getElementById('input-categoria-2');

// Establecer el valor predeterminado del campo oculto al valor seleccionado por defecto
hiddenInputElement2.value = selectElement2.value;

// Escuchar el evento de cambio en el select
selectElement2.addEventListener('change', function() {
  hiddenInputElement2.value = this.value;
});

var inputTelefono = document.getElementById('telefono');
    inputTelefono.addEventListener('input', function() {
        if (inputTelefono.value.length > 13) {
            inputTelefono.value = inputTelefono.value.slice(0, 13); // Limitar la entrada a 13 caracteres
        }
    });

const input = document.getElementById("mensaje-contenido");
const placeholder = document.getElementById("placeholder");

input.addEventListener("input", function() {
    const inputValue = this.value;
    const cursorPosition = this.selectionStart;
    
    const beforeCursor = inputValue.substring(0, cursorPosition);
    const afterCursor = inputValue.substring(cursorPosition);
    
    placeholder.textContent = beforeCursor; // Alinea el placeholder con el texto antes del cursor
    
    // Mueve el cursor al principio del campo de entrada
    this.setSelectionRange(0, 0);
});

document.addEventListener("DOMContentLoaded", function() {
  window.addEventListener("scroll", function() {
      var barraNavegacion = document.getElementById("nav-bar");
      var distanciaDesdeArriba = barraNavegacion.offsetTop;

      if (window.scrollY > distanciaDesdeArriba) {
          barraNavegacion.classList.add("barra-fija");
      } else {
          barraNavegacion.classList.remove("barra-fija");
      }
  });
});


document.addEventListener("DOMContentLoaded", function() {
  var menuIcon = document.querySelector(".menu-icon");
  var itemsNav = document.querySelector(".items-nav");

  menuIcon.addEventListener("click", function() {
      itemsNav.classList.toggle("active");
  });
});


