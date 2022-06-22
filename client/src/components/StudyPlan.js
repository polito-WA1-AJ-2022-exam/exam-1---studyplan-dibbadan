import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import AddedCourses from './AddedCourses'
import API from '../API';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StudyPlan(props) {

    const navigate = useNavigate();

    const [myPlan, setPlan] = useState([]);

    async function getStudyPlan() {
        const studyPlan = await API.getUserStudyPlan();
        if (studyPlan) {
            setPlan(studyPlan);
        }

    }

    async function destroyPlan() {

        const response = await API.destroyStudyPlan(myPlan);
        if (response) {
            setPlan([]);
            window.location.reload();
        }
    }



    useEffect(() => {
        getStudyPlan();
    }, [])

    return (
        <>

            <div className='container mt-5 mb-5 ml-auto'>
                <tr>
                    <td>
                        <Button onClick={() => navigate('/edit')} variant='warning'>Edit Plan</Button>

                        <Button disabled={myPlan.length === 0 ? true : false} style={{ 'marginLeft': 5 }} onClick={destroyPlan} variant='danger'>Destroy Plan</Button>
                    </td>
                </tr>
                <AddedCourses studyPlan={myPlan} />
            </div>
        </>

    )
}
