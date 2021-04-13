import axios from "axios";

export function login(login_data){
    return axios({
        method:"POST",
        url:"http://localhost:8393/api/usuarios/signin",
        //windows + r ->  chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security
        data:login_data,
    })
}

export function cadastrar(usuario){
    return axios({
        method:"POST",
        url:"http://localhost:8393/api/usuarios",
        data:usuario,
    })
}