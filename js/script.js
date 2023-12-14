var accessToken; // Variable para almacenar el token

function getTokenAndScheduleRenewal() {
  var client_id = document.getElementById("client_id").value;
  var client_secret = document.getElementById("client_secret").value;

  // Ejecuta la función solo cuando ambos campos estén llenos
  if (client_id && client_secret) {
    getToken()
      .then(token => {
        // Almacena el token en la variable
        accessToken = token;

        // Puedes utilizar accessToken en otras partes de tu código

        console.log("Token obtenido:", accessToken);

        // Programa la renovación automática cada 50 minutos (3000000 milisegundos)
        setInterval(getToken, 3000000);

        // Informa al usuario que la renovación automática está en marcha
        console.log("Renovación automática programada cada 50 minutos.");
      })
      .catch(error => {
        console.log('Error al obtener el token:', error);
      });
  }
}

function getToken() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Cookie", "XSRF-TOKEN=e1cc60b8-8b02-4314-8208-ee6754119f9d");

  var client_id = document.getElementById("client_id").value;
  var client_secret = document.getElementById("client_secret").value;

  var urlencoded = new URLSearchParams();
  urlencoded.append("client_id", client_id);
  urlencoded.append("scope", "wsauthidentifier/ws.scope");
  urlencoded.append("client_secret", client_secret);
  urlencoded.append("grant_type", "client_credentials");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };

  return fetch("https://auth.ai27appsservices.com/oauth2/token", requestOptions)
    .then(response => {
      if (!response.ok) {
        // Si el estado de la respuesta no es exitoso (200 OK),
        // lanza un error para que sea manejado en el bloque catch
        throw new Error('Error en la solicitud del token: ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "progressBar": true,
        "newestOnTop": true,
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "3000",
        "timeOut": "7000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      };
      toastr["success"]("Token obtenido correctamente");
      return data.access_token;
    })
    .catch(error => {
      toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "progressBar": true,
        "newestOnTop": true,
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "3000",
        "timeOut": "7000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      };
      toastr["error"]("Client id o Client secret inválido");
      return null;
    });
}

// Llama a getTokenAndScheduleRenewal() cuando ambos campos estén llenos

document.getElementById("client_secret").addEventListener("input", getTokenAndScheduleRenewal);


// Obtiene el botón y los campos adicionales
var botonMostrarCampos = document.getElementById("botonMostrarCampos");
var camposAdicionales = document.querySelectorAll(".campoAdicional");
var apiKeyInput = document.getElementById("apiKey");
var secretKeyInput = document.getElementById("secretKey");
var custom = document.getElementById('customerId');
var transporte = document.getElementById('transportLineId');
var generaE = document.getElementById('generatedEvent');
let apiKey_ingresada;
let secretKey_ingresada;
let estatusEnvio;
let respuestaServidor;
// Oculta los campos adicionales
camposAdicionales.forEach(function (campo) {
  campo.style.display = "none";
  campo.classList.add("campo");
});

// Agrega un evento de clic al botón
botonMostrarCampos.addEventListener("click", function () {
  // Muestra los campos adicionales al hacer clic en el botón
  if (apiKeyInput.value.trim() !== "" && secretKeyInput.value.trim() !== "" && custom.value !== "" && transporte.value !== "" && generaE.value !== "") {
    // Muestra los campos adicionales al hacer clic en el botón
    camposAdicionales.forEach(function (campo) {
      campo.style.display = "flex";
      apiKey = document.getElementById('apiKey').value;
      secretKey = document.getElementById('secretKey').value;
    });



  } else {

    toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-top-right",
      "progressBar": true,
      "newestOnTop": true,
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "3000",
      "timeOut": "7000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    };
    toastr["warning"]("Por favor complete todos los campos", "Campos incompletos");
    // Ejemplo de uso después de una solicitud exitosa

  }


});



let userInput = {};
let apiData = {};
document.getElementById('Enviar').addEventListener('click', function (event) {
  // Evita el comportamiento predeterminado del formulario
  event.preventDefault();

  // Llama a la función para enviar los datos o realiza otras acciones necesarias
  enviarDatos();
});

document.getElementById('traer').addEventListener('click', traer);
// document.getElementById('Enviar').addEventListener('click', enviarDatos);

function traer() {
  setInterval(traer, 235000);
  let informacionInput = document.getElementById('ingresar_id').value;
  let valorNumerico = parseInt(informacionInput, 10);
  apiKey_ingresada = document.getElementById('apiKey').value;
  secretKey_ingresada = document.getElementById('secretKey').value;

  fetch(`https://ws.fulltrack2.com/events/single/id/${valorNumerico}/apiKey/${apiKey_ingresada}/secretKey/${secretKey_ingresada}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`API o SECRET KEY incorrecta ${response.statusText}`);

      }
      return response.json();
    })

    .then(res => {
      console.log(res);
      if (res.data.length > 0) {
        const element = res.data[0];
        document.getElementById('ecoNumber').value = element.ras_vei_veiculo;
        document.getElementById('plates').value = element.ras_vei_placa;
        document.getElementById('generatedEventDate').value = element.ras_eve_data_enviado;
        document.getElementById('latitude').value = element.ras_eve_latitude;
        document.getElementById('longitude').value = element.ras_eve_longitude;
        document.getElementById('speed').value = element.ras_eve_velocidade;
        document.getElementById('odometer').value = element.ras_eve_hodometro;
        document.getElementById('battery').value = element.ras_eve_voltagem;

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
    })
    .catch(error => {
      // Mostrar el mensaje de error como una alerta
      toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "progressBar": true,
        "newestOnTop": true,
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "3000",
        "timeOut": "7000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      };
      toastr["error"](error.message, "Claves inválidas");
    });
}

function enviarDatos() {
  setInterval(traer, 240000);
  // Obtener el objeto final
  const finalObject = construirObjeto();

  // Crear una solicitud POST con el objeto como cuerpo
  fetch('https://cors-anywhere.herokuapp.com/https://api.ai27appsservices.com/AI27WebApi', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
      'Origin': `https://main--eloquent-conkies-c146b8.netlify.app/`
    },
    body: JSON.stringify(finalObject)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Respuesta del servidor:', data);
      // Puedes realizar acciones adicionales con la respuesta del servidor si es necesario
      respuestaServidor = data.message;
      estatusEnvio = data.statusCode;
      if (estatusEnvio === 200) {
        toastr.options = {
          "closeButton": true,
          "debug": false,
          "newestOnTop": false,
          "progressBar": false,
          "positionClass": "toast-top-right",
          "progressBar": true,
          "newestOnTop": true,
          "preventDuplicates": false,
          "onclick": null,
          "showDuration": "300",
          "hideDuration": "3000",
          "timeOut": "7000",
          "extendedTimeOut": "1000",
          "showEasing": "swing",
          "hideEasing": "linear",
          "showMethod": "fadeIn",
          "hideMethod": "fadeOut"
        };
        toastr["success"](respuestaServidor, "Envío exitoso");
      }
      else {
        toastr.options = {
          "closeButton": true,
          "debug": false,
          "newestOnTop": false,
          "progressBar": false,
          "positionClass": "toast-top-right",
          "progressBar": true,
          "newestOnTop": true,
          "preventDuplicates": false,
          "onclick": null,
          "showDuration": "300",
          "hideDuration": "3000",
          "timeOut": "7000",
          "extendedTimeOut": "1000",
          "showEasing": "swing",
          "hideEasing": "linear",
          "showMethod": "fadeIn",
          "hideMethod": "fadeOut"
        };
        toastr["error"](respuestaServidor, "Error en el envío");
      }
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

function limpiarFormulario() {
  document.getElementById("form").reset();
}
const botonGenerarPDF = document.getElementById('obtenerPDF');
botonGenerarPDF.addEventListener('click', function (event) {
  // Evitar el comportamiento predeterminado del evento (evitar la recarga de la página)
  event.preventDefault();

  // Llamar a la función para generar el PDF
  getPDF();
});
function getPDF() {

  const informacionInput = document.getElementById('ingresar_id').value;
  // Crear un nuevo objeto jsPDF
  const pdf = new jsPDF();

  // Agregar el encabezado centrado


  // Restablecer el estilo para el contenido principal (si es necesario)
  pdf.setFont('times');
  pdf.setFontSize(12);
  const options = {
    theme: 'grid', // Puedes cambiar el tema según tus preferencias
    headStyles: { fillColor: [150, 0, 0] },
    margin: { top: 60 }
  };
  // Crear la tabla y agregar datos
  pdf.autoTable({
    head: [['Customer id', 'Línea de transporte', 'Evento generado', 'Respuesta del servidor', 'Estatus']],
    body: [
      [userInput.customerId, userInput.transportLineId, userInput.generatedEvent, respuestaServidor, estatusEnvio],
    ],
    options
  });
  const espacioEntreTablas = 70;
  pdf.autoTable({
    head: [['Unidad', 'Placas', 'Fecha del evento', 'Latitud', 'Longitud', 'Velocidad', 'Odómetro', 'Batería']],
    body: [
      [apiData.ecoNumber, apiData.plates, apiData.generatedEventDate, apiData.latitude, apiData.longitude, apiData.speed, apiData.odometer, apiData.battery],
    ],
    options: { ...options, startY: pdf.autoTable.previous.finalY + espacioEntreTablas }
  });
  // Guardar o mostrar el PDF
  pdf.save('Ultimo evento.pdf');
}











