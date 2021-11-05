import React, { useState, useEffect } from 'react'
import { TextField } from '@material-ui/core'

import { newDept, getAllDepts } from '../../Actions/ArticleActions'
import Department from '../../Components/Article/Department/Department'
import './general.css'

import deptSVG from '../../SVG/Department.svg'

const AllDept = ({ user }) => {
    const [depts, setDepts] = useState([])
    const [formVisible, setFormVisible] = useState(0)
    const [postData, setPostData] = useState({
        deptName: ''
    })
    const inputVariant = 'standard'
    const inputStyle = {
        marginBottom: '10px'
    }

    useEffect(() => {
        getAllDepts()
            .then(res => {
                setDepts(res.data)
            })
            .catch (error => {
                alert('Snap! Something went wrong! X(')
                console.log(error)
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        newDept(postData)
            .then(res => {
                window.location.reload()
            })
            .catch (error => {
                alert('Snap! Something went wrong! X(')
                console.log(error)
            })
    }

    return (
        <div className='card__wrapper fdc'>
            <div className="card mh0 fdc ep">
                <div className="card__title">
                    Departments
                </div>
                <div className="card__subtitle">
                    Here is a list of all the departments created till now
                </div>
                <div className="article__list__container">
                {
                    depts.map((dept, index) => (
                        <Department key={index} deptName={dept.deptName} to={`/article/${dept.deptSlug}`} />
                    ))
                }
                </div>
            </div>

            <div className="card mh0" style={{ marginTop: '20px' }}>
                <div className="card__left">
                    <img src={deptSVG} alt="" className="svg__img" />
                </div>
                <div className="card__right">
                    <div className="card__title">New Department</div>
                    {
                        formVisible ? (
                            <>
                                <form onSubmit={handleSubmit} className="auth__form">
                                    <TextField style={inputStyle} type='text' name='deptName' variant={inputVariant} label='Department Name' required fullWidth value={postData.deptName} onChange={(e) => setPostData({ deptName: e.target.value })} />
                                    <div className="btn__container">
                                        <button className="btn btn-1" type='submit'>Submit</button>
                                        <button className="btn btn-3" onClick={() => setFormVisible(0)}>Cancel</button>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <>
                                <div className="card__subtitle">
                                    &emsp;Don't see your department? Don't worry!
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

export default AllDept
