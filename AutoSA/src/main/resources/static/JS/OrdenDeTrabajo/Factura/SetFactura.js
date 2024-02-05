// -------------------------------------------------------------------------------------------------------------------
// Variales  ---------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------
const urlFactura = 'http://localhost:8080/factura';
import { buscarOrndeId, buscarDetalleOrden } from "../Orden/GetDetalle.js";

// -------------------------------------------------------------------------------------------------------------------
// Funciones  ---------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------

async function calcularSubTotal(ordenDeTrabajo){
    const dataOrden = await buscarOrndeId(ordenDeTrabajo);
    const impuestoVehiculo = dataOrden.vehiculo.modelo.marca.impuesto;
    const dataDetalleOrden = await buscarDetalleOrden(ordenDeTrabajo);
    let precioServicios = 0;
    dataDetalleOrden.forEach(function(data){
        precioServicios += data.servicio.precio; 
    });
    const impuesto = (precioServicios * impuestoVehiculo) /100;
    const subTotal = precioServicios + impuesto;
    return subTotal;
}

export async function setFactura(fecha, hora, ordenDeTrabajoId){
    const subTotal = await calcularSubTotal(ordenDeTrabajoId);
    let nuevaFatura = {
        ordenDeTrabajo : {
            id : ordenDeTrabajoId
        },
        fecha : fecha,
        hora : hora,
        subTotal : subTotal
    }
    
    await fetch(urlFactura+ "/create",{
        method : "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body : JSON.stringify(nuevaFatura)
    })
    .then(function (response) {
        if (response.ok) {
            console.log("Factura creada con exito");
        } else if(response.status === 400){
            console.log("Respuesta de red OK pero respuesta HTTP no OK");
        }
    })
    .catch(error => {
        console.error('Error en la solicitud POST:', error);
    });
}
