import React from 'react'
import { useState } from 'react';
import validator from 'validator'
import { Form, Button, Stack, Container, Row, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function LoginPage(props) {

  const navigate = useNavigate();
  
  const [emailError, setEmailError] = useState('');
  const validateEmail = (email) => {
    if (validator.isEmail(email)) {
      return true;
    } else {
      setEmailError('Enter valid Email!')
      return false;
    }
  }

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateEmail(username)) {
      const credentials = { username, password };
      props.handleLogin(credentials);
    }
  };

 

  return (
      <div gap={2} className="back container col-md-5 mx-auto">
        <i class="arrow bi bi-arrow-left-circle" onClick={() => navigate("/")}></i>
        <h1>Login</h1>
        <>
          <Form className="block-example rounded mb-0 form-padding" onSubmit={handleSubmit}>
            <Form.Group controlId='username'>
              <Form.Label>email</Form.Label>
              <Form.Control type='email' value={username} onChange={ev => setUsername(ev.target.value)} required={true} />
              {emailError && <Row className='m-1'>
                <Alert variant='danger' onClose={() => setEmailError('')} dismissible>{emailError}</Alert>
              </Row>}
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)} required={true} minLength={6} />
            </Form.Group>

            <Button className="mt-3" type="submit">Login</Button>
          </Form>
        </>
      </div>
  )
}




