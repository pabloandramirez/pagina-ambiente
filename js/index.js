const urlNormativas = 'http://127.0.0.1:8080/normativa/';

document.addEventListener("DOMContentLoaded", function(){
  cargarNoticias();
} );

async function cargarNoticias() {
  try{
    await fetch('http://127.0.0.1:8080/noticia/')
    .then(response => response.json())
    .then(data => {
      console.log('muestra cargando');
      mostrarCargando();
      // Filtrar los primeros 4 resultados
      const primerosResultados = data.slice(0, 4);

      // Actualizar los elementos HTML con los resultados
      primerosResultados.forEach((result, index) => {
          var { titulo, subtitulo, contenido, identificador, imagenesUrl, fechaPublicacionString} = result;
          
          
          // Obtener los elementos HTML por clase o id
          const titleElement = document.querySelector(`#noticia-titulo-${index + 1}`);
          const subtitleElement = document.querySelector(`#noticia-subtitulo-${index + 1}`);
          const contentElement = document.querySelector(`#noticia-resumen-${index + 1}`);
          const enlaceNoticiaElement = document.querySelector(`#enlace-noticia-${index + 1}`);
          const enlaceFacebookElement = document.querySelector(`#enlace-facebook-${index + 1}`);
          const enlaceXElement = document.querySelector(`#enlace-x-${index + 1}`);
          const enlaceImagen = document.querySelector(`#imagen-noticia-${index + 1}`);
          const fechaElement = document.querySelector(`#fecha-noticia-${index +1}`);

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
          fechaElement.textContent = fechaPublicacionString;


          //Obtener solo la primera imagen
          if(imagenesUrl != null){
            const primeraImagen = imagenesUrl.slice(0,1);
            enlaceImagen.setAttribute('src', primeraImagen);
          }

      });
      ocultarCargando();
      console.log('oculta cargando');
  })
  .catch(error => {
      console.error('Hubo un error al obtener los datos:', error);
      setInterval(cargarNoticias, 60000);
  });

  return Promise.resolve();
  } catch (error) {
    return Promise.reject(error); // Rechazar la promesa en caso de error
  }
}


// var selectElement = document.getElementById('select-opciones');
// var hiddenInputElement = document.getElementById('input-categoria');

// // Establecer el valor predeterminado del campo oculto al valor seleccionado por defecto
// hiddenInputElement.value = selectElement.value;

// // Escuchar el evento de cambio en el select
// selectElement.addEventListener('change', function() {
//   hiddenInputElement.value = this.value;
// });

// var selectElement2 = document.getElementById('select-opciones-2');
// var hiddenInputElement2 = document.getElementById('input-categoria-2');

// Establecer el valor predeterminado del campo oculto al valor seleccionado por defecto
// hiddenInputElement2.value = selectElement2.value;

// Escuchar el evento de cambio en el select
// selectElement2.addEventListener('change', function() {
//   hiddenInputElement2.value = this.value;
// });

var inputTelefono = document.getElementById('telefono');
    inputTelefono.addEventListener('input', function() {
        if (inputTelefono.value.length > 13) {
            inputTelefono.value = inputTelefono.value.slice(0, 13); // Limitar la entrada a 13 caracteres
        }
    });

const input = document.getElementById("mensaje-contenido");
const placeholder = document.getElementById("placeholder");

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

var menuIcon = document.getElementById("hamburger");
var sidebar = document.getElementById("sidebar");

document.addEventListener("DOMContentLoaded", function() {
  menuIcon.addEventListener('click', function(e) {
      menuIcon.classList.toggle("open");
      sidebar.classList.toggle("active");
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
        offset += 50;
      }
      window.scrollTo({
        top: targetElement.offsetTop - offset, // Posición de desplazamiento
        behavior: 'smooth' // Desplazamiento suave
      });

      document.getElementById('sidebar').className = 'sidebar list-unstyled';
      menuIcon.classList.toggle("open");
    }
  });
});



//Control del boton de enviar consulta
document.getElementById("understood-btn").addEventListener("click", function(event) {
  // Evita que el formulario se envíe automáticamente
  event.preventDefault();

  // Verifica si todos los campos requeridos están completos
  if (camposValidos()) {
      const formData = new FormData(document.getElementById("mi-formulario"));

      const formDataJSON = {
        asunto: formData.get('asunto'),
        nombreYApellido: formData.get('nombreYApellido'),
        email: formData.get('email'),
        telefono: formData.get('telefono'),
        mensaje: formData.get('mensaje')
      };

      console.log(formDataJSON);

      fetch("http://127.0.0.1:8080/contacto", {
          method: "POST",
          mode: "cors",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(formDataJSON)
      })
      .then(response => {
          // Verificar si la solicitud fue exitosa
          if (response.ok) {
              $('#staticBackdrop').modal('hide');
              $('#staticBackdrop2').modal('show');
              // Mostrar la ventana modal de confirmación
              setTimeout(function() {
                window.location.reload();
              }, 3000); // ajusta el tiempo según sea necesario
          } else {
              // Manejar el caso de error
              throw new Error('Hubo un problema al enviar el formulario.');
          }
      });
  } else {
      // Si faltan campos, muestra un mensaje de error o realiza alguna otra acción
      alert("Por favor, complete los campos obligatorios antes de enviar.");
  }
});

function camposValidos() {
  var mensaje = document.getElementById("mensaje-contenido").value;
  var asunto = document.getElementById("asunto").value;
  var nombre = document.getElementById("nombre-apellido").value;
  var telefono = document.getElementById("telefono").value;
  // Verifica si los campos no están vacíos
  if (nombre.trim() === '' || telefono.trim() === '' || asunto.trim() === '' || mensaje.trim() === '') {
      return false;
  }
  return true;
}


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

function markRequired() {
  var control = $(this).children(".form-control");
  var label = $(this).children("label");
  if (control.attr("required") == "required") {
      label.addClass("required");
  }
}

function countCharacters() {
  var max = $(this).attr("maxlength");
  var length = $(this).val().length;
  var counter = max - length;
  var helper = $(this).next(".form-text");
  // Switch to the singular if there's exactly 1 character remaining
  if (counter !== 1) {
      helper.text(counter + " characters remaining");
  } else {
      helper.text(counter + " character remaining");
  }
  // Make it red if there are 0 characters remaining
  if (counter === 0) {
      helper.removeClass("text-muted");
      helper.addClass("text-danger");
  } else {
      helper.removeClass("text-danger");
      helper.addClass("text-muted");
  }
}

$(document).ready(function () {
  $(".form-group").each(markRequired);
  $(".form-control").each(countCharacters);
  $(".form-control").keyup(countCharacters);
});

document.getElementById('btn-buscar-normativas').addEventListener('click', async function(e) {
  try{
    e.preventDefault();
    const stringDireccion = document.getElementById('select-opciones').value;
    const containerResultados = document.getElementById('resultados-normativas');


    await fetch(urlNormativas+"?direccion="+`${stringDireccion}`)
    .then(response => response.json())
    .then(data => {
      const resultadosNormativas = data;
      containerResultados.innerHTML='';

      resultadosNormativas.forEach((result, index) =>{
        var{titulo, direccion, urlDocumento} = result;

        const anchord = document.createElement('a');
        anchord.classList.add('enlace-normativa');
        anchord.setAttribute('href', urlDocumento);
        anchord.setAttribute('target', '_blank')
        anchord.innerHTML=`
            <svg xmlns="http://www.w3.org/2000/svg" width="5rem" height="5rem" fill="currentColor" class="bi bi-filetype-pdf" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM1.6 11.85H0v3.999h.791v-1.342h.803q.43 0 .732-.173.305-.175.463-.474a1.4 1.4 0 0 0 .161-.677q0-.375-.158-.677a1.2 1.2 0 0 0-.46-.477q-.3-.18-.732-.179m.545 1.333a.8.8 0 0 1-.085.38.57.57 0 0 1-.238.241.8.8 0 0 1-.375.082H.788V12.48h.66q.327 0 .512.181.185.183.185.522m1.217-1.333v3.999h1.46q.602 0 .998-.237a1.45 1.45 0 0 0 .595-.689q.196-.45.196-1.084 0-.63-.196-1.075a1.43 1.43 0 0 0-.589-.68q-.396-.234-1.005-.234zm.791.645h.563q.371 0 .609.152a.9.9 0 0 1 .354.454q.118.302.118.753a2.3 2.3 0 0 1-.068.592 1.1 1.1 0 0 1-.196.422.8.8 0 0 1-.334.252 1.3 1.3 0 0 1-.483.082h-.563zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638z"/>
            </svg>
            <h3>${titulo}</h3>
        `;
        containerResultados.appendChild(anchord);
      })
    }
    )
    .catch(error => {
      console.error('Hubo un error al obtener los datos:', error);
    });

    return Promise.resolve();
  } catch(error){
    return Promise.reject(error); // Rechazar la promesa en caso de error
  }


})