//Importando módulo expressa (Padrão CommonJS)
const express = require('express');
const routerAlunos = require('../app/routes/alunos.js');
const bodyParser = require("body-parser");

//Exportando o módulo
module.exports = function(){
    let app = express();
    //Definindo variável de aplicação
    app.set("port", 8394);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false })); 
    //middleware (no fundo) 
    app.use(express.static("./public"));
    routerAlunos(app);
    return app;
}