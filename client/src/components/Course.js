import React, { useEffect, useState } from 'react'
import { Collapse, Row, Col, Table, Button } from 'react-bootstrap'

export default function Course(props) {

    const [open, setOpen] = useState(false);
    const [bgColor, setBgColor] = useState(false);

    function handleAdd(event) {
        setBgColor('green');

    }

    function handleRemove(event) {
        setBgColor('white');
    }

    return (

        <>
            <tr className='my_row' onClick={() => setOpen(!open)}>
                <td style={{ 'background': bgColor }}><strong>{props.courseData.Code}</strong></td>
                <td style={{ 'background': bgColor }}><strong>{props.courseData.Name}</strong></td>
                <td style={{ 'background': bgColor }}><strong>{props.courseData.Credits}</strong></td>
                <td style={{ 'background': bgColor }}><strong>{props.courseData.Max_Students}</strong></td>
                <td style={{ 'background': bgColor }}><strong>{props.courseData.Enrolled_In}</strong></td>
                {props.mode === 'create' && <td><Button onClick={handleAdd} value={props.courseData.Code} variant='success'>Add</Button> <Button onClick={handleRemove} variant='danger'>Remove</Button></td>}
            </tr>


            {props.mode !== 'create' &&
                <Collapse in={open}>
                    <tr>
                        <Table bordered>
                            <thead>
                                <tr>
                                    <th>Incompatible with</th>
                                    <th>Preparatory course</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <td>
                                            {props.courseData.Incompatible_Courses && props.courseData.Incompatible_Courses.map((c) => { return (<strong>{c}{' '}</strong>) })}
                                        </td>



                                    </td>

                                    <td>
                                        <strong>{props.courseData.Preparatory_Course}</strong>
                                    </td>

                                </tr>
                            </tbody>
                        </Table>
                    </tr>
                </Collapse>
            }




        </>

    )
}
