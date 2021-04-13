const controller = require("../controllers/comentarios.js");

module.exports = function(app){
   app.post("/api/comentarios",controller.inserirComentario);
   app.get("/api/comentarios",controller.listarComentarios);
   app.delete("/api/comentarios/:id",controller.apagarComentario);
}

