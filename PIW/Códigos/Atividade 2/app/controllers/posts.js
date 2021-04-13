const Post = require("../models/posts")
const Comentario = require("../models/comentarios")
const view = require("../views/posts") 
const viewComentario = require("../views/comentarios") 

module.exports.inserirPost = function(req,res){
    let post = req.body;
    let promisse = Post.create(post);
    promisse.then(function(post){
        res.status(201).json(view.render(post));
    }).catch(function(error){
        res.status(400).json({mensagem:"Ocorreu um erro na sua requisição!"});
    })
}

module.exports.listarPosts = function(req,res){
    let promisse = Post.find().exec();
    promisse.then(function(posts){
        res.status(200).json(view.renderMany(posts));
    }).catch(function(error){
        res.status(500).json({mensagem:"Ocorreu um erro na sua requisição!"});
    })
}

module.exports.obterPost = function(req,res){
    let id = req.params.id;
    let promisse = Post.findById(id).exec();
    promisse.then(function(post){
        res.status(200).json(view.render(post));
    }).catch(function(error){
        res.status(400).json({mensagem:"Ocorreu um erro na sua requisição!"});
    })
}

module.exports.apagarPost = function(req,res){
    let id = req.params.id;
    let promisse = Post.findByIdAndDelete(id);
    promisse.then(function(post){
        res.status(200).json(view.render(post));
    }).catch(function(error){
        res.status(500).json({mensagem:"Ocorreu um erro na sua requisição!"});
    })
}

module.exports.obterComentarios = function(req,res){
    let id = req.params.id;
    let promisse = Comentario.find({post:id});
    promisse.then(function(comentarios){
        res.status(200).json(viewComentario.renderMany(comentarios));
    }).catch(function(error){
        res.status(500).json({mensagem:"Ocorreu um erro na sua requisição!"});
    })
}