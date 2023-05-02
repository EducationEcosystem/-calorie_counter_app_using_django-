import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000/api"
});

// Request interceptor
API.interceptors.request.use((request) => {
    if (localStorage.getItem('token')) {
        request.headers['Authorization'] = `Token ${localStorage.getItem('token')}`;
    }
    return request;
}, 
(error) => {
    return Promise.reject(error);
})

// Response interceptor
API.interceptors.response.use(response => {
    return response;
}, 
(error) => {
    let errMsg = "Something went wrong.";
    if (!error.response.status===500){
        errMsg += JSON.stringify(error.response.data);
    }
    alert(errMsg);
})

export default API;
