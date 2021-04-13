import { useForm } from "react-hook-form";
import { login } from "../../../api/auth";
import { NavegadorSuperior } from "../../commom/NavegadorSuperior/NavegadorSuperior";
import './PaginaLogin.css'

import {useContext} from 'react'
import {AuthContext} from "../../../App";
import history from "../../../history";

function MensagemErro(mensagem){
    return(
        <div>
            Hoje é um novo dia
        </div>
    )
}

function FormularioLogin(){
    const {register,handleSubmit} = useForm();
    const auth = useContext(AuthContext);

    const submeter = (login_data) => {
        login(login_data).then((response)=>{
            auth.setAuth({token: response.data.token, nome:response.data.nome});
            history.push("./");
            if(response.data == "Email errado!" || response.data == "Senha errada!"){
                //<MensagemErro mensagem={response.data}></MensagemErro>
                //Falta: Renderizar uma mensagem de erro na tela.
            }
            //console.log(response.data);
        }).catch((error)=>{
            console.log(error);
        })
    }

    return(
        <form onSubmit={handleSubmit(submeter)}>
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