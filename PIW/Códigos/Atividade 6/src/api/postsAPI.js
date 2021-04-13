import axios from "axios";

export function listarPosts(token){
    return axios({
        method:"GET",
        url:"http://localhost:8393/api/posts",
        headers:{
            "token":token,
        },
    })
}

export function inserirPost(token,post){
    return axios({
        method:"POST",
        url:"http://localhost:8393/api/posts",
        data:post,
        headers:{
            "token":token,
        },
    })
}