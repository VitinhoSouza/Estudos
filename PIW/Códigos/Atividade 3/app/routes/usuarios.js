const controller = require("../controllers/usuarios.js");
const controllerAuth = require("../controllers/auth.js");

module.exports = function(app){
   //Métodos dos Usuários
   app.post("/api/usuarios",controller.inserirUsuario);
   app.post("/api/usuarios/signin",controllerAuth.logar);
   app.use("/api/usuarios",controllerAuth.checar);
   app.get("/api/usuarios",controller.listarUsuarios);
   app.get("/api/usuarios/:id/posts",controller.obterPosts)
   app.get("/api/usuarios/:id",controller.obterUsuario);
   app.delete("/api/usuarios/:id",controller.apagarUsuario);

}
