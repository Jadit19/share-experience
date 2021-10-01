//! STATUS: OK
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import Subject from '../../../components/Subject/Subject'
import NoLogin from '../../../components/NoLogin/NoLogin'
import { getSubject } from '../../../actions/ArticleActions'

const AllSubject = ({ user }) => {

    let { deptSlug } = useParams()

    const [dept, setDept] = useState({})
    const [subjects, setSubjects] = useState([])

    useEffect(() => {
        getSubject(deptSlug)
            .then(res => {
                // console.log(res.data)
                setDept(res.data.dept)
                setSubjects(res.data.subjects)
            })
            .catch((error) => {
                console.log(error)
                window.location.href = '/article'
            })
    }, [])

    if (user){

        // console.log(dept)
        // console.log(subjects)

        return (
            <>
                <h1 className='header' style={{ maxWidth: '1200px', marginBottom: '10px' }}>{ dept.deptName }</h1>

                <div className='allData'>
                    {
                        subjects.map(subject => <Subject subjectName={subject.subjectName} link={`/article/${deptSlug}/${subject.slug}`} />)
                    }
                </div>

                <div className='container' style={{ marginTop: '10px' }}>
                    <h1 className='header'>New Subject</h1>

                    <div className='content'>
                        <h3 style={{ marginBottom: '20px' }}>
                            Can't see your subject here?
                        </h3>

                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <a href={`/article/${deptSlug}/newSubject`} className='btn btn__secondary'>Create New</a>
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

export default AllSubject
