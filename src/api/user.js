import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

export async function login({username, password}) {
    try {
        const response = await axios.post(baseUrl + "/api/users/login", {username, password});
        return response.data
    } catch (err) {
        alert(err)
    }
}

export async function signup({username, password}) {
    try {
        const response = await axios.post(baseUrl + "/api/users/signup", {username, password});
        return response.data
    } catch (err) {
        alert(err)
    }
}