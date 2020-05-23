const express = require("express");
const cors = require("cors");

//inicializando la libreria
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Api del proyecto del taller de motos");
  });
  
//ruta con endpoint
const rutas_usuarios = require("./routes/usuarios");
app.use(rutas_usuarios);

const rutas_autenticacion = require("./routes/autenticacion");
app.use(rutas_autenticacion);

//const rutas_asignaciones = require("./routes/modulo_asignaciones");
//app.use(rutas_asignaciones);

//const rutas_mantenimiento = require("./routes/modulo_mantenimiento");
//app.use(rutas_mantenimiento);

//const rutas_motos = require("./routes/modulo_motos");
//app.use(rutas_motos);

  // Puerto
  //const port = process.env.PORT || 3001;
  const port = 3001;
  app.listen(port, () => {
    console.log(`Escuchando API en http://localhost:${port}`);
  });