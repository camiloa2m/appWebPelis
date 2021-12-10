import { useState, useEffect } from "react";
import Resultados from "../components/Resultados";
import * as PeliculasService from "../services/PeliculasService";
import "../styles/resultados-busqueda.css"


export default function ResultadosBusqueda(){
    const [busqueda, setBusqueda] = useState("");
    const [resultados, setResultados] = useState([]);

    /* Efecto:
        1. Siempre se ejecuta una vez -> montaje del componente
        2. Por cada cambio de estado despues de renderixar se ejecuta -> actualización
        3. Adicionar return para desmontaje -> desmontaje
     */
    useEffect(() => {
        if (busqueda.length >= 3){
            PeliculasService.servicioBusquedaTitulo(busqueda)
                .then(function(resultadosBusqueda){
                    setResultados(resultadosBusqueda.data);
                })
                .catch(function(error){
                    console.log(error);
                })
        } else {
            setResultados([]);
        }
    }, [busqueda]) // busquedaAnterior != nueva busquedaNueva? se ejecuta: no se ejecuta
    // en el array [busqueda], segundo parametro, se pone la variable que queremos que se monitorice

    function handleSubmit(event){
        event.preventDefault();
    }

    function handleChange(event){
        let tituloPelicula = event.target.value;
        setBusqueda(tituloPelicula);
    }

    return(
        <>
        <div className="dv-busqueda">
            <form onSumnit={handleSubmit}>
                <fieldset>
                    <legend>Buscar películas</legend>
                    <input type="text" id="busqueda" name="busqueda" placeholder="Título de la película..." onChange={handleChange}></input>
                </fieldset>
            </form>
        </div>
        <div>
            <fieldset>
                <legend>Listado películas</legend>
                <div><span> Resultados para: {busqueda}</span></div>
                <div className="dv-resultados">
                    {resultados && resultados.length > 0 && resultados.map(pelicula => (
                        <Resultados pelicula={pelicula}/>
                    ))}
                </div>
            </fieldset>
        </div>
        </>
    )
}