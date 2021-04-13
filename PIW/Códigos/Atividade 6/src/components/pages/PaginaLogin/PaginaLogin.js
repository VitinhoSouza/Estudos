import { useForm } from "react-hook-form";
import { login } from "../../../api/auth";
import { NavegadorSuperior } from "../../commom/NavegadorSuperior/NavegadorSuperior";
import './PaginaLogin.css'

import {useContext} from 'react'
import {AuthContext} from "../../../App";
import history from "../../../history";

function FormularioLogin(){
    const {register,handleSubmit} = useForm();
    const auth = useContext(AuthContext);

    const submeter = (login_data) => {
        login(login_data).then((response)=>{
            auth.setAuth({token: response.data.token, nome:response.data.nome});
            history.push("./");
        }).catch((error)=>{
            console.log(error);
        })
    }

    return(
        <form onSubmit={handleSubmit(submeter)} className="div-form">
            Email:<input type="mail" name="email" ref={register}/><br/>
            Senha:<input type="password" name="senha" ref={register}/><br/>
            <button>Login</button>
        </form>
    )
}

export function PaginaLogin(){
    return(
        <div className="pagina-login">
            <NavegadorSuperior></NavegadorSuperior>
            <FormularioLogin></FormularioLogin>
        </div>
    )
}