import React from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CoursesTable from './CoursesTable';
import StudyPlan from './StudyPlan';

export default function Home(props) {

  const navigate = useNavigate();


  return (
    <>
      <div className="container mt-5">
        
        {!props.hasStudyPlan && props.loggedIn && <Button style={{ 'marginBottom': 7 }} onClick={() => navigate('/create')} variant="primary">Create</Button>}
        <div className="row-md-12">
          <div className="col-md-12">
            {props.hasStudyPlan && <StudyPlan />}
            
            <CoursesTable className='my_table' courses={props.courses} />
            
          
          </div>
        </div>
      </div>
    </>
  )
}
