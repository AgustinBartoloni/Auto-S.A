import { urlDetalle, urlOrden, urlPersonal } from "./GetOrden.js";
const patenteVehiculo = document.getElementById("patenteVehiculo");
const marcaVehiculo = document.getElementById("marcaVehiculo");
const modeloVehiculo = document.getElementById("modeloVehiculo");
const añoVehiculo = document.getElementById("añovehiculo");
const nombreCliente = document.getElementById("nombreCliente");
const apellidoCliente = document.getElementById("apellidoCliente");
const domicilioCliente = document.getElementById("domicilioCliente");
const telefonoCliente = document.getElementById("telefonoCliente");
const tablaServicios = document.getElementById("tablaServicios");
const tablaTecnicos = document.getElementById("tablaTecnicos")


export async function mostrarDetalleOrdenTrabajo(ordenDeTrabajo){
    console.log(ordenDeTrabajo);
    const dataDetalleOrden = await buscarDetalleOrden(ordenDeTrabajo);
    const dataPersonalOrden = await buscarPersonalOrden(ordenDeTrabajo);
    const dataOrden = await buscarOrndeId(ordenDeTrabajo);
    //Vehiculo
    patenteVehiculo.value = dataOrden.vehiculo.patente;
    marcaVehiculo.value = dataOrden.vehiculo.modelo.marca.nombre;
    modeloVehiculo.value = dataOrden.vehiculo.modelo.nombre;
    añoVehiculo.value = dataOrden.vehiculo.año;
    patenteVehiculo.disabled = "true";
    marcaVehiculo.disabled = "true";
    modeloVehiculo.disabled = "true";
    añoVehiculo.disabled = "true";
    //Cliente
    nombreCliente.value = dataOrden.vehiculo.cliente.nombre;
    apellidoCliente.value = dataOrden.vehiculo.cliente.apellido;
    domicilioCliente.value = dataOrden.vehiculo.cliente.domicilio;
    telefonoCliente.value = dataOrden.vehiculo.cliente.telefono;
    nombreCliente.disabled = "true";
    apellidoCliente.disabled = "true";
    domicilioCliente.disabled = "true";
    telefonoCliente.disabled = "true";
    //Servicios
    const tbodyServicios = tablaServicios.querySelector("tbody");
    tbodyServicios.innerHTML = "";
    dataDetalleOrden.forEach(function (data){
        const fila = document.createElement("tr");
        const columnaNombre = document.createElement("td");
        const columnaDescripcion = document.createElement("td");

        columnaDescripcion.textContent = data.servicio.descripcion;
        columnaNombre.textContent = data.servicio.nombre;

        fila.appendChild(columnaNombre);
        fila.appendChild(columnaDescripcion);

        tbodyServicios.appendChild(fila);

    });
    //tecnicos
    const tbodyPersonal = tablaTecnicos.querySelector("tbody");
    tbodyPersonal.innerHTML = "";
    dataPersonalOrden.forEach(function (data){
        const fila = document.createElement("tr");
        const columnaId = document.createElement("td");
        const columnaNombre = document.createElement("td");
        const columnaApellido = document.createElement("td");

        columnaId.textContent = data.tecnico.id;
        columnaNombre.textContent = data.tecnico.nombre;
        columnaApellido.textContent = data.tecnico.apellido;

        fila.appendChild(columnaId);
        fila.appendChild(columnaNombre);
        fila.appendChild(columnaApellido);

        tbodyPersonal.appendChild(fila);

    });
}

export async function buscarOrndeId(ordenDeTrabajo){
    const responseOrden = await fetch(urlOrden + `/listById/${ordenDeTrabajo}`);
    if(!responseOrden.ok){
        console.log("Error al listar todas las ordenes" + responseOrden.status + responseOrden.statusText);
    }
    const dataOrden = await responseOrden.json();
    return dataOrden;
}
export async function buscarDetalleOrden(ordenDeTrabajo){
    const responseDetalle = await fetch(urlDetalle + `/listByOrdentrabajoId/${ordenDeTrabajo}`);
    if(!responseDetalle.ok){
    console.log("Error al listar todas las ordenes" + responseDetalle.status + responseDetalle.statusText);
    }
    const dataDetalleOrden = await responseDetalle.json();
    return dataDetalleOrden;
}

async function buscarPersonalOrden(ordenDeTrabajo){
    const responsePersonal = await fetch(urlPersonal + `/listByOrdentrabajoId/${ordenDeTrabajo}`);
    if(!responsePersonal.ok){
        console.log("Error al listar todas las ordenes" + responsePersonal.status + responsePersonal.statusText);
    }
    const dataPersonalOrden = await responsePersonal.json();
    return dataPersonalOrden;
}
