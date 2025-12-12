  fetch("/api/hello")
  .then(response => response.json())
  .then(data => {
    document.getElementById("mensaje").innerText = data.message;
  })
  .catch(error => {
    console.error("Error al consultar backend:", error);
  });
