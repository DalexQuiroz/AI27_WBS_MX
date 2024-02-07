
const leftList = document.getElementById("leftList");
const rightList = document.getElementById("rightList");
const rightArrow = document.querySelector(".arrow.right");
const leftArrow = document.querySelector(".arrow.left");
var botonMostrarCampos = document.getElementById("botonMostrarCampos");
var llenaUnidadesDiv = document.getElementById("llenaUnidades");
  // Agrega un event listener al botón
  botonMostrarCampos.addEventListener("click", function (event) {
    // Prevenir que el formulario se envíe y la página se recargue
    event.preventDefault();

    // Obtén referencias a los campos que deben estar llenos
    let apiKey = document.getElementById("apiKey").value;
    let secretKey = document.getElementById("secretKey").value;
    let customerId = document.getElementById("customerId").value;
    let transportLineId = document.getElementById("transportLineId").value;
    let generatedEvent = document.getElementById("generatedEvent").value;

    // Verifica si los campos están llenos
    if (apiKey && secretKey && customerId && transportLineId && generatedEvent) {
        // Los campos están llenos, deja el div llenaUnidades visible
        llenaUnidadesDiv.style.display = "block";
        // Llama a getData() para obtener datos después de que los campos estén llenos
        getData();
       // Obtiene el token al cargar la página
getToken()
.then((token) => {
if (token) {
  // Almacena el token en la variable
  accessToken = token;

  // Puedes utilizar accessToken en otras partes de tu código
  console.log("Token obtenido:", accessToken);

  // Programa la renovación automática cada 0 minutos (3000000 milisegundos)
  setInterval(getToken, 2400000);

  // Informa al usuario que la renovación automática está en marcha
  console.log("Renovación automática programada cada 50 minutos.");
} else {
  // Maneja el caso en el que getToken devuelva null
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
  toastr["error"](respuestaServidor, 'Client o Secret ID inválidos').css("width", "400px", 'text-align:center');
}
})
.catch((error) => {
// Maneja cualquier error que ocurra durante la obtención y uso del token
console.log("Error al obtener y usar el token:", error);
});

    } else {
        // Algunos campos no están llenos, oculta el div llenaUnidades
        llenaUnidadesDiv.style.display = "none";
        // Puedes mostrar un mensaje o tomar otra acción según tus necesidades.
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
        toastr["warning"](respuestaServidor, 'Complete todos los campos').css("width", "400px", 'text-align:center');
    }
});


const arregloObjetosActualizados = []; 

const guardarBoton = document.getElementById("guardar");

let selectedValue;
let selectedVehicleIds = [];
let allMovedObjects = {};
let allPositions = [];

let pdfGenerated = false;
let estatusEnvio;
let respuestaServidor;
function moveSelectedElements(sourceList, destinationList) {
  const selectedElements = sourceList.querySelectorAll(".selected");

  if (selectedElements.length > 0) {
    selectedElements.forEach((selectedElement) => {
      const elementoObjeto = {
        plates: selectedElement.dataset.placa,
        ecoNumber: selectedElement.dataset.veiculo,
        id: selectedElement.dataset.id,
      };

      // Inicializar allMovedObjects[id] si no existe
      if (!allMovedObjects[elementoObjeto.id]) {
        allMovedObjects[elementoObjeto.id] = {};
      }

      // Agregar datos al objeto allMovedObjects
      allMovedObjects[elementoObjeto.id].plates = elementoObjeto.plates;
      allMovedObjects[elementoObjeto.id].ecoNumber = elementoObjeto.ecoNumber;

      destinationList.appendChild(selectedElement);
      selectedElement.classList.remove("selected");

      const index = selectedVehicleIds.indexOf(elementoObjeto.id);
      if (index !== -1) {
        selectedVehicleIds.splice(index, 1);
      } else {
        selectedVehicleIds.push(elementoObjeto.id);
      }
    });

    // Obtener los IDs de los elementos movidos
    selectedVehicleIds.forEach((id)=> {
      // Realizar una nueva consulta fetch por cada ID y actualizar el objeto allMovedObjects
      updateDataById(id)
;
    });
  }
}

rightArrow.addEventListener("click", function () {
  moveSelectedElements(leftList, rightList);
});


leftArrow.addEventListener("click", function () {
  moveSelectedElements(rightList, leftList);
});

leftList.addEventListener("click", function (event) {
  if (event.target.tagName === "INPUT" && event.target.type === "checkbox") {
    const listItem = event.target.parentNode;
    listItem.classList.toggle("selected");
  }
});

rightList.addEventListener("click", function (event) {
  if (event.target.tagName === "INPUT" && event.target.type === "checkbox") {
    const listItem = event.target.parentNode;
    listItem.classList.toggle("selected");
  }
});
guardarBoton.addEventListener("click", function () {
 
  // Luego de agregar elementos al arreglo, puedes realizar cualquier otra acción necesaria.
  console.log("Arreglo actualizado:", arregloObjetosActualizados);
});
async function updateDataById(id)


{
  try {
      const response = await fetch(
          `https://ws.fulltrack2.com/events/single/id/${id}/apiKey/2de1558ef0b75457df254383eecbf0400b1362b7/secretKey/6ef96e3ad7d2e6e3293426c6f11bbb8e3ac493aa`
      );

      if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      const responseData = await response.json();

      if (responseData.data && responseData.data.length > 0) {  
          const updatedData = responseData.data[0];
          
          // Suponiendo que updatedData.ras_eve_data_enviado contiene la fecha en el formato "14/02/2019 23:19:30"
          const fechaOriginal = updatedData.ras_eve_data_enviado;
          const partesFecha = fechaOriginal.split(/[\s/:-]+/);

          // Crear un objeto Date con las partes de la fecha
          const fechaFormateada = new Date(
              `${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}T${partesFecha[3]}:${partesFecha[4]}:${partesFecha[5]}`
          );

          // Sumar 6 horas al tiempo original para ajustar la zona horaria
          const fechaAjustada = new Date(fechaFormateada.getTime() + -12 * 60 * 60 * 1000);

          // Obtener la fecha formateada en formato deseado (en tu zona horaria local)
          const fechaFinalEnTuZona = fechaAjustada.toISOString().slice(0, 19).replace("T", " ");

          // Buscar si ya existe un objeto con la misma placa en el arreglo arregloObjetosActualizados
          const existingObjectIndex = arregloObjetosActualizados.findIndex(obj => obj.plates === updatedData.ras_vei_placa);

          if (existingObjectIndex !== -1) {
              // Si el objeto ya existe, actualiza sus propiedades
              const existingObject = arregloObjetosActualizados[existingObjectIndex];
              existingObject.generatedEventDate = fechaFinalEnTuZona;
              // Actualiza otras propiedades según sea necesario...
              console.log("Objeto existente actualizado:", existingObject);
          } else {
              // Si no existe, crea un nuevo objeto y agrégalo al arreglo
              const newObject = {
                  plates: updatedData.ras_vei_placa,
                  customerId: 333,             // Agregar parámetros fijos predeterminados
                  transportLineId: 15522,
                  generatedEvent: "1",
                  latitude: parseFloat(updatedData.ras_eve_latitude),  // Agregar datos actualizados
                  longitude: parseFloat(updatedData.ras_eve_longitude),
                  odometer: parseInt(updatedData.ras_eve_hodometro),
                  speed: parseInt(updatedData.ras_eve_velocidade),
                  battery: parseFloat(updatedData.ras_eve_voltagem),
                  ecoNumber: updatedData.ras_vei_veiculo,
                  generatedEventDate: fechaFinalEnTuZona
              };

              arregloObjetosActualizados.push(newObject);
              console.log("Nuevo objeto agregado:", newObject);


              const enviarBoton = document.getElementById("enviar");

enviarBoton.addEventListener("click", function () {
  enviarDatos();
  setInterval(enviarDatos, 240000);
});

let alertaMostrada=false;
function enviarDatos() {
  if (arregloObjetosActualizados.length > 0) {
    // Contenido de tu función enviarDatos
    
    const customerId = parseInt(document.getElementById("customerId").value);
    const transportLineId = parseInt(document.getElementById("transportLineId").value);
    const generatedEvent = document.getElementById("generatedEvent").value;

    // Contenido de tu función enviarDatos
    allPositions.push(...arregloObjetosActualizados);
    arregloObjetosActualizados.forEach((position) => {
        // Asignar los valores de los campos de entrada al objeto newObject
        position.customerId = customerId;
        position.transportLineId = transportLineId;
        position.generatedEvent = generatedEvent;
    });
    fetch(
      "https://cors-anywhere.herokuapp.com/https://api.ai27appsservices.com/AI27WebApi",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          Origin: `https://main--eloquent-conkies-c146b8.netlify.app/`,
        },
        body: JSON.stringify(arregloObjetosActualizados),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta del servidor:", data);
        respuestaServidor = data.message;
        estatusEnvio = data.statusCode;
        if (!alertaMostrada) {
            // Mostrar la alerta
            mostrarAlerta();
            // Actualizar el indicador para que no se muestre la alerta nuevamente
            alertaMostrada = true;
        }
        // Restablecer el flag para permitir la generación de otro PDF
        pdfGenerated = false;

        //imprimir el PDF
        const getPDFButton = document.getElementById("getPDF"); 
        getPDFButton.addEventListener("click", function () {
            if (!pdfGenerated) {
                generarPDF(data);
                pdfGenerated = true;
            }
        });
    })
    .catch((error) => {
        console.error("Error al enviar datos:", error);
    });
} else {
console.log("No hay datos para enviar.");
}

  // Vaciar el arreglo después del envío o después de verificar que no hay datos
  arregloObjetosActualizados.length = 0;
}
function mostrarAlerta() {
  // Aquí colocas el código para mostrar la alerta, por ejemplo:
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
  toastr["success"](respuestaServidor).css("width", "400px",'text-align:center');
}


function generarPDF(servidorRespuesta) {
if (allPositions.length > 0) {
    const pdf = new jsPDF();

    pdf.text("Historial de Posiciones", 20, 10);      

    const tableData = allPositions.map((position, index) => [
        `Posición ${index + 1}`,
        position.generatedEventDate,
        position.plates,
        position.ecoNumber,
        // Agrega más campos según sea necesario
    ]);

    // Agregar la fila de respuesta del servidor a tableData al PDF
    tableData.push([
        "Respuesta del Servidor",
        servidorRespuesta.message, // Reemplaza someProperty con la propiedad real de la respuesta que deseas mostrar
        "StatusCode", servidorRespuesta.statusCode,
       
        // Agrega más propiedades según sea necesario
    ]);

    const tableColumns = ["Posición", "Fecha", "Placas", "Eco Number"];

    pdf.autoTable({
        head: [tableColumns],
        body: tableData,
        startY: 40, // Ajusta la posición de inicio para evitar superposición con la sección de respuesta del servidor
    });

    pdf.save("historial_posiciones.pdf");
} else {
    console.log("No hay posiciones para generar el PDF.");
}
}
          }
      } else {
          console.warn("No se encontraron datos actualizados para el ID:", id);
      }
  } catch (error) {
      console.error("Hubo un error al obtener los datos actualizados:", error);
  }
 
}

// Configurar un intervalo para ejecutar updateDataById cada 3 minutos y 50 segundos (en milisegundos)
setInterval(() => {
selectedVehicleIds.forEach((id)=> {
  updateDataById(id)
;
});
}, 230000); // 3 minutos y 50 segundos en milisegundos
async function getData() {
  try {
    const apiKey = document.getElementById("apiKey").value;
    const secretKey = document.getElementById("secretKey").value;
    console.log("apiKey:", apiKey);
    console.log("secretKey:", secretKey);
    const response = await fetch(
        `https://ws.fulltrack2.com/clients/all/apiKey/${apiKey}/secretKey/${secretKey}`
    );

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const data = await response.json();

    const select = document.getElementById("selectClientes");
    select.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Seleccionar";
    select.appendChild(defaultOption);

    for (let i = 0; i < data.data.length; i++) {
      const element = data.data[i];
      const option = document.createElement("option");
      option.value = element.ras_cli_desc;
      option.textContent = element.ras_cli_desc;
      option.dataset.ras_cli_id = element.ras_cli_id;
      select.appendChild(option);
    }

    select.selectedIndex = 0;

    select.addEventListener("change", function () {
      selectedValue = select.options[select.selectedIndex].dataset.ras_cli_id;
      getVehicle();
    });

    getVehicle();
  } catch (error) {
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
  
  }
}

async function getVehicle() {
  try {
    if (selectedValue) {
      const apiKey = document.getElementById("apiKey").value;
      const secretKey = document.getElementById("secretKey").value;
      const response = await fetch(
        `https://ws.fulltrack2.com/vehicles/client/id/${selectedValue}/apiKey/${apiKey}/secretKey/${secretKey}`
      );

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      const responseData = await response.json();

      if (responseData.data && Array.isArray(responseData.data)) {
        leftList.innerHTML = "";

        responseData.data.forEach((vehicle) => {
          const li = document.createElement("li");
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          li.appendChild(checkbox);

          li.dataset.placa = vehicle.ras_vei_placa;
          li.dataset.veiculo = vehicle.ras_vei_veiculo;
          li.dataset.id = vehicle.ras_vei_id;

          li.appendChild(
            document.createTextNode(
              `  ${vehicle.ras_vei_placa} ${vehicle.ras_vei_veiculo} ${vehicle.ras_vei_id}`
            )
          );
          li.classList.add("vehiculos");
          leftList.appendChild(li);
        });
      } else {
        console.warn(
          "No se encontró la propiedad data en la respuesta o no es una lista."
        );
      }
    } else {
      console.warn("No se ha seleccionado ningún valor en el select.");
    }
  } catch (error) {
    console.error("Hubo un error al obtener los datos:", error);
  }
}

function getToken() {
let clientId = document.getElementById('client_id').value;
let clientSecret = document.getElementById('client_secret').value;
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("client_id", clientId);
urlencoded.append("scope", "wsauthidentifier/ws.scope");
urlencoded.append("client_secret", clientSecret);
urlencoded.append("grant_type", "client_credentials");

var requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: urlencoded,
  redirect: "follow",
};

return fetch("https://auth.ai27appsservices.com/oauth2/token", requestOptions)
  .then((response) => response.json())
  .then((data) => {
    return data.access_token;
  })
  .catch((error) => {
    console.log("Error:", error);
    return null;
  });
}
