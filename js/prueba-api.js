// URL de la API que deseas probar
const apiUrl = 'http://127.0.0.1:8080/noticia/';

// Realizar una solicitud GET a la API
fetch(apiUrl)
  .then(response => {
    // Verificar si la respuesta es exitosa (código de estado 200)
    if (response.ok) {
      // Convertir la respuesta a formato JSON
      return response.json();
    }
    // Si hay un error, lanzar una excepción
    throw new Error('Error al obtener datos de la API');
  })
  .then(data => {
    // Aquí puedes manejar los datos recibidos de la API
    console.log('Datos de la API:', data);
  })
  .catch(error => {
    // Capturar y manejar cualquier error ocurrido durante la solicitud
    console.error('Error:', error.message);
  });