document.addEventListener("DOMContentLoaded", function() {
  fetch('http://127.0.0.1:8080/noticia/')
  .then(response => response.json())
  .then(data => {
      // Filtrar los primeros 4 resultados
      const primerosResultados = data.slice(0, 4);

      // Actualizar los elementos HTML con los resultados
      primerosResultados.forEach((result, index) => {
          var { titulo, subtitulo, contenido, identificador, imagenesUrl} = result;
          
          
          // Obtener los elementos HTML por clase o id
          const titleElement = document.querySelector(`#noticia-titulo-${index + 1}`);
          const subtitleElement = document.querySelector(`#noticia-subtitulo-${index + 1}`);
          const contentElement = document.querySelector(`#noticia-resumen-${index + 1}`);
          const enlaceNoticiaElement = document.querySelector(`#enlace-noticia-${index + 1}`);
          const enlaceFacebookElement = document.querySelector(`#enlace-facebook-${index + 1}`);
          const enlaceXElement = document.querySelector(`#enlace-x-${index + 1}`);
          const enlaceImagen = document.querySelector(`#imagen-noticia-${index + 1}`);

          const limiteCaracteres = 75;
          if (contenido.length > limiteCaracteres) {
            contenido = contenido.substring(0, limiteCaracteres) + '...Ver más'; // Agregar puntos suspensivos
          }

          // Actualizar el contenido de los elementos
          titleElement.textContent = titulo;
          subtitleElement.textContent = subtitulo;
          contentElement.textContent = contenido;
          enlaceNoticiaElement.setAttribute('href','/noticia.html?id=' + identificador);
          enlaceFacebookElement.setAttribute('href', 
          'https://www.facebook.com/sharer/sharer.php?u=http://127.0.0.1:5500/noticia.html?id=' + 
          identificador);
          enlaceXElement.setAttribute('href', 
          `https://twitter.com/intent/tweet?url=http://127.0.0.1:5500/noticia.html?id=${identificador}&text=Lee%20esta%20noticia%20interesante%20sobre%20ambiente!`);


          //Obtener solo la primera imagen
          if(imagenesUrl != null){
            const primeraImagen = imagenesUrl.slice(3,4);
            enlaceImagen.setAttribute('href', primeraImagen);
          }

      });
  })
  .catch(error => {
      console.error('Hubo un error al obtener los datos:', error);
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


//Get the button
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
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
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}