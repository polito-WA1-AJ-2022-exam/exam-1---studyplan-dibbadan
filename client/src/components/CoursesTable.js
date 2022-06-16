import React from 'react'
import Course from './Course'
import { Table } from 'react-bootstrap'

export default function CoursesTable(props) {


  return (
    <Table hover bordered>
      <thead>
        <tr>
          <th>Code</th>
          <th>Title</th>
          <th>Credits</th>
          <th>Max Students</th>
          <th>Enrolled In</th>
          {props.mode === 'create' && <th>Actions</th>}
        </tr>
      </thead>
        <tbody>
          {
            props.courses.map((course) =>
              <Course mode={props.mode} courseData={course} key={course.id} />
            )
          }
  
        </tbody>
    </Table>

  )
}

