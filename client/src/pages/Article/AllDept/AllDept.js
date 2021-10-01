//! STATUS: OK
import React, { useState, useEffect } from 'react'

import Department from '../../../components/Department/Department'
import { getAllDept } from '../../../actions/ArticleActions'

import NoLogin from '../../../components/NoLogin/NoLogin'

const AllDept = ({ user }) => {

    const [depts, setDepts] = useState([])
    
    useEffect(() => {
        getAllDept()
            .then(res => {
                // console.log(res.data)
                setDepts(res.data)
            })
    }, [])

    if (user){

        // console.log(depts)

        return (
            <>
                <div className='allData'>
                    {
                        depts.map(dept => <Department deptName={dept.deptName} link={`/article/${dept.slug}`} />)
                    }
                </div>

                <div className='container' style={{ marginTop: '10px', justifyContent: 'normal' }}>
                    <h1 className='header'>New Department</h1>

                    <div className='content'>
                        <h3 style={{ marginBottom: '20px' }}>
                            Can't see your department here?
                        </h3>

                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <a href='/article/newDept' className='btn btn__secondary'>Create New</a>
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

export default AllDept
