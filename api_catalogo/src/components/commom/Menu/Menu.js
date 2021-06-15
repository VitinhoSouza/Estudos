import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext, Context } from "../../../App";
import history from "../../../history";
import styles from "./menu.module.scss";

export function Menu () {

    const {setNavActive,setSearchByIdActive} = useContext(Context);
    const {setAuth} = useContext(AuthContext);
    const [modalIsOn, setModalIsOn] = useState(false);

    function toggleModal(){
        if(modalIsOn === true){
            setModalIsOn(false);
        }else{
            setModalIsOn(true);
        }
    }

    function getOut(){
        setAuth({token:null});
        history.push("/login");
    }

    function activeProducts(){
        setNavActive("products");
        setSearchByIdActive(false);
    }
    function activeCategories(){
        setNavActive("categories");
        setSearchByIdActive(false);
    }

    return(
        <div>

            {modalIsOn && (
                <div className={styles.overlay}>
                    <div className={styles.modal}>
                        <h1>Tem certeza que deseja sair do sistema?</h1>
                        <div>
                            <button onClick={toggleModal}>Não, continuar no sistema.</button>
                            <button onClick={getOut}>Sim, sair!</button>
                        </div>
                    </div>
                </div>  
            )}

            <nav className={styles.menu}>
                <NavLink exact to="/" className={styles.navlink} activeStyle={{backgroundColor:"#5A2626"}}>Página Inicial</NavLink>
                <NavLink to="/products" className={styles.navlink} activeStyle={{backgroundColor:"#5A2626"}}
                    onClick={activeProducts}> Gerenciar Produtos</NavLink>
                <NavLink to="/categories" className={styles.navlink} activeStyle={{backgroundColor:"#5A2626"}}
                    onClick={activeCategories}> Gerenciar Categorias</NavLink>
                <div className={styles.navlink}>Configurações</div>
                <div className={styles.navlink} onClick={toggleModal}>Sair</div>
            </nav>
        </div>
    )
}