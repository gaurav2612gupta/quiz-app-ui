import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Quiz App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Home
            </NavLink>
            <NavLink
              to="/takeQuiz"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Take Quiz
            </NavLink>
            <NavLink
              to="/createQuiz"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Create Quiz
            </NavLink>
          </Nav>
          <Nav>
            <NavLink to="/login">
              <Button variant="outline-info" className="me-2">
                Log In
              </Button>
            </NavLink>
            <NavLink to="/signup">
              <Button variant="info">
                Sign Up
              </Button>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
