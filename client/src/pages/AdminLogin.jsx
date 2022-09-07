import AdminNavBar from '../components/AdminNavBar';
import { Row, Col } from "react-bootstrap";
import Login from '../features/auth/Login';
import './AdminLogin.css';

const AdminLogin = () => {

    return (
        <>
            <AdminNavBar />
            <Row>
                <Col md={6} className="login_bg">
                </Col>
                <Col md={6} className="d-flex flex-direction-column align-items-center justify-content-center" style={{backgroundColor: '#F5F5F5'}}>
                    <Login />
                </Col>
            </Row>
        </>
    )
}

export default AdminLogin