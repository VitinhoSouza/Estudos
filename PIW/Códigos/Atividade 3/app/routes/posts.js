const controller = require("../controllers/posts.js");
const controllerAuth = require("../controllers/auth.js");

module.exports = function(app){
   app.use("/api/posts",controllerAuth.checar);
   app.post("/api/posts",controller.inserirPost);
   app.get("/api/posts",controller.listarPosts);
   app.get("/api/posts/:id",controller.obterPost);
   app.get("/api/posts/:id/comentarios",controller.obterComentarios);
   app.delete("/api/posts/:id",controller.apagarPost);
}
