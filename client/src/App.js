import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState, useEffect } from 'react';
import { Row, Alert, Spinner, Container } from 'react-bootstrap';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import API from './API';
import LoginPage from './components/LoginPage';
import CreatePlan from './components/CreatePlan';
import Navigation from './components/Navigation';
import Home from './components/Home';

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
    setLoading(true)
    const courses = await API.getCourses();
    setCourses(courses.sort((c1, c2) => c1.Name.localeCompare(c2.Name)));
    setLoading(false);
  }

  async function getHasSP() {
    setLoading(true)
    const response = await API.getUserStudyPlan();
    if(response.length >= 1) {
      setHasStudyPlan(true);
    } else {
      setHasStudyPlan(false);
    }
    setLoading(false)
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
      const user = await API.getUserInfo(); 
      setLoggedIn(true);
      // setLoggedUser(user.id);
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
    window.location.reload();
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
          <Route path='/create' element={(loggedIn && !hasStudyPlan) ? <CreatePlan loading={loading}  loggedUser={loggedUser} hasStudyPlan={hasStudyPlan} setHasStudyPlan={setHasStudyPlan} courses={courses}/> : <Navigate replace to='/'/> } />
          <Route path='/edit' element={(loggedIn && hasStudyPlan) ? <CreatePlan loading={loading} mode={true} loggedUser={loggedUser} hasStudyPlan={hasStudyPlan} courses={courses}/> : <Navigate replace to='/'/> } />
          <Route path="*" element={<Navigate replace to='/'/>} />
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
