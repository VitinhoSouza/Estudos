let usuarios = [
    {id: 1,nome: "Victor", email: "victor.aefarias@gmail.com", senha: "123"},
    {id: 2,nome: "Victor", email: "victorsouza@alu.ufc", senha: "456"},
    {id: 3,nome: "André", email: "andre.lima@gmail.com", senha: "789"}
];

module.exports.inserirUsuario = function(req,res){
    usuarios.push(req.body);
    res.status(201).json(req.body);
}

module.exports.listarUsuarios = function(req,res){
    let usuarios_retorno = usuarios;
    if(req.query.nome){
        let nome = req.query.nome;
        usuarios_retorno = usuarios_retorno.filter(function(usuario){return usuario.nome == nome})    
    }
    res.json(usuarios_retorno);
}

module.exports.obterUsuario = function(req,res){
    let id = req.params.id;
    let usuario = usuarios.find(function(usuario){return usuario.id==id;});
    if(usuario){
        res.json(usuario);
    }else{
        res.status(404).json({mensagem:"usuario não encontrado!"})
    }
}

module.exports.apagarUsuario = function(req,res){
    let id = req.params.id;
    usuarios = usuarios.filter(function(usuario){return usuario.id!=id});
    res.json({mensagem:"Usuario removido!"});
}