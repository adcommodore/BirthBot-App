import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useGetUsersQuery } from '../features/users/userApiSlice';
import AdminNavBar from '../components/AdminNavBar';
import UserItem from '../components/UserItem';
import MessageForm from '../features/messages/MessageForm';
import MessageList from '../features/messages/MessageList';

const Chat = () => {
    const [ currentUser, setCurrentUser ] = useState(null);
    const [ isClicked, setIsClicked ] = useState(false);
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetUsersQuery()

    if (isLoading) return <div>Loading...</div>

    return (
        <>
            <AdminNavBar />
            <Container style={{marginTop: '30px 0px'}}>
                <Row >
                    <Col md={8}>
                        <Row  style={{height: '700px', border: '1px solid lightgrey', borderRadius: '10px'}}>
                        <MessageList user={currentUser}/>
                        </Row>
                        <Row>
                        <MessageForm user={currentUser}/>
                        </Row>
                    </Col>
                    <Col md={4} >
                        <Container>
                            <h2 style={{textAlign: 'center'}}>Current Subscribers</h2>
                            {users 
                                ? users.map((user) => (
                                        <div
                                            onClick= {() => {
                                                setIsClicked(!isClicked);
                                                setCurrentUser(user)
                                            }}
                                        >
                                            <UserItem 
                                                className={isClicked ? 'active' : ''}
                                                key={user._id} 
                                                user={user}
                                                
                                            />
                                        </div>
                                    ))
                                : 'No current users.'}
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Chat