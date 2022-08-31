import { useState } from "react";
import { useSelector } from "react-redux";
import { useSendMessageMutation } from "./msgSlice";
import { Col, Form, Row } from "react-bootstrap";
import "./MessageForm.css";

const MessageForm = () => {
    const [sendNewMessage, { isLoading }] = useSendMessageMutation()

    const [body, setBody] = useState('')
    const [userId, setUserId] = useState('')

    const canSend = [body, userId].every(Boolean) && !isLoading;

    const onSendMessageHandler = async () => {
        if (canSend) {
            try {
                await sendNewMessage({ body, userId }).unwrap()

                setBody('')
                setUserId('')
            } catch (err) {
                console.error('Failed to send message', err)
            }
        }
    }

    return (
        <div>
            <Form>
                <Row>
                    <Col md={10}>
                        <Form.Group>
                            <Form.Control 
                                type="text" 
                                placeholder='Write A Message'
                                name='body'
                                value={ body }
                                onChange={ (e) => setBody(e.target.value) }
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}
export default MessageForm