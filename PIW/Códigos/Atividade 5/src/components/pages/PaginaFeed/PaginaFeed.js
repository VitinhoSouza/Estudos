import "./PaginaFeed.css"
import { Post } from '../Post/Post';

export function PaginaFeed(){
    let posts=[
        {
            id:1, texto:"Hoje o dia está muito bom para fazer um trabalho de PIW", nomePessoa:"Joao", qtdLikes:4
        },
    ]

    let comentarios=[
        {
            id:1, texto:"Eu não concordo com você", nomePessoa:"Carlos", id_post:1,
        },
        {
            id:2, texto:"Tão bom que já terminei", nomePessoa:"Maria", id_post:1,
        },
    ]

    let lista = posts.map(
        (post)=>(
            <Post nomePessoa={post.nomePessoa} texto={post.texto} qtdLikes={post.qtdLikes} comentarios={comentarios}></Post>
        )
    )
    return(
        <div className="linha-tempo">
            {lista}
        </div>
    )
}