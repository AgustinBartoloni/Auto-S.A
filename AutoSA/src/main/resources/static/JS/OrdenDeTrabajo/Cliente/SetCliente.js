// -------------------------------------------------------------------------------------------------------------------
// Variables ---------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------
export const urlCliente = 'http://localhost:8080/cliente';
// Campos ---------------------------------------------------------------------------------------------------------
export const inputClienteDni = document.getElementById("input-ClienteDni");
export const inputClienteNombre = document.getElementById("input-ClienteNombre");
export const inputClienteApellido = document.getElementById("input-ClienteApellido");
export const inputClienteTel = document.getElementById("input-ClienteTel");
export const inputClienteEmail = document.getElementById("input-ClienteEmail");
export const inputClienteDomicilio = document.getElementById("input-ClienteDomicilio");


// -------------------------------------------------------------------------------------------------------------------
// Da formto al string -----------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------

export function formatearString(textoEntrada) {

    const palabras = textoEntrada.split(" "); // Divide el string en palabras
    let resultado = ""; // Inicializa una cadena para almacenar el resultado formateado
  
    // Recorre cada palabra y forma el resultado
    for (const palabra of palabras) {
      if (palabra) { // Verifica si la palabra no está en blanco
        const palabraFormateada = palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase(); // Convierte la primera letra en mayúscula y el resto en minúscula
        resultado += palabraFormateada + " ";
      }
    }
  
    return resultado.trim(); // Elimina el espacio en blanco adicional al final y retorna el resultado formateado
}

// -------------------------------------------------------------------------------------------------------------------
//  Funcion Setear clientes ------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------
//  Crear clientes ------------------------------------------------------------------------------------------
async function setCliente(nombre, apellido, dni, telefono, email, domicilio){
    var nuevoClienteData = {
        nombre: formatearString(nombre),
        apellido : formatearString(apellido),
        dni : dni,
        telefono : telefono,
        email : email,
        domicilio : formatearString(domicilio)
    }
    
    await fetch(urlCliente + "/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoClienteData)
    })
}
//  Verifica clientes ------------------------------------------------------------------------------------------
export async function verificarCliente(){
    const nombre = inputClienteNombre.value;
    const apellido = inputClienteApellido.value;
    const dni =  inputClienteDni.value;
    const telefono = inputClienteTel.value;
    const email = inputClienteEmail.value;
    const domicilio = inputClienteDomicilio.value;
  if(!nombre.trim() || !apellido.trim() || !dni.trim() || !telefono.trim() || !email.trim() || !domicilio.trim()){
      alert("No debe haber ningun campo vacio");
  }else{  
      try {
          const responseConsulta = await fetch(urlCliente+`/listByDni/${dni}`);
          if (!responseConsulta.ok) {
              throw new Error(`Error al cargar los Clientes: ${responseConsulta.status}`);
          }
          const dataClienteConsulta = await responseConsulta.json();
          if (dataClienteConsulta === null) {
              console.log("El cliente no existe"); //Verifica
              await setCliente(nombre, apellido, dni, telefono, email, domicilio);
              console.log("Se creo el cliente"); //Verifica 
              const responsCrearCliente = await fetch(urlCliente+`/listByDni/${dni}`);
              const clienteCreado = await responsCrearCliente.json();
              console.log("cliente encontrado con dni " + clienteCreado.dni+ " e id " + clienteCreado.id); //Verifica
              return clienteCreado.id;
          }else{
              const clienteCargado = dataClienteConsulta;
              console.log("cliente encontrado con dni " + clienteCargado.dni);
              return clienteCargado.id;
          }
      } catch (error) {
          console.error('Error al cargar los clientes:', error);
      }
  }
}