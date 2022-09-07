import React from 'react';
import AdminNavBar from '../components/AdminNavBar';
import { Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import './AdminHome.css';

function Login() {
    return (
    <div>
        <AdminNavBar />
        <Row>
            <Col md={6} className="admin_bg"></Col>
            <Col md={6} className="d-flex flex-direction-column align-items-center justify-content-center" style={{backgroundColor: '#F5F5F5'}}>
                <div>
                    <h1>Together, we can facilitate change in the birth culture of the United States.</h1>
                    <p>We believe every birthing person should feel centered and supported during their pregnancy, birth, and postpartum experiences.</p>
                    <LinkContainer to="/admin/register">
                        <Button varriant="success">
                            Get Started <i className="fas fa-comments admin-message-icon"></i>
                        </Button>
                    </LinkContainer>
                </div>
            </Col>
        </Row>
    </div>
    )
}

export default Login