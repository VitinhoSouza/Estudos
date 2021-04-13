const controller = require("../controllers/alunos.js");

module.exports = function(app){
   app.get("/alunos",controller.listarAlunos);
   app.get("/alunos/:id",controller.obterAluno);
   app.post("/alunos",controller.inserirAluno);
   app.delete("/alunos/:id",controller.apagarAluno);
}
