import { API } from "../config";

export const uploadFile = (postData) => API.post('/uploadFile', (postData))