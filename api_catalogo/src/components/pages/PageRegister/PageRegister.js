import history from "../../../history";
import styles from "./register.module.scss"
export function PageRegister(){

    function go_login (){
        history.push("/login");
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
                <button type="submit" onClick={go_home}>SE CADASTRAR</button>
                    
            </form>
            <form className={styles.register} onSubmit={go_login}>
                <h4>Já está cadastrado?</h4>
                <button type="submit">FAÇA LOGIN</button>
            </form>
        </div>
    )
}