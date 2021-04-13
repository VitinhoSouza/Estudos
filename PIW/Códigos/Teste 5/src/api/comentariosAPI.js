import axios from "axios";

export function listarComentarios(token,id_post){
    return axios({
        method:"GET",
        url:"http://localhost:8393/api/posts/"+id_post+"/comentarios",
        headers:{
            "token":token,
        },
    })
}

export function inserirComentario(token,comentario){
    return axios({
        method:"POST",
        url:"http://localhost:8393/api/comentarios",
        data:comentario,
        headers:{
            "token":token,
        },
    })
}