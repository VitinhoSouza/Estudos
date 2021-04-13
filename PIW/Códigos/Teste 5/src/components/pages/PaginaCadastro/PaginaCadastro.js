import { useForm } from "react-hook-form";
import { NavegadorSuperior } from "../../commom/NavegadorSuperior/NavegadorSuperior";
import './PaginaCadastro.css'
import history from '../../../history'
import { cadastrar } from "../../../api/auth";

function FormularioCadastro(){
    const {register,handleSubmit} = useForm();
    const submeter = (usuario) => {
        cadastrar(usuario).then((response)=>{
            //console.log(response);
            history.push("/login");
        }).catch((error)=>{
            console.log(error);
        })
    }

    return(
        <form onSubmit={handleSubmit(submeter)}>
            Nome:<input type="text" name="nome" ref={register}/><br/>
            Email:<input type="mail" name="email" ref={register}/><br/>
            Senha:<input type="password" name="senha" ref={register}/><br/>
            <button>Cadastrar</button>
        </form>
    )
}

export function PaginaCadastro(){
    return(
        <div className="pagina-cadastro">
            <NavegadorSuperior></NavegadorSuperior>
            <FormularioCadastro></FormularioCadastro>
        </div>
    )
}