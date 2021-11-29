import {URL_API_PELICULAS} from"../config/config";

export function servicioBusquedaTitulo(titulo){
    const path = "/peliculas/buscarPeliculasTitulo/" + titulo;

    const config = {
        method : "GET",
        mode : "cors"
    }

    return fetch(
        URL_API_PELICULAS + path,
        config
    )
    .then(function(respuesta){
        if(respuesta.status === 200){
            return respuesta.json()
        }
        else{
            Promise.reject(respuesta.statusText)
        }
    })
    .catch(function(error){
        console.log(error)
    })
}