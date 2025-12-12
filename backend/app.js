import express from "express";
const app = express();

app.get("/hello", (req, res) => {
  res.json({ message: "Hola desde el backend en Docker!" });
});

// Puerto interno del contenedor
app.listen(3000, () => {
  console.log("Backend escuchando en http://localhost:3000");
});
