import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import img from '../assets/img/phonemockup.png';


function MobileMockup() {
    return (
        <Container>
            <Row>
                <Col lg={6} md={6} sm={12} className="d-flex align-items-center pt-4">
                    <div className='text-lg-start text-md-start text-center'>
                        <h4>
                            The first ever SMS-based childbirth educating chatbot powered by Al.
                        </h4>
                        <h6 className='py-3'> 
                            Get daily or weekly messages on pregnancy, labor, birth, and 
                            postpartum that help you feel confident and prepared for
                            childbirth and postpartum. No download or login required.
                        </h6>
                        <Button variant='primary' href='/signup'>Get Started!</Button>
                    </div>
                </Col>

                <Col lg={6} md={6} sm={12} className='py-4'>
                    <Image src={img}/>
                </Col>
            </Row>

        </Container>
    )
}

export default MobileMockup