import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'

export default function AddedCourses(props) {
    
    return (
        <div className='container mt-5 mb-5'>
            <Card border="dark">
                <Card.Header>
                    <h2>My Study Plan</h2>
                </Card.Header>


                <Card.Body>
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col>Code</Col>
                                <Col>Name</Col>
                                <Col>Credits</Col>
                                <Col>Max Students</Col>
                            </Row>
                        </Card.Header>
                    </Card>

                    {props.studyPlan.map((c) => {
                        return (
                            <>

                            <Card borderd='dark'>
                                <Card.Body>
                                    <Row>

                                        <Col>
                                            {c.Code}
                                        </Col>
                                        <Col>
                                            {c.Name}
                                        </Col>
                                        <Col>
                                            {c.Credits}
                                        </Col>
                                        <Col>
                                            {c.Max_Students}
                                        </Col>

                                    </Row>
                                </Card.Body>
                            </Card>


                            </>
                        )

                    })}
                </Card.Body>
            </Card>
        </div>
    )
}
