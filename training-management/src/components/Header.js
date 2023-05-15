import React from "react";
import { Nav, Navbar, Container } from 'react-bootstrap';
import imag from '../images/HTCLogo.png'

const Header = () => {
  return (
    <Container>
      <Navbar bg="primary" variant="dark" fixed="top" expand="false" className="d-flex">
        <Nav className="mr-2" >
          <Navbar.Brand href="#home">
            <img
              src={imag}
              width="90"
              height="50"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Nav.Link href="/employee">Employee</Nav.Link>
          <Nav.Link href="#skill">Skill</Nav.Link>
          <Nav.Link href="#training">Training</Nav.Link>
          <Nav.Link href="#allocation">Allocation</Nav.Link>
          <Nav.Link href="/login" className="login">Login</Nav.Link>
        </Nav>

      </Navbar>
    </Container>
  )
}

export default Header;