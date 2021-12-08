import { useState, useEffect } from "react";
import * as PeliculasService from "../services/PeliculasService";

export default function ListarPeliculas(){
    const [peliculas, setPeliculas] = useState([]);

    useEffect(()=>{
        PeliculasService.servicioBusquedaPeliculas()
            .then(function(resultadosBusqueda){
                setPeliculas(resultadosBusqueda.data);
            })
            .catch(function(error){
                console.log(error);
            })
    }, []); // [peliculas]

    function handleClick(event){
        const button = event.target.name;
        const idPelicula = event.target.value;

        switch(button){
            case "btnEditar":
                break;
            case "btnEliminar":
                PeliculasService.servicioEliminarPelicula(idPelicula)
                    .then(function(resultadoEliminacion){
                        if (resultadoEliminacion.datos.acknowledged){
                            setPeliculas(peliculasActual => (
                                peliculasActual.filter(pelicula => pelicula._id !== idPelicula)
                            ));
                        }
                    })
                    .catch(function(error){
                        console.log(error);
                    })
                break;
            default:
                break;
        }

    }

    return (
        <>
            <table>
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Año</th>
                    <th>Rating</th>
                    <th>Clasificación</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {peliculas && peliculas.map(pelicula => (
                    <tr key={pelicula._id}>
                        <td>{pelicula.titulo}</td>
                        <td>{pelicula.ano}</td>
                        <td>{pelicula.rating}</td>
                        <td>{pelicula.clasificacion}</td>
                        <td>
                            <button type="button" value={pelicula._id} name="btnEditar" onClick={handleClick}>Editar</button>
                            <button type="button" value={pelicula._id} name="btnEliminar" onClick={handleClick}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
        </>
    )
}