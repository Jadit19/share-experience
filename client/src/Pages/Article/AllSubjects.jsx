import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { TextField } from '@material-ui/core'

import { getAllSubjects, newSubject } from '../../Actions/ArticleActions'
import Subject from '../../Components/Article/Subject/Subject'
import './general.css'

import subjectSVG from '../../SVG/Subject.svg'

const AllSubjects = ({ user }) => {
    const { deptSlug } = useParams()
    const [subjects, setSubjects] = useState([])
    const [formVisible, setFormVisible] = useState(0)
    const [postData, setPostData] = useState({
        deptSlug: deptSlug,
        subjectName: ''
    })
    const inputVariant = 'standard'
    const inputStyle = {
        marginBottom: '10px'
    }

    useEffect(() => {
        const getData = {
            deptSlug: deptSlug
        }
        getAllSubjects(getData)
            .then(res => {
                setSubjects(res.data)
            })
            .catch(error => {
                console.log(error)
                window.location.href = `/article`
            })
    }, [deptSlug])

    const handleSubmit = (e) => {
        e.preventDefault()
        newSubject(postData)
            .then(res => {
                window.location.reload()
            })
            .catch(error => {
                alert('Snap! Something went wrong! X(')
                console.log(error)
            })
    }

    return (
        <div className='card__wrapper fdc'>
            <div className="card mh0 fdc ep">
                <div className="card__title">Subjects</div>
                <div className='card__subtitle'>Displaying all subjects of ./<a href='/article' className='over__link'>article</a>/<a href={`/article/${deptSlug}`} className='over__link'>{ deptSlug }</a></div>
                <div className="article__list__container">
                {
                    subjects.map((subject, index) => (
                        <Subject key={index} subjectName={subject.subjectName} to={`/article/${deptSlug}/${subject.subjectSlug}`} />
                    ))
                }
                </div>
            </div>

            <div className="card mh0" style={{ marginTop: '20px' }}>
                <div className="card__left">
                    <img src={subjectSVG} alt="" className='svg__img' style={{ width: '80%', height: '80%', transform: 'scale(1.25)' }} />
                </div>
                <div className="card__right">
                    <div className="card__title">New Subject</div>
                    {
                        formVisible ? (
                            <>
                                <form onSubmit={handleSubmit} className="auth__form">
                                    <TextField style={inputStyle} type='text' name='subjectName' variant={inputVariant} label='Subject Name' required fullWidth value={postData.subjectName} onChange={(e) => setPostData({ ...postData, subjectName: e.target.value })} />
                                    <div className="btn__container">
                                        <button className="btn btn-1" type='submit'>Submit</button>
                                        <button className="btn btn-3" onClick={() => setFormVisible(0)}>Cancel</button>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <>
                                <div className="card__subtitle">
                                    Don't see your subject? Don't worry!
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

export default AllSubjects
