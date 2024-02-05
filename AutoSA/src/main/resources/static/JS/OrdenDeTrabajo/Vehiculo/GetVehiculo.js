// -------------------------------------------------------------------------------------------------------------------
// Variales  ---------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------
const urlVehiculo = 'http://localhost:8080/vehiculo';
import { llenarSelectModelo } from "./SetVehiculo.js";
const selectBuscarVehiculo = document.getElementById("select-BuscarVehiculo");
const btnCargarVehiculo = document.getElementById("btn-CargarVehiculo");
const inputVehiculoPatente = document.getElementById("input-VehiculoPatente");
const selectVehiculoMarca = document.getElementById("select-VehiculoMarca");
const selectVehiculoModelo = document.getElementById("select-VehiculoModelo");
const inputVehiculoAño = document.getElementById("input-VehiculoAño");
const inputVehiculoKilometraje = document.getElementById("input-VehiculoKilometraje");


// -------------------------------------------------------------------------------------------------------------------
// Funciones ---------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------

// Llenar select vehiculos  ------------------------------------------------------------------------------------------

export async function cargarSelectVehiculo(idCliente){
    console.log("los vehiculos del clinte con id " + idCliente);
    selectBuscarVehiculo.disabled = false;
    selectBuscarVehiculo.value = "";
    try {
        const response = await fetch(urlVehiculo+`/listByClienteId/${idCliente}`);
        if (!response.ok) {
            throw new Error(`Error al cargar los Vehiculos: ${response.status}`);
        }
        const dataVehiculos = await response.json();

            // Agrega la primera opción "Seleccionar una marca"
            selectBuscarVehiculo.innerHTML = ""
            const opcionSeleccionarCliente = document.createElement("option");
            opcionSeleccionarCliente.value = ""; // Puedes asignar un valor vacío o un valor especial
            opcionSeleccionarCliente.textContent = "Seleccione un vehiculo";
            selectBuscarVehiculo.appendChild(opcionSeleccionarCliente);
    
            dataVehiculos.forEach((vehiculo) => { // Agrega las nuevas opciones 
                const opcion = document.createElement("option");
                opcion.value = vehiculo.id;
                opcion.textContent = vehiculo.patente + ", "+ vehiculo.modelo.marca.nombre + ", " +  vehiculo.modelo.nombre;
                opcion.dataset.patente = vehiculo.patente;// Agrega un atributo personalizado para almacenar la patente
                selectBuscarVehiculo.appendChild(opcion); //con appendChild() se agrega el elemento al select
            });
    } catch (error) {
        console.error("Error al cargar los clientes: " + error);
    }
}
// Cargar vehiculo de cliente ----------------------------------------------------------------------------------------
btnCargarVehiculo.addEventListener("click", async function () {
    const selectedOption = selectBuscarVehiculo.options[selectBuscarVehiculo.selectedIndex];

    if (selectedOption) {
        const cargarVehiculoSeleccionado = selectedOption.dataset.patente;
        try {
            const response = await fetch(urlVehiculo + `/listByPatente/${cargarVehiculoSeleccionado}`);
            if (!response.ok) {
                throw new Error(`Error al cargar los Clientes: ${response.status}`);
            }
            const dataVehiculo = await response.json();
            inputVehiculoAño.value = dataVehiculo.año;
            inputVehiculoKilometraje.value = dataVehiculo.kilometraje;
            inputVehiculoPatente.value = dataVehiculo.patente;
            selectVehiculoMarca.value = dataVehiculo.modelo.marca.id;
            await llenarSelectModelo(dataVehiculo.modelo.marca.id); //llena la fucion para que aparesca el modelo
            selectVehiculoModelo.value = dataVehiculo.modelo.id;
            //Desabilita los inputs y selects
            selectVehiculoMarca.disabled = true;
            selectVehiculoModelo.disabled = true;
            inputVehiculoAño.disabled = true;
            inputVehiculoPatente.disabled = true;


        } catch (error) {
            console.error('Error al cargar los Tecnicos:', error);
        }
    }
})