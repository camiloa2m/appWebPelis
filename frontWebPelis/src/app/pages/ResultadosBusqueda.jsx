import { useState } from "react";
import Resultados from "../components/Resultados";
import "../styles/resultados-busqueda.css"


export default function ResultadosBusqueda(){
    const [busqueda, setBusqueda] = useState("");
    const [resultados, setResultados] = useState([]);

    function handleSubmit(event){
        event.preventDefault();
    }

    function handleChange(event){
        let tituloPelicula = event.target.value;
        setBusqueda(tituloPelicula);

        let ResultadosBusqueda = new Array(event.target.value.length).fill(0);
        setResultados(ResultadosBusqueda)
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
                        <Resultados/>
                    ))}
                </div>
            </fieldset>
        </div>
        </>
    )
}