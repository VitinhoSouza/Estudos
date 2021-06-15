import axios from "axios";

export function getProducts(token){
    return axios({
        method:"GET",
        url:"https://localhost:44358/api/produtos",
        headers:{
            "Token":token
        }
    })
}

export function getProductsById(token,id){
    return axios({
        method:"GET",
        url:"https://localhost:44358/api/produtos/"+id,
        headers:{
            "Token":token
        }
    })
}

export function postProducts(token,product){
    return axios({
        method:"POST",
        url:"https://localhost:44358/api/produtos",
        data:product,
        headers:{
            "Token":token
        }
    })
}

export function editProducts(token,id,product){
    return axios({
        method:"PUT",
        url:"https://localhost:44358/api/produtos/"+id,
        data:product,
        headers:{
            "Token":token
        }
    })
}

export function deleteProducts(token,id){
    return axios({
        method:"DELETE",
        url:"https://localhost:44358/api/produtos/"+id,
        headers:{
            "Token":token
        }
    })
}