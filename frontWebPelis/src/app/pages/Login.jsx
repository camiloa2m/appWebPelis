import { useState } from "react";
import { useHistory } from "react-router";
import * as UsuariosService from "../services/UsuariosService";

export default function Login(props){
    const [usuario, setUsuario] = useState();
    const [clave, setClave] = useState();
    let history = useHistory();

    function handleChange(event){
        if(event.target.name === "usuario"){
            setUsuario(event.target.value);
        } else if (event.target.name === "contrasenia"){
            setClave(event.target.value);
        }
    }

    function handleClick(event){
        UsuariosService.servicioIniciarSesion(usuario, clave)
            .then(function(resultadosUsuario){
                if(resultadosUsuario.token){
                    const datosUsuario = {
                        token: resultadosUsuario.token,
                        nombre : resultadosUsuario.datos.nombre,
                        roles : resultadosUsuario.datos.roles
                    }
                    localStorage.setItem("auth", JSON.stringify(datosUsuario));
                    props.autenticado(datosUsuario);
                    history.push("/administrar");
                }
            })
            .catch(function(error){
                console.log(error);
            })
    }

    return(
        <>
            <div>
                <fieldset>
                    <legend>Iniciar Sesión</legend>
                    <form>
                        <div>
                            <label htmlFor="usuario">Usuario: </label> <br/>
                            <input type="text" id="usuario" name="usuario" value={usuario} onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor="contrasenia">Contraseña: </label> <br/>
                            <input type="password" id="contrasenia" name="contrasenia" value={clave} onChange={handleChange}/>
                        </div>
                        <div>
                            <button type="button" onClick={handleClick}> Iniciar Sesión </button>
                        </div>
                    </form>
                </fieldset>
            </div>
        </>
    )
}