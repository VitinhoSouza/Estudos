const mongoose = require("mongoose");

module.exports = function(){
    let schema = mongoose.Schema({
        texto:{
            type: "String",
            required:true,
        },
        usuario:{
            type:mongoose.Schema.ObjectId,
            ref:"Usuarios"
        },
        post:{
            type:mongoose.Schema.ObjectId,
            ref:"Posts"
        },  
    })
    return mongoose.model("Comentarios",schema);
}();