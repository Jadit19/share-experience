import axios from 'axios'
export const API = axios.create({ baseURL: 'http://localhost:5000' })

export const signUp = (userData) => API.post('/user/signUp', userData)
export const login = (userData) => API.post('/user/login', userData)
export const changePass = (userData) => API.post('/user/changePassword', userData)
export const forgotPass = (userData) => API.post('/user/forgotPass', userData)