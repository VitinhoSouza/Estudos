import "./Post.css"

export function Post({nomePessoa,texto,qtdLikes}){
    return(
        <div className="post">
            <span className="pessoa">{nomePessoa}</span>
            <div className="div-texto">
                <span className="texto">"{texto}"</span>
            </div>
            <div className="linha3">
                <span className="likes">Likes: {qtdLikes}</span>
                <button>Curtir</button>
            </div>
        </div>
    )
}