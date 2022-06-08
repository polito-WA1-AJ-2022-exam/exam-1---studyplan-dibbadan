import React from 'react'
import { Container } from 'react-bootstrap';
import CoursesTable from './CoursesTable';
import Navigation from './Navigation';

export default function Layout(props) {
  return (
    <>
    
    <Navigation/>
    <Container className='my_container' fluid>
      <CoursesTable courses={props.courses}/>
    </Container>
    </>
  )
}
