import React, { useState } from 'react'
import CourseRow from './CourseRow'
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.css";

export default function CoursesList(props) {

    function handle() {
        props.setError('');
        props.setMessage('');
    }

    return (
        <>
            {props.courses.map((c) => {
                return (
                    <>
                        {

                            <tr
                                key={c.Code}
                                style={
                                    props.error === c.Code ? { 'background': 'red' } :
                                        props.selected.includes(c.Code) ? { 'background': 'green' } : { 'background': 'white' }}>
                                <td>{c.Code}</td>
                                <td>{c.Name}</td>
                                <td>{c.Credits}</td>
                                <td>{c.Max_Students}</td>
                                <td>{c.Enrolled_In}</td>
                                <td>
                                    <Button onClick={() => props.add(c)} variant='success'>Add</Button>
                                    <Button onClick={() => props.remove(c)} value={[c.Code, c.Credits]} style={{ 'marginLeft': 5 }} variant='danger'>Remove</Button>
                                    {/* <Button onClick={props.remove} value={[c.Code, c.Credits]} style={{ 'marginLeft': 5 }} variant='danger'>Remove</Button> */}
                                    {props.error === c.Code && <OverlayTrigger
                                        overlay={
                                            <Tooltip>
                                                {props.message}
                                            </Tooltip>
                                        }
                                    >
                                        <i className="bi bi-question-diamond"></i>
                                    </OverlayTrigger>}
                                </td>
                            </tr>




                            // <CourseRow add={props.add} remove={props.remove} selected={props.selected} course={c} /> 




                        }


                    </>
                )

            })}
        </>
    )
}


