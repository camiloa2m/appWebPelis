import { useState } from "react";
import ListarPeliculas from "../components/ListarPeliculas";
import * as PeliculasService from "../services/PeliculasService";
import FormActores from "../components/FormActores";
import FormDetalles from "../components/FormDetalles";

export default function AdministrarPeliculas(){
    const [titulo, setTitulo] = useState("");
    const [tipo, setTipo] = useState("");
    const [ano, setAno] = useState("");
    const [rating, setRating] = useState("");
    const [clasificacion, setClasificacion] = useState("");
    const [sinopsis, setSinopsis] = useState("");
    const [poster, setPoster] = useState("");
    const [actores, setActores] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [idiomas, setIdiomas] = useState([]);
    const [paises, setPaises] = useState([]);
    const [directores, setDirectores] = useState([]);
    const [nominaciones, setNominaciones] = useState({total:null, ganadas:null});

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
            case "total":
            case "ganadas":
                setNominaciones(nominaciones => (
                    {...nominaciones, [name]: value}
                ))
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
            "actores": actores,
            "generos": generos,
            "paises": paises,
            "idiomas": idiomas,
            "directores": directores,
            "nominaciones": nominaciones
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
                    setActores("")
                    setGeneros([])
                    setPaises([])
                    setIdiomas([])
                    setDirectores([])
                    setNominaciones({total:"", ganadas:""})
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
        const { name, value } = event.target;
        if(name === "btnAdicionar"){
            const nuevosActores = [ ...actores, {nombre:"", apellido:""}];
            setActores(nuevosActores);
        }else{
            setActores(actores => (
                actores.filter((actor, idx)=> idx !== parseInt(value))
            ))
        }
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

    function handleClickDetalle(tag, elemento, accion, index = null){
        if(accion === "adicionar"){
            switch(elemento){
                case "generos":
                    setGeneros([...generos, tag]);
                break;
                case "idiomas":
                    setIdiomas([...idiomas, tag]);
                break;
                case "paises":
                    setPaises([...paises, tag]);
                break;
                case "directores":
                    setDirectores([...directores, tag]);
                break;
                default:
                break;
            }
        }else{
            switch(elemento){
                case "generos":
                    setGeneros(generos => (
                        generos.filter((genero, idx) => idx !== parseInt(index))
                    ));
                break;
                case "idiomas":
                    setIdiomas(idiomas => (
                        idiomas.filter((idioma, idx) => idx !== parseInt(index))
                    ));
                break;
                case "paises":
                    setPaises(paises => (
                        paises.filter((pais, idx) => idx !== parseInt(index))
                    ));
                break;
                case "directores":
                    setDirectores(directores => (
                        directores.filter((director, idx) => idx !== parseInt(index))
                    ));
                break;
                default:
                break;
            }
        }
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
                        <fieldset>
                            <legend>Actores</legend>
                            <div>
                                <button type="button" onClick={handleClickActores} name="btnAdicionar">Agregar Actor</button>
                            </div>
                            <div>
                                {actores && actores.map((actor, idx) => (
                                    <FormActores
                                    key={idx}
                                    id={idx}
                                    actor={actor}
                                    onChange={handleChangeActores}
                                    onClick={handleClickActores}
                                    />
                                ))}
                            </div>
                        </fieldset>
                        <FormDetalles
                            titulo="Géneros"
                            id="generos"
                            datos={generos}
                            onClick={handleClickDetalle}/>
                        <FormDetalles
                            titulo="Idiomas"
                            id="idiomas"
                            datos={idiomas}
                            onClick={handleClickDetalle}/>
                        <FormDetalles
                            titulo="Países"
                            id="paises"
                            datos={paises}
                            onClick={handleClickDetalle}/>
                        <FormDetalles
                            titulo="Directores"
                            id="directores"
                            datos={directores}
                            onClick={handleClickDetalle}/>
                        <fieldset>
                            <legend>Nominaciones</legend>
                            <div>
                                <label htmlFor="total">Total: </label>
                                <input type="text" name="total" id="total" value={nominaciones.total} onChange={handleChange}/>
                            </div>
                            <div>
                                <label htmlFor="ganadas">Ganadas: </label>
                                <input type="text" name="ganadas" id="ganadas" value={nominaciones.ganadas} onChange={handleChange}/>
                            </div>
                        </fieldset>
                        <div>
                            <button type="button" onClick={handleClick}>Guardar</button>
                        </div>
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