import React from 'react'
import Course from './Course'
import { Table } from 'react-bootstrap'

export default function CoursesTable(props) {


  return (
    
    <Table size='sm' responsive hover bordered>
      <thead>
        <tr>
          <th>Code</th>
          <th>Title</th>
          <th>Credits</th>
          <th>Max Students</th>
          <th>Enrolled In</th>
        </tr>
      </thead>
      <tbody>
        {
          props.courses.map((course, index) =>
            <Course courseData={course} key={index}/>
          )
        }

      </tbody>
    </Table>
    

  )
}

