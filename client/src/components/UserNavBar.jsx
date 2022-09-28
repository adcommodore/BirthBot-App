import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from '../assets/img/logo.png';

function UserNavBar() {

    return (
        <Container style={{paddingTop: '20px' }}>
            <Navbar expand='lg' className='userNavBar'>
                <Container style={{padding: '0 30px'}}>
                    <Navbar.Brand href="/">
                        <img src={logo} style={{width: "5rem", height: "5rem"}} alt="BirthX Logo"/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="/signup">
                                Sign Up
                            </Nav.Link>
                            <Nav.Link>
                                Pricing
                            </Nav.Link>
                            <Nav.Link>
                                FAQ
                            </Nav.Link>
                            <Nav.Link>
                                Contact Us
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Container>
    )
}

export default UserNavBar