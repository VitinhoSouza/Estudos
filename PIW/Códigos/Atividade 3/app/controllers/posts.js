const Post = require("../models/posts")
const Comentario = require("../models/comentarios")
const view = require("../views/posts") 
const viewComentario = require("../views/comentarios") 
const jwt = require("jsonwebtoken")

module.exports.inserirPost = function(req,res){
    let texto = req.body.texto;
    let likes = req.body.likes;
    let token = req.headers.token;
    let payload = jwt.decode(token);
    let id_usuario_logado = payload.id;

    //console.log(texto,likes,id_usuario_logado);

    let promisse = Post.create({texto: texto, likes: likes, usuario: id_usuario_logado});
    promisse.then(function(post){
        res.status(201).json(view.render(post));
    }).catch(function(error){
        res.status(400).json({mensagem:"Ocorreu um erro na sua requisição!"});
    })
}

module.exports.listarPosts = function(req,res){
    // Restrição para usuários terem acesso apenas à posts que são seus
    // let token = req.headers.token;
    // let payload = jwt.decode(token);
    // let id_usuario_logado = payload.id;
    // let promisse = Post.find({usuario:id_usuario_logado}).exec();
    let promisse = Post.find().populate('usuario').exec();
    promisse.then(function(posts){
        res.status(200).json(view.renderMany(posts));
    }).catch(function(error){
        res.status(500).json({mensagem:"Ocorreu um erro na sua requisição!"});
    })
}

module.exports.obterPost = function(req,res){
    let id = req.params.id;
    let promisse = Post.findById(id).populate().exec();
    promisse.then(function(post){
        res.status(200).json(view.render(post));
    }).catch(function(error){
        res.status(400).json({mensagem:"Ocorreu um erro na sua requisição!"});
    })
}

module.exports.apagarPost = function(req,res){
    let token = req.headers.token;
    let payload = jwt.decode(token);
    let id_usuario_logado = payload.id;
    let id_post = req.params.id;

    let criterio = {$and:[{_id:{$eq:id_post}},{usuario:{$eq:id_usuario_logado}}]};
    let promisse = Post.findOneAndDelete(criterio);
    
    promisse.then(function(post){
        if(post !== null){
            res.status(200).json(view.render(post));
        }else{
            res.json({mensagem:"Ocorreu um erro na sua requisição!"});
        }
    }).catch(function(error){
        res.status(500).json({mensagem:"Ocorreu um erro na sua requisição!"});
    })
}

module.exports.obterComentarios = function(req,res){
    let id = req.params.id;
    let promisse = Comentario.find({post:id}).populate('usuario');
    promisse.then(function(comentarios){
        res.status(200).json(viewComentario.renderMany(comentarios));
    }).catch(function(error){
        res.status(500).json({mensagem:"Ocorreu um erro na sua requisição!"});
    })
}