import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState, useEffect } from 'react';
import { Row, Alert, Container } from 'react-bootstrap';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import API from './API';
import Layout from './components/Home';
import LoginPage from './components/LoginPage';
import CreatePlan from './components/CreatePlan';
import CoursesTable from './components/CoursesTable';
import Navigation from './components/Navigation';
import StudyPlan from './components/StudyPlan';
import Home from './components/Home';
import StudyPlanForm from './components/StudyPlanForm';

function App() {


  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  //AUTHENTICATION/AUTHORIZATION procedures
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState('');
  const [message, setMessage] = useState('');

  // STUDY PLAN 
  const [hasStudyPlan, setHasStudyPlan] = useState(false);

  async function getCourses() {
    const courses = await API.getCourses();
    setCourses(courses.sort((c1, c2) => c1.Name.localeCompare(c2.Name)));
    setLoading(false);
  }

  async function getHasSP() {
    const response = await API.getUserStudyPlan();
    if(response.length >= 1) {
      setHasStudyPlan(true);
    } else {
      setHasStudyPlan(false);
    }
  }

  useEffect(() => {
    getCourses();
  }, [])

  useEffect(() => {
    if(loggedIn) {
      getHasSP();
    }
  })


  useEffect(() => {
    const checkAuth = async () => {
      const user = await API.getUserInfo(); // we have the user info here
      setLoggedIn(true);
      setLoggedUser(user.id);
    };
    checkAuth();
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setMessage({ msg: `Welcome, ${user.name}!`, type: 'success' });
    } catch (err) {
      setMessage({ msg: 'Wrong email and/or password!', type: 'danger' });
    }
  };

  const handleLogout = async () => {
    await API.logOut();
    setLoggedIn(false);
    setMessage('');
  };


  return (
    <>
      
      <BrowserRouter>
        <Navigation loggedIn={loggedIn} handleLogin={handleLogin} handleLogout={handleLogout}/>
        {message && <Row>
          <Alert variant={message.type} onClose={() => setMessage('')} dismissible>{message.msg}</Alert>
        </Row>}
        <Routes>
          <Route path='/' element={<Home loggedIn={loggedIn} setHasStudyPlan={setHasStudyPlan} hasStudyPlan={hasStudyPlan} courses={courses}/>}/>
          <Route path='/login' element={(loggedIn && !hasStudyPlan) ? <Navigate replace to='/'/> : <LoginPage handleLogin={handleLogin} message={message} setMessage={setMessage}/>}/>
          <Route path='/create' element={(loggedIn && !hasStudyPlan) && <CreatePlan  loggedUser={loggedUser} hasStudyPlan={hasStudyPlan} setHasStudyPlan={setHasStudyPlan} courses={courses}/> } />
          <Route path='/edit' element={(loggedIn && hasStudyPlan) && <CreatePlan mode={true} loggedUser={loggedUser} hasStudyPlan={hasStudyPlan} courses={courses}/> } />
          <Route path='/my-study-plan' element={(loggedIn && hasStudyPlan) ? <StudyPlan/> : <Navigate replace to='/'/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
