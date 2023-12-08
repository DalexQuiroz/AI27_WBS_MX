let userInput = {};
let apiData = {};

document.getElementById('traer').addEventListener('click', traer);
document.getElementById('Enviar').addEventListener('click', enviarDatos);

function traer() {
  let informacionInput = document.getElementById('ingresar_id').value;
  let valorNumerico = parseInt(informacionInput, 10);

  fetch(`https://ws.fulltrack2.com/events/single/id/${valorNumerico}/apiKey/2de1558ef0b75457df254383eecbf0400b1362b7/secretKey/6ef96e3ad7d2e6e3293426c6f11bbb8e3ac493aa`)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      if (res.data.length > 0) {
        const element = res.data[0];

        // Datos del API
        apiData = {
          ecoNumber: String(element.ras_vei_veiculo),
          plates: String(element.ras_vei_placa),
          generatedEventDate: formatearFecha(element.ras_eve_data_enviado),
          latitude: parseFloat(element.ras_eve_latitude),
          longitude: parseFloat(element.ras_eve_longitude),
          speed: parseFloat(element.ras_eve_velocidade),
          heading: parseInt(element.ras_eve_velocidade, 10),
          odometer: parseInt(element.ras_eve_hodometro, 10),
          battery: parseFloat(element.ras_eve_voltagem)
        };

        // Datos del usuario
        userInput = {
          customerId: parseInt(document.getElementById('customerId').value, 10),
          transportLineId: parseInt(document.getElementById('transportLineId').value, 10),
          generatedEvent: (document.getElementById('generatedEvent').value)
        };

        console.log(apiData);
        console.log(userInput);

        // Aquí puedes hacer lo que quieras con los objetos apiData y userInput
      }
    });
}

function enviarDatos() {
  // Obtener el objeto final
  const finalObject = construirObjeto();

  // Crear una solicitud POST con el objeto como cuerpo
  fetch('https://cors-anywhere.herokuapp.com/https://api.ai27appsservices.com/AI27WebApi', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJraWQiOiJUdjhreEsycTZJMWhra0ZWUk90eTFvNXZJdmZndEt1TU9UdU01MWh3YWdRPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI0Y3ZrdG50Njdrbm41NTh2aWpjbW1zdXQ2dSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoid3NhdXRoaWRlbnRpZmllclwvd3Muc2NvcGUiLCJhdXRoX3RpbWUiOjE3MDE5OTQxMDIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX210RUhESk9uaSIsImV4cCI6MTcwMTk5NzcwMiwiaWF0IjoxNzAxOTk0MTAyLCJ2ZXJzaW9uIjoyLCJqdGkiOiIwMzQ2YWE0My1hMmEwLTQwMjQtYTFmZi1jZWQ2MTNlMDc3YTkiLCJjbGllbnRfaWQiOiI0Y3ZrdG50Njdrbm41NTh2aWpjbW1zdXQ2dSJ9.Me8EE57_LVTK4JRMBeVN5P0udu7rD8-kSjyFLxyCekRzlBOHsxCH7PGDL9N-_zZAHTEHLkLeX0ltApIIeiflyS91IGkiYlG_H323bhtGkCC-MrwQfhJcZ7YOd-WhM_w8ahmbLh84zcd6tO2-9TF_qB5SBMByUyezJ7L8JxkR-Gz4yNnOUlmbuXEDlkFzH9I_W47kqOpkilHLiaFtVv531ijZQbZKEYEmBHVIgYIIj2K7zPEzzfDO4n1ZnC_6N-cBf-7hEX0Ry-iLAk0VwYTLAqzRCz8aTsRfe8KS6xt-wOeqrg29YC61Bf5NrnmahJUZC26rGNRygnWeTYEF4LqCyQ',
      'X-Requested-With': 'XMLHttpRequest',
      'Origin': `https://main--eloquent-conkies-c146b8.netlify.app/`
    },
    body: JSON.stringify(finalObject)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Respuesta del servidor:', data);
    // Puedes realizar acciones adicionales con la respuesta del servidor si es necesario
  })
  .catch(error => console.error('Error al enviar los datos:', error));
}

function construirObjeto() {
  // Orden deseado de las propiedades
  const order = [
    "customerId",
    "transportLineId",
    "ecoNumber",
    "plates",
    "generatedEvent",
    "generatedEventDate",
    "latitude",
    "longitude",
    "speed",
    "heading",
    "odometer",
    "battery"
  ];

  // Construir el objeto en base al orden deseado
  const finalObject = {};
  order.forEach(key => {
    finalObject[key] = userInput[key] !== undefined ? userInput[key] : apiData[key];
  });

  return finalObject;
}

function formatearFecha(fecha) {
  const fechaFormateada = new Date(fecha);
  const año = fechaFormateada.getFullYear();
  const mes = agregarCero(fechaFormateada.getMonth() + 1);
  const dia = agregarCero(fechaFormateada.getDate());
  const horas = agregarCero(fechaFormateada.getHours());
  const minutos = agregarCero(fechaFormateada.getMinutes());
  const segundos = agregarCero(fechaFormateada.getSeconds());

  // Cambio en el formato de la fecha
  return `${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
}


function agregarCero(valor) {
  return valor < 10 ? `0${valor}` : valor;
}










