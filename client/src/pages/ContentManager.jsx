import { Container, Row, Col } from 'react-bootstrap'
import AdminNavBar from '../components/AdminNavBar';
import ContentList from '../features/content/ContentList';

function ContentManager() {

  
  return (
    <div>
        <AdminNavBar />
        <Container>
          <Row>
            <Col>
              <ContentList />
            </Col>
          </Row>
        </Container>
    </div>
  )
}

export default ContentManager