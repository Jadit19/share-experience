import axios from 'axios'
export const API = axios.create({ baseURL: 'http://localhost:5000' })

export const newDept = (deptData) => API.post('/article/newDept', deptData)
export const getAllDept = () => API.get('/article')

export const getSubject = (deptSlug) => API.get(`/article/${deptSlug}`)
export const newSubject = (subjData) => API.post(`/article/${subjData.deptSlug}/newSubject`, subjData)

export const getArticle = (deptSlug, subjectSlug) => API.get(`/article/${deptSlug}/${subjectSlug}`)
export const newArticle = (articleData) => API.post(`/article/${articleData.deptSlug}/${articleData.subjectSlug}/newArticle`, articleData)

export const showArticle = (deptSlug, subjectSlug, articleSlug) => API.get(`/article/${deptSlug}/${subjectSlug}/${articleSlug}`)
export const editArticle = (articleData) => API.post(`/article/${articleData.deptSlug}/${articleData.subjectSlug}/${articleData.articleSlug}/edit`, articleData)
export const newComment = (commentData) => API.post(`/article/${commentData.deptSlug}/${commentData.subjectSlug}/${commentData.articleSlug}/newComment`, commentData)

export const deleteArticle = (articleData) => API.post('/article/delete', articleData)
export const likeArticle = (articleData) => API.post('/article/like', articleData)