import axios from "axios";

export function registerUser(user){
    return axios({
        method:"POST",
        url:"https://localhost:44358/api/autoriza/register",
        data:user
    })
}

export function login(user){
    return axios({
        method:"POST",
        url:"https://localhost:44358/api/autoriza/login",
        data:user
    })
}

//windows + r ->  chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security
