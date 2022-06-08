import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from './components/Navigation';
import React, { useState, useEffect } from 'react';
import { Row, Alert } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import API from './API';
import Layout from './components/Layout';
import LoginPage from './components/LoginPage';
import StudyPlanLayout from './components/StudyPlanLayout';
import Navigation from './components/Navigation';
import CoursesTable from './components/CoursesTable';

function App() {

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  //AUTHENTICATION/AUTHORIZATION procedures
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');

  async function getCourses() {
    let courses = await API.getCourses();
    courses.sort((c1, c2) => c1.Name-c2.Name);
    setCourses(courses);
    setLoading(false);
  }

  useEffect(() => {
    getCourses();
  }, [])

  useEffect(() => {
    const checkAuth = async () => {
      await API.getUserInfo(); // we have the user info here
      setLoggedIn(true);
    };
    checkAuth();
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setMessage({msg: `Welcome, ${user.name}!`, type: 'success'});
    }catch(err) {
      setMessage({msg: err, type: 'danger'});
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
   
    {loggedIn && <Navigation isLoggedIn={loggedIn} handleLogout={handleLogout} />}
    {message && <Row>
        <Alert variant={message.type} onClose={() => setMessage('')} dismissible>{message.msg}</Alert>
      </Row> }
      <Routes>

          {loggedIn && <Route path='/studyplan' element={<StudyPlanLayout courses={courses}/>}/>}

          <Route path='/login' element={
            loggedIn ? <Navigate replace to='/studyplan' /> : <LoginPage message={message} handleLogin={handleLogin} setMessage={setMessage} />
          } />


          <Route path="/" element={!loggedIn ?
            <Layout courses={courses} /> : <Navigate replace to='/studyplan'/>
          } />

          <Route path="/studyplan" element={
            <Navigate replace to='/' />
          } />

         <Route path="/" element={loggedIn &&
            <Navigate replace to='/studyplan'/>
          } />

          <Route path="*" element={<Navigate replace to="/" />}/>
          
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
