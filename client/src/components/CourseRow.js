import React from 'react'
import { Button, Alert } from 'react-bootstrap'
export default function CourseRow(props) {



 

  return (
    <>


      <tr key={props.course.Code} style={props.selected.includes(props.course.Code) ? {'background':'green'}: {'background':'white'}}>
        <td>{props.course.Code}</td>
        <td>{props.course.Name}</td>
        <td>{props.course.Credits}</td>
        <td>{props.course.Max_Students}</td>
        <td>{props.course.Enrolled_In}</td>
        <td>
          <Button onClick={() => props.add(props.course)} variant='success'>Add</Button>
          <Button onClick={props.remove} value={[props.course.Code, props.course.Credits]} style={{ 'marginLeft': 5 }} variant='danger'>Remove</Button>
          
        </td>
      </tr>        
    </>
  )
}
