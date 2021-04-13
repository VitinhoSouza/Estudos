import { NavLink } from "react-router-dom"
import emblema from "../../../imgs/emblema.jpeg"
import "./NavegadorSuperior.css"

export function NavegadorSuperior(){
    return(
        <div className="nav-superior">
            <div className="esq">
                <img className="imagem" src={emblema}/>
            </div>
            <div className="dir">
                    <NavLink exact className="link" to="/"> Principal
                    </NavLink>
                    <NavLink className="link" to="/PaginaPostar"> Postar
                    </NavLink>
                <span className="nome">Olá, Victor.</span>
            </div>
        </div>
    )
}