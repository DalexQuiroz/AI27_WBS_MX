let datos = {}; // Declarar datos fuera de las funciones
let datos2 = {
  customerId: 333,
  transportLineId: 15522,
  ecoNumber: "SPARKK-DPRUEBAABB",
  plates: "B83-AGZ-TE",
  generatedEvent: "1",
  generatedEventDate: "2023-07-12 18:52:35",
  latitude: 19.540483,
  longitude:-99.207534,
  speed: 0,
  heading: 259.36225,
  odometer: 652300,
  battery: 12.809
};

// Llamada a traer cuando se presiona el primer botón
document.getElementById('traer').addEventListener('click', traer);
function traer() {
  let informacionInput = document.getElementById('ingresar_id').value;
  let valorNumerico = parseInt(informacionInput, 10);

  fetch(`https://ws.fulltrack2.com/events/single/id/${valorNumerico}/apiKey/2de1558ef0b75457df254383eecbf0400b1362b7/secretKey/6ef96e3ad7d2e6e3293426c6f11bbb8e3ac493aa`)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      for (let i = 0; i < res.data.length; i++) {
        const element = res.data[i];
        document.getElementById('ecoNumber').value = element.ras_vei_veiculo;
        document.getElementById('plates').value = element.ras_vei_placa;
        document.getElementById('generatedEventDate').value = element.ras_eve_data_enviado;
        document.getElementById('latitude').value = element.ras_eve_latitude;
        document.getElementById('longitude').value = element.ras_eve_longitude;
        document.getElementById('speed').value = element.ras_eve_velocidade;
        document.getElementById('odometer').value = element.ras_eve_hodometro;
        document.getElementById('battery').value = element.ras_eve_voltagem;
      }

      // Almacena los datos en la variable
      const customerId = document.getElementById('customerId').value;
      const transportLineId = document.getElementById('transportLineId').value;
      const ecoNumber = document.getElementById('ecoNumber').value;
      const plates = document.getElementById('plates').value;
      const generatedEvent = document.getElementById('generatedEvent').value;
      const generatedEventDate = document.getElementById('generatedEventDate').value;
      const latitude = document.getElementById('latitude').value;
      const longitude = document.getElementById('longitude').value;
      const speed = document.getElementById('speed').value;
      const odometer = document.getElementById('odometer').value;
      const battery = document.getElementById('battery').value;

      // Datos por el usuario
  

      // Actualiza la variable datos con la información recopilada
      datos = {
        customerId: customerId,
        transportLineId: transportLineId,
        ecoNumber: ecoNumber,
        plates: plates,
        generatedEvent: generatedEvent,
        generatedEventDate: generatedEventDate,
        latitude: latitude,
        longitude: longitude,
        speed: speed,
        odometer: odometer,
        battery: battery
      };

      console.log(datos);
    })

}


// Llamada a enviarDataAI27 cuando se presiona el segundo botón
document.getElementById('Enviar').addEventListener('click', enviarDataAI27);
function enviarDataAI27() {
  const token = 'eyJraWQiOiJUdjhreEsycTZJMWhra0ZWUk90eTFvNXZJdmZndEt1TU9UdU01MWh3YWdRPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI0Y3ZrdG50Njdrbm41NTh2aWpjbW1zdXQ2dSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoid3NhdXRoaWRlbnRpZmllclwvd3Muc2NvcGUiLCJhdXRoX3RpbWUiOjE3MDIwNTE4MDgsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX210RUhESk9uaSIsImV4cCI6MTcwMjA1NTQwOCwiaWF0IjoxNzAyMDUxODA4LCJ2ZXJzaW9uIjoyLCJqdGkiOiJjMTk3YmM3ZC1iNDY5LTQ2ZmYtOTZmYS1jMDRhOTM1NGY5NDAiLCJjbGllbnRfaWQiOiI0Y3ZrdG50Njdrbm41NTh2aWpjbW1zdXQ2dSJ9.A_yW-RpJneefH5Cu1GyWXnye2rVSLO3ducGcv-BS_SMHAjDTaEvr4iHQhA1Brc2RqKXedpoWX3OrYVyqWiPF7GB9Q2ISU3b9pmnxa7YIw35zf94s4N6eVeOcJ9QnBSnaFvIWExqSTkk6ceJPGIDWrIyfzU4KLi2RgHWIRCTLP1nYiNkcktZCE9MZrWuQYbmXuxOXrWFO6b_v3d8UciIozQB79GAj1OCGHZPmLjbWzeP0UG1Cc61-iXgQ1ZGUiJzpcVU3o-4QRcd97CYWqznsws8gJS4CG7nJUJcN83TmNSmXQ_NAQ7gKcO8bf9Yx8gT4qF_D-Ur46Zh4M-YGEpn3ZQ';
  const urlAI27 = 'https://cors-anywhere.herokuapp.com/https://api.ai27appsservices.com/AI27WebApi'; // Reemplaza con la URL correcta
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'X-Requested-With': 'XMLHttpRequest',
    'Origin': `https://main--eloquent-conkies-c146b8.netlify.app/` // Reemplaza con la URL real de tu formulario HTML
  };

  // Suponiendo que tienes algún objeto datos definido antes de la llamada
  const opciones = {
    method: 'POST',
    headers: headers,
    mode: 'cors',
    body: JSON.stringify(datos2) // Utiliza los datos recopilados
  };

  fetch(urlAI27, opciones)
    .then(respuesta => {
      if (!respuesta.ok) {
        throw new Error(`HTTP error! status: ${respuesta.status}`);
      }
      return respuesta.json();
    })
    .then(respuesta => {
      console.log('Respuesta del servidor AI27:', respuesta);
    })
    .catch(error => {
      console.log('Error al enviar la solicitud a AI27:', error);
    });
}
function limpiarFormulario(){
  document.getElementById('form').reset()
}