//! STATUS: OK
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import Article from '../../../components/Article/Article'
import NoLogin from '../../../components/NoLogin/NoLogin'
import { getArticle } from '../../../actions/ArticleActions'

const AllArticle = ({ user }) => {

    let { deptSlug, subjectSlug } = useParams()
    const [dept, setDept] = useState({})
    const [subject, setSubject] = useState({})
    const [articles, setArticles] = useState([])

    useEffect(() => {
        getArticle(deptSlug, subjectSlug)
            .then(res => {
                // console.log(res)
                setDept(res.data.dept)
                setSubject(res.data.subject)
                setArticles(res.data.articles)
            })
            .catch(error => {
                console.log(error)
                window.location.href = `/article/${deptSlug}`
            })
    }, [])

    if (user){

        // console.log(dept)
        // console.log(subject)
        // console.log(articles)

        return (
            <>
                <h1 className='header' style={{ maxWidth: '1200px', marginBottom: '10px' }}>{ subject.subjectName }</h1>

                <div className='allData'>
                    {
                        articles.map(article => <Article title={article.title} author={article.username} link={`/article/${deptSlug}/${subjectSlug}/${article.slug}`} />)
                    }
                </div>

                <div className='container' style={{ marginTop: '10px' }}>
                    <h1 className='header'>New Article</h1>

                    <div className='content'>
                        <h3 style={{ marginBottom: '20px' }}>
                            Can't see your Article here?
                        </h3>

                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <a href={`/article/${deptSlug}/${subjectSlug}/newArticle`} className='btn btn__secondary'>Create New</a>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <NoLogin />
        )
    }
}

export default AllArticle
