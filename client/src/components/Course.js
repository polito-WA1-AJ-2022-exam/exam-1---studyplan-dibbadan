import React, { useState } from 'react'
import { Collapse, Row, Col} from 'react-bootstrap'

export default function Course(props) {

    const [open, setOpen] = useState(false);

   


    return (

        <>
            <tr className='my_row' onClick={() => setOpen(!open)}>
                <td><strong>{props.courseData.Code}</strong></td>
                <td><strong>{props.courseData.Name}</strong></td>
                <td><strong>{props.courseData.Credits}</strong></td>
                <td><strong>{props.courseData.Max_Students}</strong></td>
                <td><strong>da definire</strong></td>
            </tr>

            <Collapse in={open}>
                <Row>
                    <Col>
                        <strong>Incompatible Courses</strong>
                        <Row>
                        {props.courseData.Incompatible_Courses !== null || props.courseData.Incompatible_Courses !== null  ? props.courseData.Incompatible_Courses.map((item)=>{
                            return (
                                    <Col>{item}</Col>
                                    
                                )
                        }) : null}
                        </Row>
                    </Col>

                    <Col>
                        <strong>Preparatory Course</strong>
                        <Row>{props.courseData.Preparatory_Course}</Row>
                    </Col> 
                </Row>
            </Collapse>
        
        </>  
        
    )
}
