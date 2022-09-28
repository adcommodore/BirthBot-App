import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Preloader from '../components/Preloader';
import UserNavBar from '../components/UserNavBar';
import MobileMockup from '../components/MobileMockup';
import Features from '../components/Features';

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
                <UserNavBar/>
                <Row>
                    <Container style={{textAlign: 'center', marginTop: '2rem'}}>
                        <h2 className="display-3">BirthBot</h2>
                    </Container>
                </Row>
                <Row>
                    <MobileMockup/>
                </Row>

                <Row>
                    <Features/>
                </Row>
            </Container>
            }
        </div>
    
    )
}

export default LandingPage;


