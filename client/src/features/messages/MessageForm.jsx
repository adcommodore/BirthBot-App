import { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button, Alert } from "react-bootstrap";
import { useSendMessageMutation } from "./msgApiSlice";
import "./MessageForm.css";

function MessageForm({ user }) {
    const initialMessageState = {
        _id: '',
        userId: '',
        sentTo: '',
        body: '',
        mediaUrl: '',
        date: '',
    };


    const [ message, setMessage ] = useState(initialMessageState);
    const [ error, setError ] = useState('');
    const [ sendMessage ] = useSendMessageMutation();
    
    // useEffect(() => {
    //     setMessage({...message, userId: user._id, sentTo: user.phoneNumber})
    // }, [user])

    const smsHandler = (e) => {
        e.preventDefault();
        const {
            userId,
            sentTo,
            body,
            date
        } = message;
        sendMessage({
            userId,
            sentTo,
            body,
            date
        }).then(({data, error}) => {
            if(!error) {
                console.log(data)
            } else {
                setError(error.error)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <Container>
            <Form onSubmit={smsHandler}>
                <Row>
                    <Col md={10}>
                        <Form.Group>
                            <Form.Control 
                                type="text" 
                                placeholder='Write A Message'
                                name='body'
                                value={message.body}
                                onChange={(e) => setMessage({...message, body: e.target.value})}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Button type='submit'>Send</Button>
                    </Col>
                </Row>
                { (error !== "") &&
                <Alert>
                    <p>{error}</p>
                </Alert>
                }
            </Form>
        </Container>
    )
}
export default MessageForm