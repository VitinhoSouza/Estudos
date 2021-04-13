const { mapReduce } = require("../models/posts");

function render(comentario){
    return{
        id:comentario.id,
        texto:comentario.texto,
        usuario:comentario.usuario,
        post:comentario.post
    }
}

module.exports.render = render;

function renderMany(comentarios){
    return comentarios.map(render);
}

module.exports.renderMany = renderMany;