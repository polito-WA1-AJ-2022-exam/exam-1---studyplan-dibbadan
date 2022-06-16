import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CoursesTable from './CoursesTable';
import CreatePlan from './CreatePlan';
import { useEffect } from 'react';

export default function Home(props) {

  const navigate = useNavigate();


  return (
    <>

    

      <div className="container mt-5">
        {!props.hasStudyPlan && props.loggedIn && <Button style={{ 'marginBottom': 7 }} onClick={() => navigate('/create')} variant="primary">Create</Button>}
        {props.hasStudyPlan && props.loggedIn && <Button style={{ 'marginBottom': 7 }} onClick={() => navigate('/my-study-plan')} variant="primary">My Plan</Button>}
        {/* {props.hasStudyPlan && props.loggedIn && <Button style={{ 'marginBottom': 7 }} onClick={() => navigate('/create')} variant="primary">Edit Plan</Button>} */}
        <div className="row">
          <div className="col-md-12">
            <CoursesTable courses={props.courses} />
          </div>
        </div>
      </div>
    </>
  )
}
