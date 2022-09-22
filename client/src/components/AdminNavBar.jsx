import React from 'react';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../assets/img/logo.png';

function AdminNavBar() {
    const dispatch = useDispatch()
    const { admin } = useSelector((state) => state.auth)

    const onLogout = () => {
    }

    return (
        
            <Navbar expand="lg" className='adminNavBar'>
                <Container >
                    <Navbar.Brand href="/admin">
                        <img src={logo} style={{width: "5rem", height: "5rem"}} alt="BirthX Logo"/>
                    </Navbar.Brand>
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {admin ? (
                            <Nav.Link href="/admin" onClick={onLogout}>
                                Logout
                            </Nav.Link>
                        ) : (
                            <Nav.Link href="/admin/login">
                                Login
                            </Nav.Link>
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

    )
}

export default AdminNavBar