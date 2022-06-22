import React, { useState } from 'react'
import { Collapse, Table } from 'react-bootstrap'

export default function Course(props) {

    const [open, setOpen] = useState(false);



    return (

        <>
        
            <tr className='my_row' onClick={() => setOpen(!open)}>
                <td><strong>{props.courseData.Code}</strong></td>
                <td><strong>{props.courseData.Name}</strong></td>
                <td><strong>{props.courseData.Credits}</strong></td>
                <td><strong>{props.courseData.Max_Students}</strong></td>
                <td><strong>{props.courseData.Enrolled_In}</strong></td>
            </tr>

            <Collapse in={open}>
                    <tr>
                        <td  colSpan={7}>
                            <Table hover bordered>
                                <thead>
                                    <tr>
                                        <th>
                                            <strong>Incompatible with</strong>

                                        </th>
                                        <th>
                                            <strong>Preparatory Course</strong>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{props.courseData.Incompatible_Courses && props.courseData.Incompatible_Courses.map((c) => { return (<><li key={c}><strong>{c}{' '}</strong></li></>) })}</td>
                                        <td>{props.courseData.Preparatory_Course !== null && <li><strong>{props.courseData.Preparatory_Course}</strong></li>}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </td>



                    </tr>

                </Collapse>





        </>

    )
}


/*
<tr>
                
                 <Table bordered> 
                     <thead> 
                        <td>
                            <th>Incompatible with</th>
                            <th>Preparatory course</th>
                        </td>
                     </thead> 
                     <tbody> 
                        <tr>
                            <td>
                                 <td> 
                                 <tr> 
                                    {props.courseData.Incompatible_Courses && props.courseData.Incompatible_Courses.map((c) => { return (<>{c}</>) })}
                                 </tr> 
                            </td>

                            <td>
                                <strong>{props.courseData.Preparatory_Course}</strong>
                            </td>

                        </tr>
                     </tbody> 
                 </Table> 
            </tr>*/