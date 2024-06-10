import axios from "axios";


const url = 'https://gmail-clone-backend-o2y5.onrender.com'

const headers = (token) => ({
    headers: {
        'Content-Type': 'application/json',
        // Authorization: 'customer' + token
        token : token,
    }
});



// account routes
export const register = (form) => axios.post(`${url}/auth/create`, form);
export const login = (form) => axios.post(`${url}/auth/signin`, form);
export const getUser = (token) => axios.get(`${url}/auth/user`, headers(token));



// email routes
export const getAllEmails = (token) => axios.get(`${url}/email`, headers(token))
export const sendEmail = (token, form) => axios.post(`${url}/save`, form, headers(token));
export const getemailsfromtype = (token,type) => axios.get(`${url}/emails/${type}`, headers(token))