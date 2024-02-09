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