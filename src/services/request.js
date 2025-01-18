import axios from "axios";

const request = axios.create({
    baseURL: "https://frontend-take-home-service.fetch.com",
    timeout: 10000,
    withCredentials: true,
})


request.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (error.response?.status === 401) {
            window.location.href = "/login"
          }
        return Promise.reject(error);
    }
);

export default request;