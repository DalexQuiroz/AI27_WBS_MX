function traer(){
     let informacionInput= document.getElementById('ingresar_id').value;
     let valorNumerico = parseInt(informacionInput, 10);

    fetch(`https://ws.fulltrack2.com/events/single/id/${valorNumerico}/apiKey/2de1558ef0b75457df254383eecbf0400b1362b7/secretKey/6ef96e3ad7d2e6e3293426c6f11bbb8e3ac493aa`)
    .then(res => res.json())
    .then(res =>{
        console.log(res)
      for (let i = 0; i < res.data.length; i++) {
        const element = res.data[i];
        document.getElementById('id_vehiculo').value= element.ras_ras_id_aparelho;
        document.getElementById('placas').value=element.ras_vei_placa;
        document.getElementById('economico').value=element.ras_vei_veiculo;   
        document.getElementById('fecha_evento').value=element.ras_eve_data_enviado;
        document.getElementById('nombre_conductor').value=element.ras_mot_nome;
        document.getElementById('latitud_evento').value=element.ras_eve_latitude;
        document.getElementById('longitud_evento').value=element.ras_eve_longitude;
      }
    
  });
}

function limpiarFormulario(){
  let formulario = document.getElementById('form');
  for (var i = 0; i < formulario.elements.length; i++) {
    if (formulario.elements[i].type === "text" || formulario.elements[i].type === "email" || formulario.elements[i].type==="number" || formulario.elements[i].type==="password" || formulario.elements[i].type==="option") {
        formulario.elements[i].value = "";
    }
    document.getElementById('ingresar_id').value=""
    document.getElementById('tipo_evento_select').value=""
    document.getElementById('tipo_unidad_select').value=""
    document.getElementById('tipo_remolque_select').value=""
    document.getElementById('tipo_carga_select').value=""
}
}