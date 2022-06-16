import React, { useEffect, useState } from 'react'
import CoursesTable from './CoursesTable'
import { Button, Form } from 'react-bootstrap'
import AddForm from './AddForm';
import StudyPlan from './StudyPlan';
import API from '../API';

export default function CreatePlan(props) {

    const [option, setOption] = useState([]);


   
    async function handleSelect(event) {
        let option = {};
        if(event.target.value === 'full') {
            option = {'type':'full', 'min':60, 'max':80};
        } else {
            option = {'type':'part', 'min':20, 'max':40};
        }
        
        const response = await API.studyPlanInit(option);
        
        setOption([option.min, option.max]);
    }

    async function getOption() {
        const response = await API.getOption();
        if(response.length > 0) {
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




    // const [show, setShow] = useState(true);

    // function handleOption(event) {
    //     if(event.target.value === 'full') {
    //         setOption([60,80]);
    //     } else {
    //         setOption([20,40])
    //     }
    //     setShow(false);
    // }

   

    // return (
    //     <div className='container mt-5'>

            
    //         <div>
            
    //             { show ? 
    //                 <div>
    //                 <Form.Select onChange={handleOption} aria-label="Default select example">
    //                     <option value="">Choose one type ...</option>
    //                     <option value="full">Full-Time</option>
    //                     <option value="part">Part-Time</option>
    //                 </Form.Select>
    //                 </div>
    //                 : <AddForm option={option} courses={props.courses}/> 
    //             }

                
                
    //         </div>





    //     </div>
    // )