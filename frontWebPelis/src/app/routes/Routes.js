import { Switch, Route } from "react-router";
import ResultadosBusqueda from "../pages/ResultadosBusqueda";
import DetallePelicula from "../pages/DetallePelicula";

export default function Routes(){
    return(
        <>
        <Switch>
            <Route exact path="/" component={ResultadosBusqueda}/>
            <Route path="/detalle/:id" component={DetallePelicula}/>
        </Switch>
        </>
    )
}