// Importar módulos requiridos
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const controladorPeliculas = require('./api/peliculas/controller');
const controladorUsuarios = require('./api/usuarios/controller');
const basedatos = require('./database/connection');
require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const res = require('express/lib/response');

// Iniciar express
const app = express();

// Iniciar la configuracion
const port = process.env.PORT;

app.use(cors()); // para perminitir dominios adicionales, cors({origin:["www.dominio1.com, www.dominio2.com"]}
app.use(helmet()); // protegeg la aplicacion de vulnerabilidades conocidas etableciendo correctamente los headers
app.use(compression()); // mejora el rendimiento de api express

app.use(bodyParser.json()); // para convertir la info a json
app.use(bodyParser.urlencoded({extended: true})); // para convertir la info a json
app.use(morgan(process.env.MORGAN_MODE));

// usar los controladores
app.use("/api/peliculas", controladorPeliculas);
app.use("/api/usuarios", controladorUsuarios);

// configurar carpeta pública
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "./index.html"))
});


basedatos.conectar()
    .then(function(){
        // escucha infomacion del puerto
        app.listen(port, () => {
            console.log(`App listenig at http://localhost:${port}`);
            console.log(basedatos.obtenerConexion());
        });
    })
    .catch(function(error){
        console.log(error);
    })





/*
// crea informacion
app.post('/crear', function(req, res){
    // procesar la peticion
    // extraer el body de la peticion
    let data = req.body; // se envia informacion por el body
    res.send({
        "mensaje": "... info del cuerpo de la peticion",
        "cuerpo": data
    });
});

// actualiza informacion
app.put('/actualizar', (req, res) => {
    let queryString = req.query; // informacion de la queryString: es la parte ?x=t&p=r
    let cuerpo = req.body; // se envia informacion por el body
    res.send({
        "mensaje": "peticion PUT con query string y cuerpo",
        "query": queryString,
        "cuerpo": cuerpo
    })
})

// eliminacion por parametros, los parametros se colocan el la ruta como
// "/quivalaruta/:aquivaelparametro"
app.delete("/eliminar/:id", (req, res) => {
    let id = req.params.id;
    res.send("El id a eliminar es "+ id)
})
*/