document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop, // Posición de desplazamiento
          behavior: 'smooth' // Desplazamiento suave
        });
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