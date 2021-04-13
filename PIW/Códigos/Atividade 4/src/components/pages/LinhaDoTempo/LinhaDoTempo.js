import "./LinhaDoTempo.css"
import { Post } from '../Post/Post';

export function LinhaDoTempo(){
    let posts = [
        {
            id:1, texto:"Hoje o dia está muito bom para fazer um trabalho de PIW", nomePessoa:"Joao", qtdLikes:1
        },
        {
            id:2, texto:"Seguinte, vou vender minha arte na praia",nomePessoa:"Tiago", qtdLikes:10
        },
        {
            id:3,  texto:"Cuida rapaziada, aquele churras hoje por minha conta",nomePessoa:"Camila", qtdLikes:100
        }
    ]

    let lista = posts.map(
        (post)=>(
            <Post nomePessoa={post.nomePessoa} texto={post.texto} qtdLikes={post.qtdLikes}></Post>
        )
    )
    return(
        <div className="linha-tempo">
            {lista}
        </div>
    )
}