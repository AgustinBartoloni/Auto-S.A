// -------------------------------------------------------------------------------------------------------------------
// Variables ---------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------
import {urlCliente,inputClienteApellido, inputClienteNombre, inputClienteDni, inputClienteDomicilio, inputClienteEmail, inputClienteTel} from "./SetCliente.js";
import { cargarSelectVehiculo } from "../Vehiculo/GetVehiculo.js";
import { limpiarvehiculo} from "../Vehiculo/SetVehiculo.js";
const selectFiltrarCliente = document.getElementById("select-FiltrarCliente");
const inputDatoCliente = document.getElementById("input-ClienteBuscar");
// Botones -------------------------------------------------------------------------------------------------------------
const btnClienteLimpiar = document.getElementById("btn-ClienteLimpiar");
const btnBuscarCliente = document.getElementById("btn-BuscarCliente");
// Tabla -------------------------------------------------------------------------------------------------------------
const tablaCliente = document.getElementById("tablaCliente");
const tbodyCliente = tablaCliente.querySelector('tbody');

// -------------------------------------------------------------------------------------------------------------------
//  Funcion cargar clientes  -----------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------
async function cargarCliente(cliente){
    inputClienteDni.value = cliente.dni;
    inputClienteNombre.value = cliente.nombre;
    inputClienteApellido.value = cliente.apellido;
    inputClienteTel.value = cliente.telefono;
    inputClienteEmail.value = cliente.email;
    inputClienteDomicilio.value = cliente.domicilio;
    //Desabilita los datos
    inputClienteApellido.disabled = true;
    inputClienteDni.disabled = true;
    inputClienteDomicilio.disabled = true;
    inputClienteNombre.disabled = true;
    inputClienteTel.disabled = true;
    inputClienteEmail.disabled = true;
}

// -------------------------------------------------------------------------------------------------------------------
//  Funcion buscar clientes  -----------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------
// Funcion llenar tabal ----------------------------------------------------------------------------------------------

async function llenarTabla(cliente){
    const fila = document.createElement('tr');
    const columnaDni = document.createElement('td');
    const columnaApellido = document.createElement('td');
    const columnaNombre = document.createElement('td');
    const columnaOpciones = document.createElement('td');

    columnaDni.textContent = cliente.dni;
    columnaApellido.textContent = cliente.apellido;
    columnaNombre.textContent = cliente.nombre;

    // Botones de Cargar datos

    const botonCargar = document.createElement('button');
    botonCargar.textContent = 'Cargar';
    botonCargar.type = "button";
    botonCargar.classList= 'btn btn-outline-success';
    botonCargar.style = "margin: 0px 5px;"
    botonCargar.setAttribute("data-bs-target", "#modalCliente");
    botonCargar.setAttribute("data-bs-toggle", "modal");
    botonCargar.addEventListener('click',async function () {
        //idClienteElegido = cliente.id;
        await cargarCliente(cliente);
        await cargarSelectVehiculo(cliente.id);
    });

    columnaOpciones.appendChild(botonCargar);

    fila.appendChild(columnaDni);
    fila.appendChild(columnaNombre);
    fila.appendChild(columnaApellido);
    fila.appendChild(columnaOpciones);

    tbodyCliente.appendChild(fila);
}


async function llenarTablaFor(dataCliente){
    tbodyCliente.innerHTML = '';
    dataCliente.forEach(async data => {
       await llenarTabla(data); 
    });
}

// Funcion buscar todos ----------------------------------------------------------------------------------------------
async function getCliente(){
    const response = await fetch(urlCliente + `/list`);
    if(!response.ok){
        throw new Error(`Error al cargar los Clientes: ${response.status}`);
    }
    const dataCliente = await response.json();
    if(dataCliente === null){
        alert("no se encontro ningun cliente");
    }else{
        await llenarTablaFor(dataCliente);
    }

}

// Funcion buscar por nombre -----------------------------------------------------------------------------------------
async function getClienteXNombre(){
    const response = await fetch(urlCliente + `/listByNombre/${inputDatoCliente.value}`);
    if(!response.ok){
        throw new Error(`Error al cargar los Clientes: ${response.status}`);
    }else{
        const dataCliente = await response.json();
        if(dataCliente === null){
            alert("no se encontro ningun cliente");
        }else{
            await llenarTablaFor(dataCliente);
        }   
    }
}

// Funcion buscar por dni----------------------------------------------------------------------------------------------
async function getClienteXDni(){
    const response = await fetch(urlCliente + `/listByDni/${inputDatoCliente.value}`)
    if(!response.ok){
        throw new Error(`Error al cargar los Clientes: ${response.status}`);
    }else{
        const dataCliente = await response.json();
        if(dataCliente === null){
            alert("no se encontro ningun cliente");
        }else{
            tbodyCliente.innerHTML = '';
            await llenarTabla(dataCliente);
        }
    }
}

// Cambio tipo de busqueda -------------------------------------------------------------------------------------------
selectFiltrarCliente.addEventListener("change", function(){
    if(selectFiltrarCliente.value === "0"){
        inputDatoCliente.disabled = true;
        inputDatoCliente.value = "";
    }else if(selectFiltrarCliente.value === "1"){  
        inputDatoCliente.disabled = false;
        inputDatoCliente.type = "number";
        inputDatoCliente.value = "";
    }else if(selectFiltrarCliente.value === "2"){
        inputDatoCliente.disabled = false;
        inputDatoCliente.type = "text";
        inputDatoCliente.value = "";
    }
})

// Boton de busqueda ------------------------------------------------------------------------------------------------
btnBuscarCliente.addEventListener("click", async function(){
    if(selectFiltrarCliente.value === "0"){
        await getCliente();
    }else if(selectFiltrarCliente.value === "1"){  
        await getClienteXDni();
    }else{
        await getClienteXNombre();
    }
})

// -------------------------------------------------------------------------------------------------------------------
//  Funcion Limpiar clientes  ----------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------

btnClienteLimpiar.addEventListener("click", function(){
    inputClienteApellido.value = "";
    inputClienteDni.value = "";
    inputClienteDomicilio.value = "";
    inputClienteEmail.value = "";
    inputClienteNombre.value = "";
    inputClienteTel.value = "";
    //Activa los campos
    inputClienteApellido.disabled = false
    inputClienteDni.disabled = false
    inputClienteDomicilio.disabled = false
    inputClienteEmail.disabled = false
    inputClienteNombre.disabled = false
    inputClienteTel.disabled = false
    limpiarvehiculo();
})