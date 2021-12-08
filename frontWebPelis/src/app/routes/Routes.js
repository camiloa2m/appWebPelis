import { useState } from "react";
import { Switch, Route, Redirect } from "react-router";
import ResultadosBusqueda from "../pages/ResultadosBusqueda";
import DetallePelicula from "../pages/DetallePelicula";
import AdministrarPeliculas from "../pages/AdministrarPeliculas";
import Login from "../pages/Login";
import Header from "../components/Header";

export default function Routes(){
const auth = localStorage.getItem("auth");
const [usuario, setUsuario] = useState(auth);

    return(
        <>
        <Switch>
            <Header usuario={usuario} autenticado={setUsuario}>
                <Route exact path="/" component={ResultadosBusqueda}/>
                <Route path="/detalle/:id" component={DetallePelicula}/>
                <Route path="/administrar">
                    {usuario? <AdministrarPeliculas/> : <Redirect to="/login" />}
                </Route>
                <Route path="/login">
                    <Login autenticado={setUsuario}/>
                </Route>
            </Header>
        </Switch>
        </>
    )
}