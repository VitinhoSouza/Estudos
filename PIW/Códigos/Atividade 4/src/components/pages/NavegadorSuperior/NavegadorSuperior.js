import emblema from "../../../imgs/emblema.jpeg"
import "./NavegadorSuperior.css"

export function NavegadorSuperior(){
    return(
        <div className="nav-superior">
            <div className="esq">
                <img className="imagem" src={emblema}/>
            </div>
            <div className="dir">
                <div className="div-botao">
                    <button className="botao1">Linha do tempo</button>
                </div>
                <div className="div-botao">
                    <button>Postar</button>
                </div>
                <span className="nome">Victor Souza</span>
            </div>
        </div>
    )
}