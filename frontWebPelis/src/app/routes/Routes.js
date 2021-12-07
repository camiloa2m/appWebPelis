import { Switch, Route, Redirect } from "react-router";
import ResultadosBusqueda from "../pages/ResultadosBusqueda";
import DetallePelicula from "../pages/DetallePelicula";
import AdministrarPeliculas from "../pages/AdministrarPeliculas";
import Login from "../pages/Login";

export default function Routes(){
const usuario = localStorage.getItem("auth");

    return(
        <>
        <Switch>
            <Route exact path="/" component={ResultadosBusqueda}/>
            <Route path="/detalle/:id" component={DetallePelicula}/>
            <Route path="/administrar">
                {usuario? <AdministrarPeliculas/>: <Redirect to="/login"/>}
            </Route>
            <Route path="/login" component={Login}/>
        </Switch>
        </>
    )
}