"use strict";
function capturarInputs(e) {
    e.preventDefault();
    // Obtener el formulario por su ID
    const formulario = {
        nombreYApellido: document.querySelector("#nombreYApellido").value,
        direccion: document.querySelector("#direccion").value,
        telefono: document.querySelector("#telefono").value,
        email: document.querySelector("#email").value
    };
    // Acceder a las propiedades del objeto formulario
    console.log("Nombre:", formulario.nombreYApellido);
    console.log("Dirección:", formulario.direccion);
    console.log("Telefono:", formulario.telefono);
    console.log("Email:", formulario.email);
}
const boton = document.querySelector("#btn");
boton === null || boton === void 0 ? void 0 : boton.addEventListener("click", capturarInputs);
