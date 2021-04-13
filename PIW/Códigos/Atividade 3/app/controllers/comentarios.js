const Comentario = require("../models/comentarios")
const view = require("../views/comentarios") 
const jwt = require("jsonwebtoken")

module.exports.inserirComentario = function(req,res){
    let texto = req.body.texto;
    let post = req.body.post;
    let token = req.headers.token;
    let payload = jwt.decode(token);
    let id_usuario_logado = payload.id;

    console.log(req.body);

    let promisse = Comentario.create({texto:texto,usuario:id_usuario_logado,post:post});
    promisse.then(function(comentario){
        res.status(201).json(view.render(comentario));
    }).catch(function(error){
        res.status(400).json({mensagem:"Ocorreu um erro na sua requisição!"});
    })
}

module.exports.listarComentarios = function(req,res){
    let token = req.headers.token;
    let payload = jwt.decode(token);
    let id_usuario_logado = payload.id;
    let promisse = Comentario.find({usuario:id_usuario_logado}).exec();
    promisse.then(function(comentarios){
        res.status(200).json(view.renderMany(comentarios));
    }).catch(function(error){
        res.status(500).json({mensagem:"Ocorreu um erro na sua requisição!"});
    })
}

module.exports.apagarComentario = function(req,res){
    let token = req.headers.token;
    let payload = jwt.decode(token);
    let id_usuario_logado = payload.id;
    let id_comentario = req.params.id;

    let criterio = {$and:[{_id:{$eq:id_comentario}},{usuario:{$eq:id_usuario_logado}}]};
    let promisse = Comentario.findOneAndDelete(criterio);

    promisse.then(function(comentario){
        if(comentario !== null){
            res.status(200).json(view.render(comentario));
        }else{
            res.json({mensagem:"Ocorreu um erro na sua requisição!"});
        }
    }).catch(function(error){
        res.status(500).json({mensagem:"Ocorreu um erro na sua requisição!"});
    })
    
}