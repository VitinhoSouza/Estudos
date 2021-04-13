import './FormPostar.css'
import history from '../../../history'
import { inserirPost } from '../../../api/postsAPI';
import { useContext } from 'react';
import { AuthContext } from '../../../App';
import { useForm } from 'react-hook-form';

export function FormPostar(){
    const {register,handleSubmit} = useForm();
    const {auth} = useContext(AuthContext);

    const submeter = (post) => {
        let postComLikes ={
            "texto":post.texto,
            "likes":0
        }
        inserirPost(auth.token,postComLikes).then((response)=>{
            history.push("./");
        }).catch((error)=>{
            console.log(error);
        })
    }

    return(

        <form onSubmit={handleSubmit(submeter)} className="form-postar">
            Texto:<input className="texto-mensagem" name="texto" placeholder="Escreva o texto do seu post." ref={register}/>
            <button className="submit-postar" placeholder="Postar">Postar</button>
        </form>
    )
}