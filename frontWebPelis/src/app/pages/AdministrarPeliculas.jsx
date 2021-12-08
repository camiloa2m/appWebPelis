import ListarPeliculas from "../components/ListarPeliculas";

export default function AdministrarPeliculas(){

    return(
        <>
            <fieldset>
                <legend>Administrar Películas</legend>
                <fieldset>
                    <legend>Datos Película</legend>
                </fieldset>
                <fieldset>
                    <legend>Lista Películas</legend>
                    <ListarPeliculas/>
                </fieldset>
            </fieldset>
        </>
    )
}