import React from 'react'
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Navigation(props) {

  const navigate = useNavigate();

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href='/' >Study Plan Manager</Navbar.Brand>
        <Nav className="ml-md-auto">
          {props.loggedIn ? <Button onClick={props.handleLogout} variant="primary">Logout</Button> : <Button onClick={() => navigate("/login")} variant="primary">Login</Button>}
        </Nav>
      </Container>
    </Navbar>

  );
}
