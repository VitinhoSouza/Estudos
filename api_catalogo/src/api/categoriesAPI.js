import axios from "axios";

export function getCategories(token){
    return axios({
        method:"GET",
        url:"https://localhost:44358/api/categorias",
        headers:{
            "Token":token
        },
        params:{
            "pageNumber":3,
            "pageSize":1
        }
    })
}

export function getCategoriesById(token,id){
    return axios({
        method:"GET",
        url:"https://localhost:44358/api/categorias/"+id,
        headers:{
            "Token":token
        }
    })
}

export function postCategories(token,category){
    return axios({
        method:"POST",
        url:"https://localhost:44358/api/categorias",
        data:category,
        headers:{
            "Token":token
        }
    })
}

export function editCategories(token,id,category){
    return axios({
        method:"PUT",
        url:"https://localhost:44358/api/categorias/"+id,
        data:category,
        headers:{
            "Token":token
        }
    })
}

export function deleteCategories(token,id){
    return axios({
        method:"DELETE",
        url:"https://localhost:44358/api/categorias/"+id,
        headers:{
            "Token":token
        }
    })
}
