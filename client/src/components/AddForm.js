import React, { useEffect, useState } from 'react'
import { Button, Table, Card } from 'react-bootstrap';
import API from '../API';
import AddedCourses from './AddedCourses';
import '../App.css';
import { useNavigate } from 'react-router-dom';
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
        console.log("OLD SP = ", old_sp);
        await API.destroyStudyPlan(old_sp);
        console.log("SELECTED COURSES = ", selected);
        const response = await API.addStudyPlan(studyPlan);
        if (response) {
            
            studyPlan.forEach(async (c) => {
                await API.updateEnrollments(c.Code);
            })
        }
        if (response && props.hasStudyPlan === false) {
            props.setHasStudyPlan(true);
            navigate('/')
            window.location.reload();
        } else {
            navigate('/')
            window.location.reload();
        }
    }



    async function add(course) {

        // Check multiple add of the same course
        let res = await check_multiple_add(course);
        let ret = 0;

        if (res) {
            // Check incompatible course
            ret += await check_inc(course);
            // Check if I need preparatory course
            ret += await prep_course(course);
            // Check if I can enroll
            ret += await can_i_enroll(course);

            if (ret > 0) {
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
        // if(studyPlan.includes(course)) {
        if (selected.includes(course.Code)) {
            setError(course.Code);
            setMessage(`The course ${course.Code} has already been included in the study plan`);
            return false;
        } else {
            return true;
        }
    }

    async function check_inc(course) {
        let compatible, val;
        let n = 0;


        // Check if code is incompatible with what is present in the Study Plan
        if (course.Incompatible_Courses === null) {
            compatible = true;
        } else {
            course.Incompatible_Courses.forEach((inc) => {
                if (selected.includes(inc)) {
                    n++;
                    val = inc;
                    compatible = false;
                }
            })

        }

        if (n > 0 && !compatible) {
            setError(course.Code);
            setMessage(`Course ${course.Code} is incompatible with ${val}`)
        } else {
            setError('');
            setMessage('');
            return 1;
        }

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

        if (!can_i) {
            setError(course.Code);
            setMessage(`You cannot enroll in course ${course.Code} because the course has reached the maximum number of enrolled students!`);
        } else {
            return 1;
        }

    }

    async function prep_course(course) {

        if (course.Preparatory_Course !== null && !selected.includes(course.Preparatory_Course)) {
            setError(course.Code);
            setMessage(`You cannot enroll just in course ${course.Code} because you need also course ${course.Preparatory_Course} as preparatory course!`);
        } else {
            return 1;
        }
    }

    async function remove(course) {
        const code = course.Code;
        const creds = course.Credits;


        if (error == '') {
            setStudyPlan(studyPlan.filter((c) => { return c.Code !== code }));



            let new_credits = 0;
            if (credits > 0 && error == '' && selected.includes(code)) {
                new_credits = credits - parseInt(creds, 10);
                setCredits(new_credits);
            }

            setSelected(selected.filter((c) => { return c !== code }))

            if (new_credits >= props.option[0] && new_credits <= props.option[1]) {
                setEnableSave(true);
            } else {
                setEnableSave(false);
            }
        }




    }




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



                
               
                    <Table  size='sm' responsive bordered hover >

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

                            
                            <CoursesList className='coursesList' setError={setError} message={message} error={error} add={add} remove={remove} selected={selected} courses={props.courses} />

                        </tbody>

                    </Table>
               
            </div >
        </>
    )
}


















