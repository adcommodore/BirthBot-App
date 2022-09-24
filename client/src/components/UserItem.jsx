import { useState } from 'react';
import { Container, ListGroup } from 'react-bootstrap';

const UserItem = (props) => {
    

    return (
        <Container>
            <ListGroup>
                <ListGroup.Item 
                    style={{border: '1px solid lightgrey', borderRadius: '10px', padding: '15px 20px 5px 20px'}}
                >
                    <h4>{props.user.firstName} {props.user.lastName}</h4>
                    <h6>{props.user.phoneNumber}</h6>
                </ListGroup.Item>
            </ListGroup>
        </Container>
    )
}

export default UserItem