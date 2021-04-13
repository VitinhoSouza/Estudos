import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { inserirComentario,listarComentarios } from "../../../api/comentariosAPI";
import { AuthContext } from "../../../App";
import "./Post.css"

function limparValor(){
    let botao = document.querySelector(".div_post .comentarios .mensagem button");

    botao.addEventListener("click", function(){
        let texto_mensagem = document.querySelector(".div_post .comentarios .mensagem .texto-mensagem");
        //texto_mensagem.placeholder = "Escreva uma comentário...";
        //Falta: Saber apagar valor do input text
    })
}

function Comentario({texto,usuario}){
    return(
        <div className="comentario">
            <span className="pessoa">{usuario}</span>
            <span className="texto">"{texto}"</span>
        </div>
    )
}

function MontarComentarios({comentarios,}){
    return(
        comentarios.map(
            (comentario)=>(
                <Comentario texto={comentario.texto} usuario={comentario.usuario.nome}></Comentario>
            )
        )
    )
}

export function Post({id_post,nomeUsuario,texto,qtdLikes}){   
    const {auth} = useContext(AuthContext);
    const {register,handleSubmit} = useForm();
    const [comentarios, setComentarios] = useState([]);
    const [likes,setLikes] = useState(0);

    const adicionarLike = () =>{
        setLikes(likes+1);
        console.log(likes);
    }

    const atualizarComentarios = () => {
        listarComentarios(auth.token,id_post).then(
            (response) =>{
                setComentarios(response.data);
            }
        ).catch(
            (error)=>{
                console.log(error);
            }
        )
    }

    const submeter = (comentario) => {
        let comentarioComId = {
            "texto":comentario.texto,
            "post":id_post
        }
        inserirComentario(auth.token,comentarioComId).then((response)=>{
            atualizarComentarios();
        }).catch((error)=>{
            console.log(error);
        })
        //limparValor();
    }

    useEffect(()=>{
        atualizarComentarios();
    },[]);
    
    return(
        <div className="div_post">
            <div className="post">
                <span className="pessoa">{nomeUsuario}</span>
                <span className="texto">"{texto}"</span>
                <div className="linha3">
                    <span className="likes">Likes: {likes}</span>
                    <button id="id_button" onClick={adicionarLike}>Curtir</button>
                </div>
            </div>
        
            <div className="comentarios">
                <div className="conteudo">
                    <MontarComentarios comentarios={comentarios}></MontarComentarios>
                </div>

                <form onSubmit={handleSubmit(submeter)} className="mensagem">
                    <input className="texto-mensagem" name="texto" onFocus="this.value='';" placeholder="Escreva uma comentário..." ref={register}/>
                    <button id="id_button" placeholder="Postar">Postar</button>
                </form>
            </div>
        </div>
    )
}