interface Formulario {
  nombreYApellido: string,
  direccion: string
  telefono: string | number,
  email: string
}

function capturarInputs(e: Event) {
  e.preventDefault();
  
  // Obtener el formulario por su ID
  const formulario: Formulario = {
    nombreYApellido: (document.querySelector("#nombreYApellido") as HTMLInputElement).value,
    direccion: (document.querySelector("#direccion") as HTMLInputElement).value,
    telefono: (document.querySelector("#telefono") as HTMLInputElement).value,
    email: (document.querySelector("#email") as HTMLInputElement).value
  }

  // Acceder a las propiedades del objeto formulario
  console.log("Nombre:", formulario.nombreYApellido);
  console.log("Dirección:", formulario.direccion);
  console.log("Telefono:", formulario.telefono);
  console.log("Email:", formulario.email);

  
}

const boton = document.querySelector("#btn")

boton?.addEventListener("click", capturarInputs)