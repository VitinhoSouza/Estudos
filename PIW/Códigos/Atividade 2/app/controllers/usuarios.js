const Usuario = require("../models/usuario")
const Post = require("../models/posts")
const view = require("../views/usuarios") 
const viewPost = require("../views/posts")

module.exports.inserirUsuario = function(req,res){
    let usuario = req.body;
    let promisse = Usuario.create(usuario);
    promisse.then(function(usuario){
        res.status(201).json(view.render(usuario));
    }).catch(function(error){
        res.status(400).json({mensagem:"Ocorreu um erro na sua requisição!"});
    })
}

module.exports.listarUsuarios = function(req,res){
    let promisse = Usuario.find().exec();
    promisse.then(function(usuarios){
        res.status(200).json(view.renderMany(usuarios));
    }).catch(function(error){
        res.status(500).json({mensagem:"Ocorreu um erro na sua requisição!"});
    })
}

module.exports.obterUsuario = function(req,res){
    let id = req.params.id;
    let promisse = Usuario.findById(id).exec();
    promisse.then(function(usuario){
        res.status(200).json(view.render(usuario));
    }).catch(function(error){
        res.status(400).json({mensagem:"Ocorreu um erro na sua requisição!"});
    })
}

module.exports.apagarUsuario = function(req,res){
    let id = req.params.id;
    let promisse = Usuario.findByIdAndDelete(id);
    promisse.then(function(usuario){
        res.status(200).json(view.render(usuario));
    }).catch(function(error){
        res.status(500).json({mensagem:"Ocorreu um erro na sua requisição!"});
    })
    
}

module.exports.obterPosts = function(req,res){
    let id = req.params.id;
    let promisse = Post.find({usuario:id});
    promisse.then(function(posts){
        res.status(200).json(viewPost.renderMany(posts));
    }).catch(function(error){
        res.status(500).json({mensagem:"Ocorreu um erro na sua requisição!"});
    })
}