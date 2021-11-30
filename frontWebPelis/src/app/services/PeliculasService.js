import {URL_API_PELICULAS} from"../config/config";

export function servicioBusquedaTitulo(titulo){
    const path = "/peliculas/buscarPeliculasTitulo/" + titulo;

    const config = {
        method : "GET",
        mode : "cors"
    }

    return fetch(URL_API_PELICULAS + path, config)
        .then(function(respuesta){
            if(respuesta.status === 200){
                return respuesta.json();
            }else{
                return Promise.reject(respuesta.statusText);
            }
        })
        .catch(function(error){
            console.log(error);
        })
}

export function servicioBusquedaId(id){
    const path = "/peliculas/obtenerPelicula/" + id;

    const config = {
        method: "GET",
        mode: "cors"
    }

    return fetch(URL_API_PELICULAS + path, config)
        .then(function(respuesta){
            if(respuesta.ok){
                return respuesta.json();
            }else{
                return Promise.reject(respuesta.statusText);
            }
        })
        .catch(function(error){
            console.log(error);
        })
}