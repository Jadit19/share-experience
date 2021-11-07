import { API } from "../config";

//! '/auth' routes
export const registerUser = (postData) => API.post('/auth/register', postData)
export const loginUser = (postData) => API.post('/auth/login', postData)
export const forgotPass = (userData) => API.post('/auth/forgotPass', userData)

//! '/user' routes
export const getUser = (postData) => API.get(`/user/profile/${postData.userName}`)
export const deleteUser = (postData) => API.delete(`/user/${postData.id}`)
export const updateUser = (postData) => API.put(`/user/${postData.id}`, postData)