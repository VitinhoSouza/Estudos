const controller = require("../controllers/posts.js");

module.exports = function(app){
   app.post("/api/posts",controller.inserirPost);
   app.get("/api/posts",controller.listarPosts);
   app.get("/api/posts/:id",controller.obterPost);
   app.delete("/api/posts/:id",controller.apagarPost);
}
