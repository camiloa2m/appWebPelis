import { useState } from "react";

export default function FormDetalles(props){
    const [tag, setTag] = useState("");

    function handleChange(event){
        setTag(event.target.value);
    }
    function handleClick(event){
        event.preventDefault();
        const {name, value} = event.target;
        if(name === "btnAdicionar"){
            props.onClick(tag, value, "adicionar");
            setTag("");
        }else{
            props.onClick(tag, props.id, "eliminar", value);
        }
    }
    return (
        <>
            <fieldset>
                <legend>{props.titulo}</legend>
                <input type="text" name={props.id} id={props.id} value={tag} onChange={handleChange}/>
                <button type="button" name="btnAdicionar" value={props.id} onClick={handleClick}>Adicionar {props.titulo}</button>
                <div>
                    {props.datos && props.datos.map((dato,idx)=>(
                        <button type="button" value={idx} name="btnEliminar" onClick={handleClick}>{dato}</button>
                    ))}
                </div>
            </fieldset>
        </>
    )
}