import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import img from '../assets/img/phonemockup.png';


function MobileMockup() {
    return (
        <Container className='py-5'>
            <Row>
                <Col lg={6} md={6} sm={12} className="d-flex align-items-center">
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

                <Col lg={6} md={6} sm={12}>
                    <Image src={img} fluid/>
                </Col>
            </Row>

        </Container>
    )
}

export default MobileMockup