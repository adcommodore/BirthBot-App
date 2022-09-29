import { Container, Row, Col } from 'react-bootstrap';
import FeatureItem from './FeatureItem';
import CardOne from '../assets/img/1.png';
import CardTwo from '../assets/img/2.png';
import CardThree from '../assets/img/3.png'

function Features() {
    return (
        <Container style={{backgroundColor: '#F5F5F5', borderRadius: '10px'}} className='p-5 mb-5'>
            <Row className='d-flex align-items-center'>
                <Col lg={3} md={3} sm={12}>
                    <h2 className="">
                        Pregnancy and postpartum are overwhelming enough.
                    </h2>
                </Col>

                <Col lg={3} md={3} sm={12} className='g-3 d-flex justify-content-center'>
                    <FeatureItem
                        src={CardThree}
                        text='Learn about pregnancy, birth, and postpartum gradually throughout your pregnancy.'
                    />
                </Col>

                <Col lg={3} md={3} sm={12} className='g-3 d-flex justify-content-center'>
                    <FeatureItem 
                        src={CardTwo}
                        text='Recieve text messages on a schedule that works for you.'
                    /> 
                </Col>

                <Col lg={3} md={3} sm={12} className='g-3 d-flex justify-content-center'>
                    <FeatureItem
                        src={CardOne}
                        text='Get your questions answered at any time of the day.'
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default Features