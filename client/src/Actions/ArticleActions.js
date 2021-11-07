import { API } from '../config'

//! Create
export const newDept = (deptData) => API.post('/article/new/dept', deptData)
export const newSubject = (subjectData) => API.post('/article/new/subject', subjectData)
export const newArticle = (articleData) => API.post('/article/new/article', articleData)
export const newComment = (commentData) => API.post('/article/new/comment', commentData)

//! Read
export const getAllDepts = () => API.get('/article/view/allDepts')
export const getAllSubjects = (postData) => API.get(`/article/view/allSubjects/${postData.deptSlug}`)
export const getAllArticles = (postData) => API.get(`/article/view/allArticles/${postData.deptSlug}/${postData.subjectSlug}`)
export const getOneArticle = (postData) => API.get(`/article/view/article/${postData.deptSlug}/${postData.subjectSlug}/${postData.articleSlug}`)
export const getAllComments = (postData) => API.get(`/article/view/allComments/${postData.articleId}`)

//! Update
export const editArticle = (articleData) => API.put('/article/edit/article', articleData)
export const editComment = (commentData) => API.put('/article/edit/comment', commentData)
export const likeArticle = (likeData) => API.put('/article/edit/likeArticle', likeData)

//! Delete
export const deleteArticle = (articleData) => API.delete(`/article/delete/article/${articleData.articleId}/${articleData.userId}`)
export const deleteComment = (commentData) => API.delete(`/article/delete/comment/${commentData.commentId}/${commentData.userId}`)