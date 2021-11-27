const express = require('express');
const controladorUsuarios = express.Router(); // permite crear controladores
const servicioUsuarios = require('./service')


controladorUsuarios.get("/obtenerUsuario/:id", function(req, res){
    let id = req.params.id;
    res.send("El id del usuario es es " + id)
});

// crear nuevo usuario
controladorUsuarios.post("/crearUsuario", async function(req, res){
    let datosUsuario = req.body;
    let resultado = await servicioUsuarios.crearUsuario(datosUsuario);
    res.send(resultado);
});

// iniciar sesion usando query string
// http://localhost:3000/api/usuarios/iniciarSesion?usuario=admin&clave=admin123
controladorUsuarios.get("/iniciarSesion", async function(req, res){
    let usuario = req.query;
    let resultado = await servicioUsuarios.iniciarSesion(usuario);
    res.send(resultado)
});

module.exports = controladorUsuarios;