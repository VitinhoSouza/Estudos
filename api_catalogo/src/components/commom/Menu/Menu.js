import { useState } from "react";
import { NavLink } from "react-router-dom";
import history from "../../../history";
import styles from "./menu.module.scss"

export function Menu () {

    const [modalIsOn, setModalIsOn] = useState(false);

    function toggleModal(){
        if(modalIsOn === true){
            setModalIsOn(false);
        }else{
            setModalIsOn(true);
        }
    }

    function getout(){
        history.push("./login");
    }

    return(
        <div>

            {modalIsOn && (
                <div className={styles.overlay}>
                    <div className={styles.modal}>
                        <h1>Tem certeza que deseja sair do sistema?</h1>
                        <div>
                            <button onClick={toggleModal}>Não, eu quero continuar no sistema.</button>
                            <button onClick={getout}>Sim, eu quero sair!</button>
                        </div>
                    </div>
                </div>  
            )}

            <nav className={styles.menu}>
                <NavLink exact to="/" className={styles.navlink + " active"} activeStyle={{backgroundColor:"red"}}>Página Inicial</NavLink>
                <NavLink to="/products" className={styles.navlink} activeClassName="selected">Gerenciar Produtos</NavLink>
                <NavLink to="/categories" className={styles.navlink}>Gerenciar Categorias</NavLink>
                <div className={styles.navlink}>Configurações</div>
                <div className={styles.navlink} onClick={toggleModal}>Sair</div>
            </nav>
        </div>
    )
}