let posts = [
    {id: 1,texto: "Oi, tudo bem?",likes: "6"},
    {id: 2,texto: "Tudo sim",likes: "5"},
    {id: 3,texto: "Que bom",likes: "10"}
];

module.exports.inserirPost = function(req,res){
    posts.push(req.body);
    res.status(201).json(req.body);
}

module.exports.listarPosts = function(req,res){
    let posts_retorno = posts;
    if(req.query.nome){
        let nome = req.query.nome;
        posts_retorno = posts_retorno.filter(function(posts){return posts.nome == nome})    
    }
    res.json(posts_retorno);
}

module.exports.obterPost = function(req,res){
    let id = req.params.id;
    let post = posts.find(function(post){return post.id==id;});
    if(post){
        res.json(post);
    }else{
        res.status(404).json({mensagem:"post não encontrado!"})
    }
}

module.exports.apagarPost = function(req,res){
    let id = req.params.id;
    posts = posts.filter(function(post){return post.id!=id});
    res.json({mensagem:"Post removido!"});
}