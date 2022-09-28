import { Card } from 'react-bootstrap';

function FeatureItem({text}) {
    return (
        <Card className="card w-75 text-left ml-4 p-4 my-4">
            <Card.Title>{text}</Card.Title>
        </Card>
    )
}

export default FeatureItem