import AdminNavBar from '../components/AdminNavBar';
import { Row, Col } from "react-bootstrap";
import Login from '../features/auth/Login';

const AdminLogin = () => {

    return (
        <>
            <AdminNavBar />
            <Row>
                <Col className="login_bg">
                </Col>
                <Col className="d-flex flex-direction-column align-items-center justify-content-center" style={{backgroundColor: '#F5F5F5'}}>
                    <Login />
                </Col>
            </Row>
        </>
    )
}

export default AdminLogin