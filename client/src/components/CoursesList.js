import React, { useState } from 'react'
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.css";

export default function CoursesList(props) {


    return (
        <>
            
            {props.courses.map((c) => {
                return (
                    <React.Fragment key={c.Code}>
                        {
                            

                            <tr
                                
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
                                    {props.error === c.Code && <OverlayTrigger
                                        overlay={
                                            <Tooltip>
                                                {props.message}
                                                {".\n"}
                                                {"\n**CLICK TO HIDE**"}
                                            </Tooltip>
                                        }
                                    >
                                        <i onClick={(event) => { props.setError(''); props.setMessage('') }} className="bi bi-question-diamond"></i>
                                    </OverlayTrigger>}
                                </td>
                            </tr>









                        }


                    </React.Fragment>
                )

            })}
        </>
    )
}


