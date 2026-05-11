/// API LAYER //

import axios from "axios"

// create an api
const api = axios.create({
    baseURL: "https://moodify-music-recommendation-backend.onrender.com",
    withCredentials: true
})

// REGISTER
export async function register({email, password, username}) {
    const response = await api.post("/api/auth/register", {
        email, password, username
    })

    return response.data 
}

// LOGIN
export async function login({email, password}) {
    try{
        const response = await api.post("/api/auth/login", {
            email, password
        })

        return response.data
    }
    catch(err) {
        console.log("Backend Error:", err.response?.data)
        // console.log(email, password)
        throw err
    }
}

// GET-ME 
export async function getMe() {
    const response = await api.get("/api/auth/get-me")
    console.log(response.data);
    return response.data
}

// LOGOUT
export async function logout() {
    const response = await api.get("/api/auth/logout")

    return response.data
}

