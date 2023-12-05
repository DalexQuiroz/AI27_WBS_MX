let datos = {}; // Declarar datos fuera de las funciones
/*const datos2 = {
  customerId: 333,
  transportLineId: 15522,
  ecoNumber: "ECO4528",
  plates: "ABC-123",
  generatedEvent: "1",
  generatedEventDate: "2023-11-01 12:24:15",
  latitude: 99.02312542,
  longitude: 0.9956325,
  speed: 85,
  heading: 259.36225,
  odometer: 652300,
  battery: 12.5
};*/

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
const token='eyJraWQiOiJUdjhreEsycTZJMWhra0ZWUk90eTFvNXZJdmZndEt1TU9UdU01MWh3YWdRPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI0Y3ZrdG50Njdrbm41NTh2aWpjbW1zdXQ2dSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoid3NhdXRoaWRlbnRpZmllclwvd3Muc2NvcGUiLCJhdXRoX3RpbWUiOjE3MDE4MDQ0NDcsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX210RUhESk9uaSIsImV4cCI6MTcwMTgwODA0NywiaWF0IjoxNzAxODA0NDQ3LCJ2ZXJzaW9uIjoyLCJqdGkiOiJkODgxNDU5OC0xY2UwLTQ3YTItYjE0OS1mZjVjY2QyMmI4M2QiLCJjbGllbnRfaWQiOiI0Y3ZrdG50Njdrbm41NTh2aWpjbW1zdXQ2dSJ9.nAnwbXHEKe76s7upSWTQrkH_7OinPUBZNfBjQKAe9WXx4tL9Hxhpvswfe7iHEgvRH7qgXiarqpOis7mjgnePPWRG19uit3RCiifqMMtm7hYJld2iL5tfyHZHXnSi1vd-uT_Y9209N1McNSK2aS_KiyWlVjr5TKyFQxDyQD-_pLHU8OMN2-Gv0xKVaxJt4uT7fD6aBQeRzuYXWR1m3CVPX_bhvWyJW_SkPffeDeu5PiQBTiHYF1PMZsltqRGl1n194gTY8kDoO1lJl-7pXQqiISVOIJm_x2AwxmmapAD0FTwCLVT25tbEZI4aowTTt2BKMlsQDGSCJI6wTI2zeTuZ5A'
function enviarDataAI27() {
  const urlAI27 = 'https://api.ai27appsservices.com/AI27WebApi';// Reemplaza con la URL correcta
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
    };

  const opciones = {
    method: 'POST',
    headers: headers,
    cors : 'no-cors',
    body: JSON.stringify(datos) // Utiliza los datos recopilados
  };

  fetch(urlAI27, opciones)
    .then(respuesta => respuesta.json())
    .then(respuesta => {
      console.log('Respuesta del servidor AI27:', respuesta);
    })
    .catch(error => {
      console.error('Error al enviar la solicitud a AI27:', error);
    });
}




