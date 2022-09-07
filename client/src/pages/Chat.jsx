import { useSelector } from 'react-redux';
import { selectCurrentAdmin } from '../features/auth/authSlice';
import { Row, Col, Container } from 'react-bootstrap';
import AdminNavBar from '../components/AdminNavBar';
import UsersList from '../features/users/UserList';
import MessageUser from '../features/messages/MessageUser';
import MessageList from '../features/messages/MessageList';
import MessageForm from '../features/messages/MessageForm';

function Chat() {
  const admin = useSelector(selectCurrentAdmin)
  const welcome = admin ? `Welcome ${admin.firstName}` : 'Welcome!'

  const content = (
    <div>
      <AdminNavBar />
      <section>
        <h1>{welcome}</h1>
      </section>
      <Container style={{ marginTop: '1rem'}}>
        <MessageUser />
        <Row>
          <Col md={8}>
            <MessageList />
            <MessageForm />
          </Col>
          <Col md={4}>
            <UsersList />
          </Col>
        </Row>  
      </Container>
    </div>
  )
  
  return content
}

export default Chat