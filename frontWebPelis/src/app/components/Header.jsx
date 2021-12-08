import { useHistory } from "react-router";
import "../styles/header.css";

export default function Header(props){
    let history = useHistory();

    function handleClick(event){
        event.preventDefault();
        if (event.target.value === "iniciar"){
            history.push("/login");
        } else {
            localStorage.removeItem("auth");
            props.autenticado(null);
            history.push("/");
        }

    }

    return(
        <>
            <header className="header">
                {!props.usuario &&
                    <button type="button" onClick={handleClick} value="iniciar">Iniciar Sesión</button>
                }
                {props.usuario &&
                    <button type="button" onClick={handleClick} value="cerrar">Cerrar Sesión</button>
                }
            </header>
            {props.children}
        </>
    )
}