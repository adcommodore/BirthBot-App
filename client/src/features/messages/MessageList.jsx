import { Container, ListGroup } from 'react-bootstrap';
import { useGetMessagesByUserIdQuery } from './msgApiSlice';
import TimeAgo from './TimeAgo';

function MessageList(props) {
    const {
        data: messages,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetMessagesByUserIdQuery();

    if (isLoading) return <div>Loading...</div>

    return (
        <Container>
            {messages 
                ? messages.map((message) => (
                    <ListGroup.Item key={message.id}>
                        <h5>{message.body}</h5>
                        <TimeAgo />
                    </ListGroup.Item>
                ))
                : 'No current messages with this user.'}
        </Container>
    )
}

export default MessageList
