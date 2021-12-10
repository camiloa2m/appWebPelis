import { useState } from "react";
import ListarPeliculas from "../components/ListarPeliculas";
import * as PeliculasService from "../services/PeliculasService";
import FormActores from "../components/FormActores";;

export default function AdministrarPeliculas(){
    const [titulo, setTitulo] = useState("");
    const [tipo, setTipo] = useState("");
    const [ano, setAno] = useState("");
    const [rating, setRating] = useState("");
    const [clasificacion, setClasificacion] = useState("");
    const [sinopsis, setSinopsis] = useState("");
    const [poster, setPoster] = useState("");
    const [actores, setActores] = useState([]);

    function handleChange(event){
        let {name, value} = event.target;
        switch(name){
            case "titulo":
                setTitulo(value)
            break;
            case "tipo":
                setTipo(value)
            break;
            case "ano":
                setAno(value)
            break;
            case "rating":
                setRating(value)
            break;
            case "clasificacion":
                setClasificacion(value)
            break;
            case "sinopsis":
                setSinopsis(value)
            break;
            case "poster":
                setPoster(value)
            break;
            default:
            break;
        }
    }


    function handleClick(event){
        event.preventDefault();
        const pelicula = {
            "titulo": titulo,
            "ano": ano,
            "poster": poster,
            "rating": rating,
            "clasificacion": clasificacion,
            "sinopsis": sinopsis,
            "tipo": tipo,
            "actores": actores
        }

        PeliculasService.servicioCrearPelicula(pelicula)
            .then(function(resultadoCrear){
                if(resultadoCrear.datos.acknowledged){
                    alert("Película creada correctamente")
                    setTitulo("")
                    setTipo("")
                    setAno("")
                    setRating("")
                    setClasificacion("")
                    setSinopsis("")
                    setPoster("")
                }else{
                    alert("Error al crear película")
                }
            })
            .catch(function(error){
                console.log(error);
            })
    }

    function handleClickActores(event){
        event.preventDefault();
        const nuevosActores = [ ...actores, {nombre:"", apellido:""}];
        setActores(nuevosActores);
    }

    function handleChangeActores(event){
        const index = parseInt(event.target.name.split("-").pop());
        const valor = event.target.name.split("-").shift();
        const value = event.target.value;
        setActores( actores => (
            actores.map( (actor, idx) => {
                if(idx === index){
                    return {...actor, [valor]: value}
                }else{
                    return {...actor}
                }
            })
        ))
    }

    return(
        <>
            <fieldset>
                <legend>Administrar Películas</legend>
                <fieldset>
                    <legend>Datos Película</legend>
                    <form>
                        <div>
                            <label htmlFor="titulo">Título: </label>
                            <input type="text" name="titulo" id="titulo" value={titulo} onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor="ano">Año: </label>
                            <input type="text" name="ano" id="ano" value={ano} onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor="rating">Rating: </label>
                            <input type="text" name="rating" id="rating" value={rating} onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor="clasificacion">Clasificación: </label>
                            <input type="text" name="clasificacion" id="clasificacion" value={clasificacion} onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor="poster">Poster: </label>
                            <input type="text" name="poster" id="poster" value={poster} onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor="sinopsis">Sinopsis: </label>
                            <textarea name="sinopsis" id="sinopsis" cols="30" rows="10" value={sinopsis} onChange={handleChange}></textarea>
                        </div>
                        <div>
                            <label htmlFor="tipo">Tipo: </label>
                            <input type="text" name="tipo" id="tipo" value={tipo} onChange={handleChange}/>
                        </div>
                        <div>
                            <button type="button" onClick={handleClick}>Guardar</button>
                        </div>
                        <fieldset>
                            <legend>Actores</legend>
                            <div>
                                <button type="button" onClick={handleClickActores}>Agregar Actores</button>
                            </div>
                            <div>
                                {actores && actores.map((actor, idx) => (
                                    <FormActores
                                    key={idx}
                                    id={idx}
                                    actor={actor}
                                    onChange={handleChangeActores}/>
                                ))}
                            </div>
                        </fieldset>
                    </form>
                </fieldset>
                <fieldset>
                    <legend>Lista Películas</legend>
                    <ListarPeliculas/>
                </fieldset>
            </fieldset>
        </>
    )
}