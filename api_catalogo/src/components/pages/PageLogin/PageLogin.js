import history from "../../../history"
import styles from "./login.module.scss"
export function PageLogin(){

    function go_register () {
        history.push("/register");
    }

    function go_home(){
        history.push("/");
    }

    return(
        <div className={styles.page}>
            <h1>
                Sistema de Catálogos de Produtos
            </h1>
            <form className={styles.form}>
                
                <input type="email" id="mail" placeholder=" Digite seu email"/>
                <input type="password" id="password" placeholder=" Digite sua senha"/>
                <button type="submit" onClick={go_home}>ENTRAR</button>
                    
            </form>
            <form className={styles.register} onSubmit={go_register}>
                <h4>Ainda não tem uma conta?</h4>
                <button type="submit">CADASTRE-SE</button>
            </form>
        </div>
    )
}