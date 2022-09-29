import { Card } from 'react-bootstrap';

function FeatureItem({ text, src }) {
    return (
        <Card id="card-item" className="card h-75 text-left px-3 my-3 pt-3" style={{height: '30rem'}}>
            <Card.Img src={src} style={{opacity: '0.4'}}/>
            <Card.Body>
                <Card.Title>{text}</Card.Title>
            </Card.Body>
        </Card>
    )
}

export default FeatureItem