import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { TextField } from '@material-ui/core'

import { getAllArticles, newArticle } from '../../Actions/ArticleActions'
import Article from '../../Components/Article/Article/Article'
import './general.css'

import articleSVG from '../../SVG/Article.svg'

const AllArticles = ({ user }) => {
    const { deptSlug, subjectSlug } = useParams()
    const [articles, setArticles] = useState([])
    const [formVisible, setFormVisible] = useState(0)
    const [postData, setPostData] = useState({
        deptSlug: deptSlug,
        subjectSlug: subjectSlug,
        articleName: '',
        content: '',
        authorName: user.userName,
        authorId: user._id
    })
    const inputVariant = 'standard'
    const inputStyle = {
        marginBottom: '10px'
    }

    useEffect(() => {
        getAllArticles({
            deptSlug: deptSlug,
            subjectSlug: subjectSlug
        })
            .then(res => {
                setArticles(res.data)
            })
            .catch(error => {
                console.log(error)
                window.location.reload = `/article/${deptSlug}`
            })
    }, [deptSlug, subjectSlug])

    const handleSubmit = (e) => {
        e.preventDefault()
        newArticle(postData)
            .then(res => {
                window.location.reload()
            })
            .catch(error => {
                alert('Snap! Something went wrong! X(')
                console.log(error)
            })
    }

    return (
        <div className="card__wrapper fdc">
            <div className="card mh0 fdc ep">
                <div className="card__title">Articles</div>
                <div className="card__subtitle">
                    Displaying all articles of ./<a href='/article' className='over__link'>article</a>/<a href={`/article/${deptSlug}`} className='over__link'>{ deptSlug }</a>/<a href={`/article/${deptSlug}/${subjectSlug}`} className='over__link'>{ subjectSlug }</a>
                </div>
                <div className="article__list__container">
                {
                    articles.map((article, index) => (
                        <Article key={index} title={article.articleName} author={article.authorName} to={`/article/${deptSlug}/${subjectSlug}/${article.articleSlug}`} />
                    ))
                }
                </div>
            </div>

            <div className="card mh0" style={{ marginTop: '20px' }}>
                <div className="card__left">
                    <img src={articleSVG} alt="" className='svg__img' style={{ width: '80%', height: '80%', transform: 'scale(1.25)' }} />
                </div>
                <div className="card__right">
                    <div className="card__title">New Article</div>
                    {
                        formVisible ? (
                            <>
                                <form onSubmit={handleSubmit} className="auth__form">
                                    <TextField style={inputStyle} type='text' name='articleName' variant={inputVariant} label='Article Name' required fullWidth value={postData.articleName} onChange={(e) => setPostData({ ...postData, articleName: e.target.value })} />
                                    <TextField style={inputStyle} type='text' name='content' variant={inputVariant} label='Content' required fullWidth value={postData.content} onChange={(e) => setPostData({ ...postData, content: e.target.value })} />
                                    <div className="btn__container">
                                        <button className="btn btn-1" type='submit'>Submit</button>
                                        <button className="btn btn-3" onClick={() => setFormVisible(0)}>Cancel</button>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <>
                                <div className="card__subtitle">
                                    &emsp;Have more information on this course? Share with everyone!
                                </div>
                                <div className="btn__container">
                                    <button className="btn btn-3" onClick={() => setFormVisible(1)}>Create New</button>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default AllArticles
