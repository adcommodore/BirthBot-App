import { Container } from 'react-bootstrap';
import LPVideo from '../assets/img/LPvideo.mp4'

function Video() {
    return (
        <Container className="video-responsive">
            <iframe
                width="854"
                height="480"
                src={LPVideo}
                frameBorder='0'
                title='BirthBot Video'
            />
        </Container>
    )
}

export default Video