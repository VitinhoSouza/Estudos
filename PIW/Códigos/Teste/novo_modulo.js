function somar(a,b){
    return a+b;
}

let s = "string a ser exportada"
let o = {"nome":"Vitinho", "camisa":"10"};

module.exports.somar = somar;
module.exports.s = s;
module.exports.obj = o;