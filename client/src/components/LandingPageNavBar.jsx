import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from '../assets/img/logo.png';

function LandingPageNavBar() {

    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand href="/">
                    <img src={logo} style={{width: "5rem", height: "5rem"}} alt="BirthX Logo"/>
                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
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
    )
}

export default LandingPageNavBar