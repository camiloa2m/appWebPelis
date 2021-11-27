const jwt = require('jsonwebtoken');
const { token } = require('morgan');
require('dotenv').config(); // importar variables de entorno

function crearToken(usuario){
    const payload = {
        "id" : usuario._id,
        "nombre": usuario.nombre,
        "roles": usuario.roles
    }

    const token = jwt.sign(payload, process.env.JWT_CLAVE, {expiresIn: process.env.JWT_EXPIRES});

    return token;
}


// MIDDLEWARE -> va antes de la acción de la ruta.
function validarToken(req, res, next){
    let token = undefined;
    if(req.headers['authorization']){
        token = req.headers['authorization'].split(" ").pop();
    }
    if(token){
        jwt.verify(token, process.env.JWT_CLAVE, function(error, usuario){
            if(error){
                res.status(401).send({"mensaje": "Token no válido"});
            }else{
                req.usuario = usuario;
                next();
            }
        })
    }else{
        res.status(403).send({"mensaje": "No está autorizado"});
    }
}

module.exports.crearToken = crearToken;
module.exports.validarToken = validarToken;