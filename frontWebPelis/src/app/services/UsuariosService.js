import {URL_API_PELICULAS} from"../config/config";

export function servicioIniciarSesion(usuario, clave){
    let queryString = "?usuario="+usuario + "&clave="+clave
    const path = "/usuarios/IniciarSesion" + queryString;

    const config = {
        method : "GET",
        mode : "cors"
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