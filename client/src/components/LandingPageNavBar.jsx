import { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from '../assets/img/logo.png';

function LandingPageNavBar() {
    const [ activeLink, setActiveLink ] = useState('home');
    const [ scrolled, setScrolled ] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, [])

    const onUpdateActiveLink = (value) => {
        setActiveLink(value);
    }

    return (
        <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
            <Container>
                <Navbar.Brand href="/">
                    <img src={logo} style={{width: "5rem", height: "5rem"}} alt="BirthX Logo"/>
                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link 
                            href="/signup"
                            className={activeLink === 'signUp' ? 'active navbar-link' : 'navbar-link'}
                            onClick={() => onUpdateActiveLink('signUp')}
                        >
                            Sign Up
                        </Nav.Link>
                        <Nav.Link 
                            href="/pricing"
                            className={activeLink === 'pricing' ? 'active navbar-link' : 'navbar-link'}
                            onClick={() => onUpdateActiveLink('pricing')}
                        >
                            Pricing
                        </Nav.Link>
                        <Nav.Link 
                            href="/faq"
                            className={activeLink === 'faq' ? 'active navbar-link' : 'navbar-link'}
                            onClick={() => onUpdateActiveLink('faq')}
                        >
                            FAQ
                        </Nav.Link>
                        <Nav.Link 
                            href="/contactus"
                            className={activeLink === 'contactUs' ? 'active navbar-link' : 'navbar-link'}
                            onClick={() => onUpdateActiveLink('contactUs')}
                        >
                            Contact Us
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default LandingPageNavBar