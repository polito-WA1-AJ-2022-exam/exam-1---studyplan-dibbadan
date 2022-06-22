import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import AddForm from './AddForm';
import API from '../API';

export default function CreatePlan(props) {

    const [option, setOption] = useState([]);



    async function handleSelect(event) {
        let option = {};
        if (event.target.value === 'full') {
            option = { 'type': 'full', 'min': 60, 'max': 80 };
        } else {
            option = { 'type': 'part', 'min': 20, 'max': 40 };
        }

        const response = await API.studyPlanInit(option);

        setOption([option.min, option.max]);
    }

    async function getOption() {
        const response = await API.getOption();
        if (response.length > 0) {
            setOption([response[0].min, response[0].max]);
        } else {
            setOption([]);
        }
    }


    useEffect(() => {
        getOption();
    }, []);


    return (
        <>
            {option.length <= 0 ?
                <div className='container mt-5'>
                    <div>
                        <Form.Select onChange={handleSelect}>
                            <option>Select Study Plan type ...</option>
                            <option value='full'>Full-Time</option>
                            <option value='part'>Part-Time</option>
                        </Form.Select>
                    </div>
                </div>
                : <AddForm mode={props.mode} hasStudyPlan={props.hasStudyPlan} setHasStudyPlan={props.setHasStudyPlan} loggedUser={props.loggedUser} setOption={setOption} option={option} courses={props.courses} />
            }
        </>

    )


}




