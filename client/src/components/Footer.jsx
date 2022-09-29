import { Container, Image } from 'react-bootstrap';
import logo from '../assets/img/WhiteLogo.png'

function Footer() {
    return (
        <Container className='mt-5 p-5'style={{backgroundColor: '#4C455F', borderRadius: '10px'}}>
            <h1 className='' style={{color: 'white'}}>YOU create your birth experience.</h1>
            <Image src={logo} style={{height: '40%', width: '30%'}}/>
            <h4 style={{color: 'white'}}>is simply here to give you the information you need.</h4>
        </Container>
    )
}

export default Footer