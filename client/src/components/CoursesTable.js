import React from 'react'
import Course from './Course'
import { Table } from 'react-bootstrap'

export default function CoursesTable(props) {
  
  
  return (

    <Table bordered hover>
      <thead>
        <tr>
          <th>Code</th>
          <th>Name</th>
          <th>Credits</th>
          <th>Max Students</th>
          <th>Enrolled In</th>
        </tr>
      </thead>

      <tbody>
          {
            props.courses.map((course) =>
                    <Course courseData={course} key={course.Code} Code={course.Code} />
                
            )
          } 
      </tbody>
    </Table>
               
  )
}

