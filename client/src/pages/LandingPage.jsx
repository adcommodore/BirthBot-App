import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import UserNavBar from '../components/UserNavBar';
import MobileMockup from '../components/MobileMockup';
import Features from '../components/Features';
import Video from '../components/Video';
import Footer from '../components/Footer';

function LandingPage () {

    return (
            <Container>
                <UserNavBar/>
                <Row>
                    <Container style={{textAlign: 'center'}} className="mt-5">
                        <h2 className="display-3">BirthBot</h2>
                    </Container>
                </Row>
                <Row>
                    <MobileMockup/>
                </Row>

                <Row>
                    <Features/>
                </Row>

                <Row>
                    <Video/>
                </Row>

                <Row>
                    <Footer/>
                </Row>
            </Container>
    )
}

export default LandingPage;


