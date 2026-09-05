import axios from "axios";
const api = axios.create({
    baseURL:"http://localhost:3000/api/auth/",
    withCredentials:true
})

export const registerUser=async(username,email,password)=>{
    const response = await api.post("/register",{username,email,password})

    return response
}

export const  loginUser=async(username,password)=>{
    const response = await api.post("/login",{username,password})

    return response
}