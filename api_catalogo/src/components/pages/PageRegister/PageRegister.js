import { useForm } from "react-hook-form";
import { registerUser } from "../../../api/auth";
import history from "../../../history";
import styles from "./pageregister.module.scss"

export function PageRegister(){

    const {register, handleSubmit} = useForm();

    function goLogin (){
        history.push("/login");
    }

    function goHome(user){
        let user_correct = {
            "email":user.email,
            "password":user.password,
            "confirmPassword":user.password
        }
        console.log(user_correct);
        registerUser(user_correct)
        .then((response)=>{
            console.log(response);
            history.push("/login");
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
                
                <input type="email" id="mail" {...register('email', { required: true })}  placeholder=" Digite seu email"/>
                <input type="password" id="password" {...register('password', { required: true })}  placeholder=" Digite sua senha"/>
                <button type="submit">SE CADASTRAR</button>
                    
            </form>
            <form className={styles.register} onSubmit={goLogin}>
                <h4>Já está cadastrado?</h4>
                <button type="submit">FAÇA LOGIN</button>
            </form>
        </div>
    )
}