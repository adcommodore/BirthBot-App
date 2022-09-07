import AdminNavBar from '../components/AdminNavBar';
import { Row, Col } from "react-bootstrap";
import Register from '../features/auth/Register';
import './AdminRegister.css';

function AdminRegister () {

  return (
    <>
        <AdminNavBar />
        <Row>
          <Col 
            md={6} 
            className="d-flex flex-direction-column align-items-center justify-content-center" 
            style={{backgroundColor: '#F5F5F5'}}
          >
            <Register />
          </Col>
          <Col md={6} className="setup_bg">
          </Col>
        </Row>
    </>
  )
}

export default AdminRegister