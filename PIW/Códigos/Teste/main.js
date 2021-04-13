/*const novo_modulo = require("./novo_modulo")

console.log("Eai")
console.log(novo_modulo)
console.log(novo_modulo.somar(2,3))
console.log(novo_modulo.s)
console.log(novo_modulo.obj)
console.log(novo_modulo.obj.nome)
console.log(novo_modulo.obj.camisa)*/

const http = require("http")
const app = require("./config/express")()
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express Server escutando na porta '+app.get('port'));
});
 