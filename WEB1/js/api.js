// archivo js/api.js

console.log("api.js cargado desde el frontend");

// Llamada al backend
fetch("/api/hello")
  .then(r => r.json())
  .then(data => {
    console.log("Respuesta backend:", data);

    // Insertarlo en la página si quieres
    const div = document.getElementById("api-response");
    if (div) div.innerText = data.message;
  })
  .catch(err => console.error("Error al llamar backend:", err));
