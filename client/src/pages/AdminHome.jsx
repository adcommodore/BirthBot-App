import React from 'react';
import AdminNavBar from '../components/AdminNavBar';
import { Row, Col, Card, Tabs, Tab} from "react-bootstrap";
import Login from '../features/auth/Login';
import Register from '../features/auth/Register';


function AdminHome() {
    return (
    <>
        <AdminNavBar />
        <Row className="admin_bg">
            <Col md={6} ></Col>
            <Col md={6} className="d-flex flex-direction-column align-items-center justify-content-center">
                <Card style={{borderRadius: '10px', border: 'solid 1px grey'}}>
                    <Card.Header style={{textAlign: 'center', padding: '20px 40px 10px 40px'}}>
                        <h1 style={{fontSize: '30px'}}>Together, we can change <br/>maternity care for the better.</h1>
                    </Card.Header>
                    <Tabs fill>
                        <Tab eventKey='login' title="Login"> 
                            <Login />
                        </Tab>
                        <Tab eventKey='register' title="Register">
                            <Register />
                        </Tab>
                    </Tabs>
                </Card>
            </Col>
        </Row>
    </ >
    )
}

export default AdminHome