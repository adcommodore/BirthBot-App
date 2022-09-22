import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import AdminNavBar from '../components/AdminNavBar';
import UserList from '../features/users/UserList';
import MessageForm from '../features/messages/MessageForm';
import MessageList from '../features/messages/MessageList';

const Chat = (props) => {
  const [ currentUser, setCurrentUser ] = useState(null);
  const selectUser = (user) => {
    setCurrentUser(user)
  }
  return (
    <>
      <AdminNavBar />
      <Container>
        <Row>
          <Col md={8}>
            <Row style={{height: '600px', border: '1px solid light grey', borderRadius: '10px', margin: '12px 0'}}>
              <MessageList user={props.currentUser}/>
            </Row>
            <Row>
              <MessageForm user={props.currentUser}/>
            </Row>
          </Col>
          <Col md={4}>
            <UserList selectUser={selectUser}/>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Chat