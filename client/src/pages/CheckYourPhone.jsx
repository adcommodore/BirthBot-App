import { Card, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/users/userSlice';
import LandingPageNavBar from '../components/LandingPageNavBar';
import TextAnimation from '../components/TextAnimation';

function CheckYourPhone() {
    const user = useSelector(selectCurrentUser);

    return (
        <>
            <LandingPageNavBar />
            <Row className="justify-content-md-center" style={{margin: '4rem'}}>
                <Col xs={6}>
                    <Card  className="text-center" style={{borderColor: '#DBD0DD', backgroundColor:'#DBD0DD', boxShadow:'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px'}}>
                        <Card.Img style={{opacity: '60%'}} />
                        <Card.ImgOverlay>
                        <Card.Body>
                            <Card.Title style={{marginTop: '1rem', marginBottom: '12rem'}}>
                                <h2 className='congrats-card'>Congratulations</h2>
                                <TextAnimation text={`  ${user.firstName}!`}/>
                            </Card.Title>
                            <Card.Subtitle>
                                <h3 className='congrats-card' style={{marginBottom: '4rem'}}> You have successfully signed up.</h3>
                            </Card.Subtitle>
                            <Card.Text>
                                <h4 >Check your phone to see if BirthBot sent you a text!</h4>
                            </Card.Text>
                        </Card.Body>
                        </Card.ImgOverlay>
                    </Card>
                </Col>
            </Row>
            
            
        </>
    )
}


export default CheckYourPhone