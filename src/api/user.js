import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

export async function login({username, password}) {
    const response = await axios.post(baseUrl + "/api/auth/login", {username, password});
    return response.data
}

export async function signup({username, password}) {
    const response = await axios.post(baseUrl + "/api/auth/register", {username, password});
    return response.data
}