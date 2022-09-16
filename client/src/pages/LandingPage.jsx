import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import Preloader from '../components/Preloader';
import LandingPageNavBar from '../components/LandingPageNavBar';
import PhoneMockUp from '../assets/img/phonemockup.png'

function LandingPage () {
    const [ loading, setLoading ] = useState(false);

    // useEffect(() => {
    //     setLoading(true)
    //     setTimeout(() => {
    //         setLoading(false)
    //     }, 19000 )
    // }, [])

    return (
        <div>
            {
                loading ?
                
                <Preloader
                loading={loading}
                />

                :
        
            <Container>
                <LandingPageNavBar/>
                <Row>
                    <Container style={{textAlign: 'center', marginTop: '2rem'}}>
                        <h2 className="display-3">BirthBot</h2>
                    </Container>
                </Row>
                <Row>
                    <Col>
                        <Container style={{marginTop: '15rem'}}>
                            <h4>
                                The first ever SMS-based childbirth educating chatbot powered by Al.
                            </h4>
                            <h6>
                            Get daily or weekly messages on pregnancy, labor, birth, and 
                            postpartum that help you feel confident and prepared for
                            childbirth and postpartum. No download or login required.
                            </h6>
                        </Container>
                        <Container>
                            <Button variant='primary' style={{marginTop: '2rem'}}>Get Started!</Button>
                        </Container>
                        
                    </Col>
                    <Col>
                        <img style={{marginTop: '-6rem'}}src={PhoneMockUp}/>
                    </Col>
                </Row>
            </Container>
            }
        </div>
    
    )
}

export default LandingPage;


