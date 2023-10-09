function cargarFechaHora() {
    // Obtener la fecha y hora actual
    const fechaActual = new Date();

    // Formatear la fecha como "YYYY-MM-DD" para el input date
    const fechaFormateada = fechaActual.toISOString().split('T')[0];

    // Formatear la hora como "HH:MM" para el input time
    const horaFormateada = fechaActual.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });


    // Establecer los valores en los campos de fecha y hora
    document.getElementById("fecha").value = fechaFormateada;
    document.getElementById("hora").value = horaFormateada;
}

// Ejecutar la función cuando la página se cargue
window.onload = cargarFechaHora;