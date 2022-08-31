import React from 'react';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../assets/logo.png';

function Navigation() {
    const dispatch = useDispatch()
    const { admin } = useSelector((state) => state.auth)

    const onLogout = () => {
    }

    return (
        <div>
            <Navbar bg="secondary" expand="lg">
                <Container>
                    <LinkContainer to="/admin">
                        <Navbar.Brand>
                            <img src={logo} style={{width: "5rem", height: "5rem"}} alt="BirthX Logo"/>
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {admin ? (
                            <LinkContainer to="/admin" onClick={onLogout}>
                                <Nav.Link>Logout</Nav.Link>
                            </LinkContainer>
                        ) : (
                            <LinkContainer to="/admin/login">
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                        )}
                        <NavDropdown title="Admin Panel" id="basic-nav-dropdown">
                            <LinkContainer to="/admin/users">
                                <NavDropdown.Item>User Dashboard</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/chat">
                                <NavDropdown.Item>Chat</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/content">
                                <NavDropdown.Item>Content Manager</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/broadcast">
                                <NavDropdown.Item>Broadcast</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Navigation