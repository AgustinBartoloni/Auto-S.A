// -------------------------------------------------------------------------------------------------------------------
// Variales  ---------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------
import { formatearString } from "../Cliente/SetCliente.js";
const urlVehiculo = 'http://localhost:8080/vehiculo';
const selectBuscarVehiculo = document.getElementById("select-BuscarVehiculo");
const inputVehiculoPatente = document.getElementById("input-VehiculoPatente");
const selectVehiculoMarca = document.getElementById("select-VehiculoMarca");
const selectVehiculoModelo = document.getElementById("select-VehiculoModelo");
const inputVehiculoAño = document.getElementById("input-VehiculoAño");
const inputVehiculoKilometraje = document.getElementById("input-VehiculoKilometraje");
const btnCargarVehiculo = document.getElementById("btn-CargarVehiculo");
const btnVehiculoLimpiar = document.getElementById("btn-VehiculoBorrarDatos");

//----------------------------------------------------------------------------------------------------------------------
// Funciones -----------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", async function(){
    await llenarSelectMarca();
})

// Evento llenar Select Marca -------------------------------------------------

export async function llenarSelectMarca(){
    const response = await fetch("http://localhost:8080/marca/list"); // Realiza una petición fetch
    if (!response.ok) { //Si la peticion tubo un error entonces
        throw new Error("Error en la petición");  //Muestra el mensaje en consola
    }
    const dataMarcas = await response.json(); //Guarda los datos de la peticion en una varible
    selectVehiculoMarca.innerHTML = ""; 
    try {
        const opcionSeleccionarMarca = document.createElement("option");// crea un elemnto option
        opcionSeleccionarMarca.value = ""; // Puedes asignar un valor vacío o un valor especial
        opcionSeleccionarMarca.textContent = "Seleccionar una marca";// Agrega la primera opción "Seleccionar una marca"
        selectVehiculoMarca.appendChild(opcionSeleccionarMarca);

        dataMarcas.forEach((marca) => { // Agrega las nuevas opciones 
            const opcion = document.createElement("option");
            opcion.value = marca.id;
            opcion.textContent = marca.nombre;
            selectVehiculoMarca.appendChild(opcion); //con appendChild() se agrega el elemento al select
        });
    } catch (error) {
        console.error("Error al cargar las marcas: " + error);
    }
};

// Evento llenar Select Modelos -----------------------------------------------

export async function llenarSelectModelo(marcaModelo){
    selectVehiculoModelo.disabled = false;
    try {
        const response = await fetch(`http://localhost:8080/modelo/listByMarca/${marcaModelo}`); // Realiza una petición fetch
        if (!response.ok) { //Si la peticion tubo un error entonces
            throw new Error("Error en la petición");  //Muestra el mensaje en consola
        }
        const dataModelos = await response.json(); //Guarda los datos de la peticion en una varible
        selectVehiculoModelo.innerHTML = "";
        // Agrega la primera opción "Seleccionar una marca"
        const opcionSeleccionarModelo = document.createElement("option");
        opcionSeleccionarModelo.value = ""; // Puedes asignar un valor vacío o un valor especial
        opcionSeleccionarModelo.textContent = "Seleccionar una marca";
        selectVehiculoModelo.appendChild(opcionSeleccionarModelo);

        dataModelos.forEach((modelo) => { // Agrega las nuevas opciones 
            const opcion = document.createElement("option");
            opcion.value = modelo.id;
            opcion.textContent = modelo.nombre;
            selectVehiculoModelo.appendChild(opcion); //con appendChild() se agrega el elemento al select
        });
    } catch (error) {
        console.error("Error al cargar los modelos: " + error);
    }
}
selectVehiculoMarca.addEventListener("change",async function(){
    await llenarSelectModelo(selectVehiculoMarca.value);
})

//Verifica si existe vehiculo 
export async function verificarVehiculo(cliente){
    const patente = inputVehiculoPatente.value;
    const kilometraje = inputVehiculoKilometraje.value;
    const año =  inputVehiculoAño.value;
    const marca = selectVehiculoMarca.value;
    const modelo = selectVehiculoModelo.value;
    const clienteId = cliente;
    if(!patente.trim() || !kilometraje.trim() || !año.trim() || !marca.trim() || !modelo.trim()){
        alert("No debe haber ningun campo vacio");
    }else{  
        try {
            const responseConsulta = await fetch(urlVehiculo+`/listByPatente/${formatearString(patente)}`);
            if (!responseConsulta.ok) {
                throw new Error(`Error al buscar vehiculo: ${responseConsulta.status}`);
            }else{
                const vehiculoConsulta = await responseConsulta.json();
                if (vehiculoConsulta === null) {
                  console.log("El vehiculo no existe");
                  await setVehiculo(patente, año, kilometraje, clienteId, modelo);
                  console.log("Se creo el vehiculo");
                  const responsVehiculoaux = await fetch(urlVehiculo+`/listByPatente/${formatearString(patente)}`);
                  const vehiculoCreado = await responsVehiculoaux.json();
                  return vehiculoCreado.id;
                }else{
                    const vehiculoCargado = vehiculoConsulta;
                    console.log("Vehiculo encontrado con patente " + vehiculoCargado.patente);
                    return vehiculoCargado.id;
                }
            }
        } catch (error) {
         console.error('Error al cargar los Tecnicos:', error);
        }
    }
}

async function setVehiculo(patente, año, kilometraje, clienteId, modelo ){
    const anioActual = new Date().getFullYear();
    if(anioActual < año){
        alert("El año ingresado no es valido")
    }else{
        var nuevoVehiculoData = {
            cliente: {
                id: clienteId
            },
            modelo: {
                id: modelo
            },
            año : año,
            kilometraje : kilometraje,
            patente: formatearString(patente)
        }
        
        await fetch(urlVehiculo + "/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoVehiculoData)
        })
        .then(function (response) {
            if (response.ok) {
                console.log("vehiculo creado con exito");
            } else if(response.status === 400){
                alert("Ya existe un vehiculo con esa patente ");
                console.log("Respuesta de red OK pero respuesta HTTP no OK");
            }
        })
        .catch(error => {
            console.error('Error en la solicitud POST:', error);
        });
    }
}

// Limpiar campos ----------------------------------------------------------------------------------------------------

export function limpiarvehiculo(){
    inputVehiculoPatente.value = "";
    selectVehiculoMarca.value = "";
    selectVehiculoModelo.value = "";
    inputVehiculoAño.value = "";
    inputVehiculoKilometraje.value = "";
    selectBuscarVehiculo.value = "" ;
    //Activa los campos
    inputVehiculoPatente.disabled = false;
    selectVehiculoMarca.disabled = false;
    selectBuscarVehiculo.disabled = true;
    inputVehiculoAño.disabled = false;
    inputVehiculoKilometraje.disabled = false;
}
btnVehiculoLimpiar.addEventListener("click", function(){
    limpiarvehiculo();
})