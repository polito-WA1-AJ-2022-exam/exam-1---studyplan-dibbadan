import React, { useState } from 'react'
import { Button, Form, Table, Row, Col } from 'react-bootstrap'
import CoursesTable from './CoursesTable'
import Navigation from './Navigation';
import { useLocation } from 'react-router-dom';

export default function StudyPlanForm(props) {

    const location = useLocation();
    const option = location.state.option;
    const [selectedCourses, setSelectedCourses] = useState([]);

    return (
        <>
            <Table>
                {props.courses.map((c) => {
                    <Row>
                        <Col>
                            {c.Code}
                        </Col>
                        <Col>
                            {c.Name}
                        </Col>
                    </Row>
                })}
            </Table>
        </>
    )
}
