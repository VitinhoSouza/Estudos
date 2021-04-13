const Comentario = require("../models/comentarios")
const view = require("../views/comentarios") 

module.exports.inserirComentario = function(req,res){
    let comentario = req.body;
    let promisse = Comentario.create(comentario);
    promisse.then(function(comentario){
        res.status(201).json(view.render(comentario));
    }).catch(function(error){
        res.status(400).json({mensagem:"Ocorreu um erro na sua requisição!"});
    })
}

module.exports.listarComentarios = function(req,res){
    let promisse = Comentario.find().exec();
    promisse.then(function(comentarios){
        res.status(200).json(view.renderMany(comentarios));
    }).catch(function(error){
        res.status(500).json({mensagem:"Ocorreu um erro na sua requisição!"});
    })
}

module.exports.apagarComentario = function(req,res){
    let id = req.params.id;
    let promisse = Comentario.findByIdAndDelete(id);
    promisse.then(function(comentario){
        res.status(200).json(view.render(comentario));
    }).catch(function(error){
        res.status(500).json({mensagem:"Ocorreu um erro na sua requisição!"});
    })
    
}