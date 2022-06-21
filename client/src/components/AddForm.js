import React, { useEffect, useState } from 'react'
import CoursesTable from './CoursesTable';
import { Button, Table, Row, Col, Card, Form, Alert } from 'react-bootstrap';
import API from '../API';
import AddedCourses from './AddedCourses';
import CreatePlan from './CreatePlan';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import StudyPlan from './StudyPlan';
import AlertModal from './AlertModal';
import CourseRow from './CourseRow';
import "bootstrap/dist/css/bootstrap.css";
import CoursesList from './CoursesList';


export default function AddForm(props) {

    const navigate = useNavigate();

    const [credits, setCredits] = useState(0);
    const [enableSave, setEnableSave] = useState(false);
    const [studyPlan, setStudyPlan] = useState([]);
    const [selected, setSelected] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const clearAll = async () => {
        setStudyPlan([]);
        setSelected([]);
        setCredits(0);
    }


    async function getStudyPlan() {
        const response = await API.getUserStudyPlan();
        if (response) {
            setStudyPlan(response);
            let codes = [];
            let total_credits = 0;
            response.forEach((c) => {
                codes.push(c.Code);
                total_credits += c.Credits;
            })

            setSelected(codes);
            setCredits(total_credits);
            setEnableSave(true);
        }

    }

    async function saveStudyPlan() {
        const old_sp = await API.getUserStudyPlan();
        // if (old_sp.length > 0) {
        //     await API.destroyStudyPlan(old_sp);
        // }
        // const response = await API.addStudyPlan(studyPlan);
        const newSP = studyPlan.filter((c) => !old_sp.includes(c));
        const response = await API.addStudyPlan(newSP);
        if (response) {
            studyPlan.forEach(async (c) => {
                await API.updateEnrollments(c.Code);
            })
        }
        if (response && props.hasStudyPlan === false) {
            props.setHasStudyPlan(true);
            // navigate('/my-study-plan')
            navigate('/')
        } else {
            navigate('/')
            // navigate('/my-study-plan')
        }
    }


    // const add = async (course) => {

    //     // Check incompatible course
    //     await check_inc(course);
        
    //     // Check if I need preparatory course
    //     await prep_course(course);

        
    // }


    async function add(course) {

        // Check multiple add of the same course
        let res = await check_multiple_add(course);
        let ret = 0;

        if(res) {
            // Check incompatible course
            ret += await check_inc(course);
            // Check if I need preparatory course
            ret += await prep_course(course);
            // Check if I can enroll
            ret += await can_i_enroll(course);

            if(ret > 0) {
                setStudyPlan([...studyPlan, course]);
                setSelected([...selected, course.Code]);
                setCredits(credits + course.Credits);
                if (credits + course.Credits >= props.option[0] && credits + course.Credits <= props.option[1]) {
                    setEnableSave(true);
                } else {
                    setEnableSave(false);
                }
            }

        }
        

        

        
    }

    async function check_multiple_add(course) {
        if(studyPlan.includes(course)) {
            setError(course.Code);
            setMessage(`The course ${course.Code} has already been included in the study plan`);
            return false;
        } 

        return true;
    }

    async function check_inc(course) {
        let compatible, val;
        let n=0;

        
        // Check if code is incompatible with what is present in the Study Plan
        if(course.Incompatible_Courses === null) {
            compatible=true;
        } else {
           course.Incompatible_Courses.forEach((inc) => {
                if(selected.includes(inc)) {
                    n++;
                    val = inc;
                    //setMessage(`Course ${course.Code} is incompatible with ${inc}`)
                    compatible=false;
                } 
                // else {
                //     compatible=true;
                // }
           })

        }

        if(n>0 && !compatible) {
            setError(course.Code);
            setMessage(`Course ${course.Code} is incompatible with ${val}`)
        } else {
            setError('');
            setMessage('');
            return 1;
            // setStudyPlan([...studyPlan, course]);
            // setSelected([...selected, course.Code]);
            // setCredits(credits + course.Credits);
            // if (credits + course.Credits >= props.option[0] && credits + course.Credits <= props.option[1]) {
            //     setEnableSave(true);
            // } else {
            //     setEnableSave(false);
            // }
        }

        // if(!compatible) {
        //     setError(course.Code);
        // } else {
        //     setError('');
        //     setMessage('');
        //     setStudyPlan([...studyPlan, course]);
        //     setSelected([...selected, course.Code]);
        //     setCredits(credits + course.Credits);
        //     if (credits + course.Credits >= props.option[0] && credits + course.Credits <= props.option[1]) {
        //         setEnableSave(true);
        //     } else {
        //         setEnableSave(false);
        //     }
        // }
    }


    async function can_i_enroll(course) {
        let can_i;
        props.courses.forEach((c) => {
            if (c.Code === course.Code) {
                if (c.Max_Students !== null) {
                    if (c.Max_Students > c.Enrolled_In) {
                        can_i = true;
                    } else {
                        can_i = false;
                    }
                } else {
                    can_i = true;
                }
            }
        })

        if(!can_i) {
            setError(course.Code);
            setMessage(`You cannot enroll in course ${course.Code} because the course has reached the maximum number of enrolled students!`);
        } else {
            return 1;
        }
        // const courses = await API.getCourses();
        // courses.forEach((c) => {
        //     if (c.Code === course.Code) {
        //         if (c.Max_Students !== null) {
        //             if (c.Max_Students > c.Enrolled_In) {
        //                 return true;
        //             } else {
        //                 return false;
        //             }
        //         } else {
        //             return true;
        //         }
        //     }
        // })
    }

    async function prep_course(course) {
    
        if(course.Preparatory_Course !== null && !selected.includes(course.Preparatory_Course)) {
            setError(course.Code);
            setMessage(`You cannot enroll just in course ${course.Code} because you need also course ${course.Preparatory_Course} as preparatory course!`);
        } else {
            // setError('');
            // setMessage('');
            return 1;
        }
    }

    async function remove(course) {
        const code = course.Code;
        const creds = course.Credits;

        let prep_courses = [];

        studyPlan.forEach((c) => {
            prep_courses.push(c.Preparatory_Course);
        })

        if(studyPlan.includes(course) && error=='') {
            setStudyPlan(studyPlan.filter((c) => { return c.Code !== code }));
            //setSelected(selected.filter((c) => { return c !== code }))
        }

        

        if (prep_courses.includes(code)) {
            setCredits((old_credits) => old_credits - parseInt(course.Credits, 10)); // Added lastly
            setError(code);
            setMessage(`You cannot remove course ${code} because it is needed as preparatory course!`);
        } else {
            setError('');
            setMessage('');

            setStudyPlan(studyPlan.filter((c) => { return c.Code !== code }));
            setSelected(selected.filter((c) => { return c !== code }))
            
            

            let new_credits = 0;
            if (credits > 0 && error=='') {
                // setCredits((credits) => credits - parseInt(creds, 10));
                new_credits = credits - parseInt(creds, 10);
                setCredits(new_credits);
            }


            if (new_credits >= props.option[0] && new_credits <= props.option[1]) {
                setEnableSave(true);
            } else {
                setEnableSave(false);
            }


        }


    }


    // const remove = async (event) => {
    //     const data = event.target.value.split(',')
    //     const code = data[0];
    //     const creds = data[1];

    //     let prep_courses = [];

    //     studyPlan.forEach((c) => {
    //         prep_courses.push(c.Preparatory_Course);
    //     })



    //     if (prep_courses.includes(code)) {
    //         setError(code);
    //         setMessage(`You cannot remove course ${code} because it is needed as preparatory course!`);
    //     } else {
    //         setError('');
    //         setMessage('');
    //         if(studyPlan.includes(code)) {
    //             setStudyPlan(studyPlan.filter((c) => { return c.Code !== code }));
    //         }
            
    //         setSelected(selected.filter((c) => { return c !== code }))

    //         let new_credits = 0;
    //         if (credits > 0 && error=='') {
    //             // setCredits((credits) => credits - parseInt(creds, 10));
    //             new_credits = credits - parseInt(creds, 10);
    //             setCredits(new_credits);
    //         }


    //         if (new_credits >= props.option[0] && new_credits <= props.option[1]) {
    //             setEnableSave(true);
    //         } else {
    //             setEnableSave(false);
    //         }


    //     }


    // }

    useEffect(() => {
        if (props.hasStudyPlan && props.mode) {
            clearAll();
            getStudyPlan();
        } 
    }, [])


    return (
        <>
            <div className='container mt-5'>

                <Card border="dark" className='mb-5'>
                    <Card.Body>
                        <h2>Min Credits : {props.option[0]}</h2>
                        <h2>Max Credits : {props.option[1]}</h2>
                        <h2>Your Credits : {credits}</h2>
                    </Card.Body>
                </Card>


                <AddedCourses option={props.option} studyPlan={studyPlan} />

                <div>
                    <Button onClick={saveStudyPlan} disabled={!enableSave} style={{ 'marginRight': 5 }} className='mb-3 mt-3'>Save</Button>
                    <Button onClick={clearAll} variant='danger' disabled={!enableSave} className='mb-3 mt-3'>Cancel</Button>
                </div>



                <Table bordered hover className='mb-5'>

                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Title</th>
                            <th>Credits</th>
                            <th>Max Students</th>
                            <th>Enrolled In</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        <CoursesList setError={setError} message={message} error={error} add={add} remove={remove} selected={selected} courses={props.courses}/>
                       
                    </tbody>

                </Table>
            </div >
        </>
    )
}



















// ---------------------------------------------------------------------------------------------------------- //

// useEffect(() => {
//     const items = JSON.parse(window.localStorage.getItem(`study_plan_user_${props.loggedUser}`));
//     const creds = JSON.parse(window.localStorage.getItem(`creds_user_${props.loggedUser}`));
//     const sel = JSON.parse(window.localStorage.getItem(`sel_user_${props.loggedUser}`));
//     if (items?.length > 0) {
//         setStudyPlan(items);
//         setCredits(creds);
//         setSelected(sel);
//     }

// }, []);

// useEffect(() => {
//     window.localStorage.setItem(`study_plan_user_${props.loggedUser}`, JSON.stringify(studyPlan));
//     window.localStorage.setItem(`creds_user_${props.loggedUser}`, JSON.stringify(credits));
//     window.localStorage.setItem(`sel_user_${props.loggedUser}`, JSON.stringify(selected));
//     if (credits >= props.option[0] && credits <= props.option[1]) {
//         setEnableSave(true);
//     } else {
//         setEnableSave(false);
//     }
// }, [studyPlan, credits]);

// ---------------------------------------------------------------------------------------------------------------- //

{/* {selected.includes(c.Code) ? 
                                        <tr style={{ 'background': 'green' }}>
                                            <td>{c.Code}</td>
                                            <td>{c.Name}</td>
                                            <td>{c.Credits}</td>
                                            <td>{c.Max_Students}</td>
                                            <td>0</td>
                                            <td>
                                                <Button onClick={() => add(c)} variant='success'>Add</Button>
                                                <Button onClick={remove} value={[c.Code, c.Credits]} style={{ 'marginLeft': 5 }} variant='danger'>Remove</Button>
                                            </td>
                                        </tr>
                                        :
                                            <tr>
                                                <td>{c.Code}</td>
                                                <td>{c.Name}</td>
                                                <td>{c.Credits}</td>
                                                <td>{c.Max_Students}</td>
                                                <td>0</td>
                                                <td>
                                                    <Button onClick={() => add(c)} variant='success'>Add</Button>
                                                    <Button onClick={remove} value={[c.Code, c.Credits]} style={{ 'marginLeft': 5 }} variant='danger'>Remove</Button>
                                                </td>
                                            </tr>


                                    } */}