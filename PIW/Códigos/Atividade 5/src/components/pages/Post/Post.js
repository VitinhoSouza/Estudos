import "./Post.css"

export function Post({nomePessoa,texto,qtdLikes,comentarios}){
    return(
        <div>
            <div className="post">
                <span className="pessoa">{nomePessoa}</span>
                <span className="texto">"{texto}"</span>
                <div className="linha3">
                    <span className="likes">Likes: {qtdLikes}</span>
                    <button>Curtir</button>
                </div>
            </div>
            <div className="comentarios">
                <div className="conteudo">
                    <div className="comentario">
                        <span className="pessoa">{comentarios[0].nomePessoa}</span>
                        <span className="texto">"{comentarios[0].texto}"</span>
                    </div>
                    <div className="comentario">
                        <span className="pessoa">{comentarios[1].nomePessoa}</span>
                        <span className="texto">"{comentarios[1].texto}"</span>
                    </div>  
                </div>
                <div className="mensagem">
                    <input type="textarea" name="name" placeholder="Escreva uma comentário..."/>
                </div>
                   
            </div>
        </div>
    )
}