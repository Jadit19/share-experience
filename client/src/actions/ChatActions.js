import { API } from "../config";

//! Create
export const newConversation = (postData) => API.post('/chat/new/conversation', postData)
export const newMessage = (postData) => API.post('/chat/new/message', postData)

//! Read..
export const getConversations = (postData) => API.get(`/chat/view/conversation/${postData.userId}`)
export const getMessages = (postData) => API.get(`/chat/view/messages/${postData.convId}/${postData.userId}`)