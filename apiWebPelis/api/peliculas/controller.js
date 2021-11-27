const express = require('express');
const controladorPeliculas = express.Router(); // permite crear controladores
const servicioPeliculas = require('./service');
const rutaProtegida = require('../auth/jwt').validarToken;

// capturas datos

// obtener peliculas
controladorPeliculas.get("/obtenerPeliculas", rutaProtegida, async function(req, res){
    let peliculas = await servicioPeliculas.obtenerPeliculas();
    res.send({
        "mensaje" : "Listado de películas",
        "data" : peliculas
    });
});

// obtener pelicula por id
controladorPeliculas.get("/obtenerPelicula/:id", rutaProtegida, async function(req, res){
    let id = req.params.id;
    let pelicula = await servicioPeliculas.obtenerPelicula(id);
    res.send({
        "mensaje": "Detalle película",
        "data": pelicula
    })
})

// buscar pelicula por titulo
controladorPeliculas.get("/buscarPeliculasTitulo/:titulo", async function(req, res){
    let titulo = req.params.titulo;
    let peliculas = await servicioPeliculas.buscarPeliculasTitulo(titulo);
    res.send({
        "mensaje": "Detalle peliculas por titulos",
        "busqueda": titulo,
        "data": peliculas
    })
})

// crear pelicula usando el body
controladorPeliculas.post("/crearPelicula", rutaProtegida, async function(req, res){
    let peliculaNueva = req.body;
    let respuesta = await servicioPeliculas.crearPelicula(peliculaNueva);
    res.send(respuesta)
})

// actulizar pelicula por id
controladorPeliculas.put("/actualizarPelicula/:id", rutaProtegida, async function(req, res){
    let id = req.params.id;
    let actualizacion = req.body;
    let respuesta = await servicioPeliculas.actualizarPelicula(id, actualizacion);
    res.send(respuesta);
})

// eliminar pelicula usando querystring ?id=asd
// ejemplo: http://localhost:3000/api/peliculas/eliminarPelicula?id=78
controladorPeliculas.delete("/eliminarPelicula", rutaProtegida, async function(req, res){
    let id = req.query.id;
    let respuesta = await servicioPeliculas.eliminarPelicula(id);
    res.send(respuesta)
})

module.exports = controladorPeliculas;