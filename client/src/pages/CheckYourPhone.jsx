import { Card, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/users/userSlice';
import LandingPageNavBar from '../components/LandingPageNavBar';
import TextAnimation from '../components/TextAnimation';
import './CheckYourPhone.css';

function CheckYourPhone() {
    const user = useSelector(selectCurrentUser);

    return (
        <>
            <LandingPageNavBar />
            <Row className="justify-content-md-center" style={{marginTop: '3rem'}}>
                <Col xs={6}>
                    <Card  className="text-center" style={{borderColor: '#4C455F', backgroundColor: '#DBD0DD'}}>
                        <Card.Body>
                            <Card.Title>
                                <TextAnimation text={`  Congratulations ${user.firstName}!`}/>
                            </Card.Title>
                            <Card.Subtitle>
                                <h3> You have successfully signed up.</h3>
                            </Card.Subtitle>
                            <Card.Text>
                                <h4>Check your phone to see if BirthBot sent you a text!</h4>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
            
        </>
    )
}


export default CheckYourPhone