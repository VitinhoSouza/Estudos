//Importando módulo expressa (Padrão CommonJS)
const express = require('express');
const routerUsuarios = require('../app/routes/usuarios.js');
const routerPosts = require('../app/routes/posts.js');
const routerComentarios = require('../app/routes/comentarios.js');
const bodyParser = require("body-parser");

//Exportando o módulo
module.exports = function(){
    let app = express();
    //Definindo variável de aplicação
    app.set("port", 8393);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false })); 
    //middleware (no fundo) 
    app.use(express.static("./public"));
    routerUsuarios(app);
    routerPosts(app);
    routerComentarios(app);
    return app;
}