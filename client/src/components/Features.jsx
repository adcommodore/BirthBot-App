import { Container, Row, Col } from 'react-bootstrap';
import FeatureItem from './FeatureItem';

function Features() {
    return (
        <Container style={{backgroundColor: '#F5F5F5', borderRadius: '10px'}} className='py-5'>
            <Row className='d-flex align-items-center'>
                <Col lg={3} md={3} sm={12}>
                    <h2 className='ml-4'>
                        Pregnancy and postpartum are overwhelming enough.
                    </h2>
                </Col>
                <Col lg={3} md={3} sm={12}>
                    <FeatureItem text='Learn about pregnancy, birth, and postpartum gradually throughout your pregnancy.'/>
                </Col>

                <Col lg={3} md={3} sm={12}>
                    <FeatureItem text='Recieve text messages on a schedule that works for you.'/>
                </Col>

                <Col lg={3} md={3} sm={12}>
                    <FeatureItem text='Get your questions answered at any time of the day.'/>
                </Col>
            </Row>
        </Container>
    )
}

export default Features