import { useContext } from "react";
import { useForm } from "react-hook-form";
import { login } from "../../../api/auth";
import { AuthContext } from "../../../App";
import history from "../../../history"
import styles from "./pagelogin.module.scss"
export function PageLogin(){

    const {register, handleSubmit} = useForm();
    const auth = useContext(AuthContext);
    console.log(auth.token);

    function goRegister () {
        history.push("/register");
    }

    function goHome(user){
        let user_correct = {
            "email":user.email,
            "password":user.password,
            "confirmPassword":user.password
        }
        console.log(user_correct);
        login(user_correct)
        .then((response)=>{
            console.log(response.data.value.token);
            //console.log(auth);
            auth.setAuth({token:response.data.value.token});
            //console.log(auth);
            history.push("/");
        }).catch((error)=>{
            console.log(error);
        })
    }

    return(
        <div className={styles.page}>
            <h1>
                Sistema de Catálogos de Produtos
            </h1>
            <form className={styles.form} onSubmit={handleSubmit(goHome)}>
                
                <input type="email" {...register('email', { required: true })} placeholder=" Digite seu email"/>
                <input type="password" {...register('password', { required: true })} placeholder=" Digite sua senha"/>
                <button type="submit">ENTRAR</button>
                    
            </form>
            <form className={styles.register} onSubmit={goRegister}>
                <h4>Ainda não tem uma conta?</h4>
                <button type="submit">CADASTRE-SE</button>
            </form>
        </div>
    )
}