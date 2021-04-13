import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../../../App"
import emblema from "../../../imgs/emblema.jpeg"
import "./NavegadorSuperior.css"

function NavegadorLogado({nome}){
    const {setAuth} = useContext(AuthContext);

    return(
        <div className="nav-superior">
            <div className="esq">
                <img className="imagem" src={emblema}/>
            </div>
            <div className="dir">
                    <NavLink exact to="/" className="link"> Principal
                    </NavLink>
                    <NavLink className="link" to="/PaginaPostar"> Postar
                    </NavLink>
                    <div className="link" onClick={()=>{setAuth({token:"null",nome:"null"})}}>
                        Logout
                    </div>
                <span className="nome">{nome}</span>
            </div>
        </div>
    )
}

function NavegadorNaoLogado(){
    return(
        <div className="nav-superior">
            <div className="esq">
                <img className="imagem" src={emblema}/>
            </div>
            <div className="dir">
                <NavLink className="link" to="/cadastro"> Cadastrar
                </NavLink>
                <NavLink className="link" to="/login"> Login
                </NavLink>
            </div>
        </div>
    )
}

export function NavegadorSuperior(){
    const {auth} = useContext(AuthContext);
    
    return(
        <div>
            {auth.token == "null" ? <NavegadorNaoLogado></NavegadorNaoLogado> : <NavegadorLogado nome={auth.nome}></NavegadorLogado>}
        </div>
    )
}