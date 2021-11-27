import "../styles/resultados.css";

export default function Resultados(props){

    function handleClick(event){
        event.preventDefault();
        event.stopPropagation();
        alert("Redireccionar al detalle de la pelicula")
    }

    return(
        <>
        <div className="dv-pelicula" onClick={handleClick}>
            <div className="dv-poster" >
                <img src="https://es.web.img3.acsta.net/pictures/21/11/15/18/17/0807353.jpg" alt=""/>
            </div>
            <div>
                <h1>Título de la película</h1>
            </div>
            <div>
                <p>Sinopsis</p>
            </div>
            <div>
                <span>
                    Rating:
                    <i></i>
                </span>
            </div>
        </div>
    </>
    )
}