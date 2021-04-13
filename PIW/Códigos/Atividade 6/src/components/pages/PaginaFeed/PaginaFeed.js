import "./PaginaFeed.css"
import { Post } from '../Post/Post';
import { useContext, useEffect, useState } from "react";
import { listarPosts } from "../../../api/postsAPI";
import { AuthContext } from "../../../App";

function Conteudo({posts}){
    return(
        posts.map(
            (post)=>(
                <Post id_post={post.id} nomeUsuario={post.id_usuario.nome} texto={post.texto} qtdLikes={post.likes}></Post>
            )
        )
    )
}

export function PaginaFeed(){

    const {auth} = useContext(AuthContext);

    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        listarPosts(auth.token).then(
            (response) =>{
                setPosts(response.data);
            }
        ).catch(
            (error)=>{
                console.log(error);
            }
        )
    },[]);

    return(
        <div className="linha-tempo">
            <Conteudo posts={posts}></Conteudo>
        </div>
    )
}