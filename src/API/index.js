import axios from "axios";

const API = axios.create({
    baseURL: "https://dummyjson.com",
    headers: {
        "Content-Type": "application/json",
    },
});

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }

);

API.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            window.dispatchEvent(new Event("storage"));
            window.location.href = "/login";    
        }
        return Promise.reject(error);
    }
);

export default API;