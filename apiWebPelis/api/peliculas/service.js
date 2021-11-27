const modeloPeliculas = require('./model');

async function obtenerPeliculas(){
    let peliculas = await modeloPeliculas.buscarTodo();
    return peliculas;
};

async function obtenerPelicula(id){
    let pelicula = await modeloPeliculas.buscarPorId(id);
    /*
        operaciones adicionales...
    */
    return pelicula;
}

async function buscarPeliculasTitulo(titulo){
    let peliculas = await modeloPeliculas.buscarPorTitulo(titulo);

    return peliculas
}

async function crearPelicula(peliculaNueva){
    let resultado = {};
    // si existe el objeto y si tiene llaves adentro
    if (peliculaNueva && Object.keys(peliculaNueva).length > 0){
        if (peliculaNueva.titulo && peliculaNueva.titulo != ""){
            let resultadoPelicula = await modeloPeliculas.crearUna(peliculaNueva);
            //"acknowledged" : true/false
            if (resultadoPelicula && resultadoPelicula.acknowledged){
                resultado.mensaje = "Película creada correctamente";
                resultado.datos = resultadoPelicula;
            }else{
                resultado.mensaje = "Error al crear Pelicula";
                resultado.datos = peliculaNueva;
            }
        }else{
            resultado.mensaje = "El título debe existir y no ser vacio"
            resultado.datos = peliculaNueva;
        }
    }else{
        resultado.mensaje = "No hay datos"
    }
    return resultado;
}

async function actualizarPelicula(id, actualizacion){
    let resultado = {};
    if (id.length == 24 && /^[0-9a-f]+$/i.test(id)){
        let resultadoPelicula = await modeloPeliculas.actualizarUna(id, actualizacion);
        if (resultadoPelicula && resultadoPelicula.acknowledged){
            resultadoPelicula.mensaje = "Película actualizada";
            resultado.datos = resultadoPelicula
        }else{
            resultado.mensaje = "Error al actualizar Película";
            resultado.datos = {"id": id, "pelicula": actualizacion};
        }
    }else{
        resultado.mensaje = "Id inválido";
        resultado.datos = id;
    }
    return resultado;
}

async function eliminarPelicula(id){
    let resultado = {}
    if (id && id.length == 24 && /^[0-9a-f]+$/i.test(id)){
        let resultadoEliminar = await modeloPeliculas.eliminarUna(id);
        if (resultadoEliminar && resultadoEliminar.acknowledged){
            resultadoEliminar.mensaje = "Película eliminada";
            resultado.datos = resultadoEliminar
        }else{
            resultado.mensaje = "Error al eliminar Película";
            resultado.datos = id;
        }
    }else{
        resultado.mensaje = "Id inválido";
        resultado.datos = id;
    }
    return resultado;
}

module.exports.obtenerPelicula = obtenerPelicula;
module.exports.obtenerPeliculas = obtenerPeliculas;
module.exports.buscarPeliculasTitulo = buscarPeliculasTitulo;
module.exports.crearPelicula = crearPelicula;
module.exports.actualizarPelicula = actualizarPelicula;
module.exports.eliminarPelicula = eliminarPelicula;