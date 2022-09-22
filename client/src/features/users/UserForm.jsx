import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { Form, Button, Container, Col, Row, Alert } from 'react-bootstrap';
import { useCreateUserMutation } from "./userApiSlice";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./userSlice";


const UserForm = () => {
    const initialUserState = {
        _id: '',
        firstName: '',
        lastName: '',
        estimatedDueDate: '',
        phoneNumber: '',
        weeklySchedule: [],
        timeZone: '',
        dailySchedule: '',
    };

    const [ user, setUser ] = useState(initialUserState);
    const [ error, setError ] = useState('');
    const navigate = useNavigate();
    const [createUser] = useCreateUserMutation();
    const dispatch = useDispatch();

    const signupHandler = (e) => {
        e.preventDefault();
        const {
            firstName,
            lastName,
            estimatedDueDate,
            phoneNumber,
            weeklySchedule,
            timeZone,
            dailySchedule
        } = user;
        createUser({
            firstName,
            lastName,
            estimatedDueDate,
            phoneNumber,
            weeklySchedule,
            timeZone,
            dailySchedule
        }).then(({data, error}) => {
            console.log({data, error})
            if (!error) {
                console.log(data)
                dispatch(setCurrentUser(data))
                navigate('/checkyourphone/')
            } else {
                setError(error.data.message)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    const formValid = () => {

    }

    return (
        
        <Form onSubmit={signupHandler}>

            { (error !== "") &&
                <Alert>
                    <p>{error}</p>
                </Alert>
            }

            <h2 style={{textAlign: 'center', fontSize: '42px'}}>Sign Up</h2>

            <h4>Personal Information</h4> 
            <hr/>

            <Row className="justify-content-lg-center">
                <Col lg='9'>
                    <Form.Group className="mb-3">
                        <Form.Label>Please enter your first name:</Form.Label>
                        <Form.Control 
                            type='text'
                            style={{textTransform:"capitalize"}}
                            name='firstName'
                            placeholder="Jane"
                            value={user.firstName}
                            onChange={(e) => setUser({...user, firstName: e.target.value })}
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row className="justify-content-lg-center">
                <Col lg='9'>
                    <Form.Group className="mb-3">
                        <Form.Label>Please enter your last name:</Form.Label>
                        <Form.Control
                            type='text'
                            style={{textTransform:"capitalize"}}
                            name="lastName"
                            placeholder="Doe"
                            value={user.lastName}
                            onChange={(e) => setUser({...user, lastName: e.target.value })}
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row className="justify-content-lg-center">
                <Col lg='9'>
                    <Form.Group className="mb-3">
                        <Form.Label>Please enter the first day of your last period:</Form.Label>
                        <Form.Control
                            type='date'
                            name='estimatedDueDate'
                            value={user.estimatedDueDate}
                            onChange={(e) => setUser({...user, estimatedDueDate: e.target.value })}
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row className="justify-content-lg-center">
                <Col lg='9'>
                    <Form.Group className="mb-3">
                        <Form.Label>Please enter your phone number:</Form.Label>
                        <PhoneInput
                            style={{}}
                            defaultCountry="US"
                            value={user.phoneNumber}
                            onChange={(phoneNumber) => setUser({...user, phoneNumber: phoneNumber })}
                            required
                        />
                        <Form.Text>Your phone number is kept confidential and will not be shared.</Form.Text>  
                    </Form.Group>
                </Col>
            </Row>

            <h4>Select Your Schedule</h4>
            <hr/>

            <Row className="justify-content-lg-center">
                <Col lg='9'>
                    <Form.Group className="mb-3">
                        <Form.Label>Which days of the week would you like to receive text message updates from BirthBot?</Form.Label>
                        <Container>
                            <Row>
                                <Col>
                                    <Form.Check
                                        label="Sunday"
                                        value="Sunday" 
                                        onChange={(e) => setUser({...user, weeklySchedule: [...user.weeklySchedule, e.target.value]})}
                                    />
                                    <Form.Check 
                                        label="Monday"
                                        value="Monday"
                                        onChange={(e) => setUser({...user, weeklySchedule: [...user.weeklySchedule, e.target.value]})}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        label="Tuesday"
                                        value="Tuesday" 
                                        onChange={(e) => setUser({...user, weeklySchedule: [...user.weeklySchedule, e.target.value]})}
                                    />
                                    <Form.Check 
                                        label="Wednesday"
                                        value="Wednesday" 
                                        onChange={(e) => setUser({...user, weeklySchedule: [...user.weeklySchedule, e.target.value]})}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        label="Thursday"
                                        value="Thursday" 
                                        onChange={(e) => setUser({...user, weeklySchedule: [...user.weeklySchedule, e.target.value]})}
                                    />
                                    <Form.Check
                                        label="Friday"
                                        value="Friday" 
                                        onChange={(e) => setUser({...user, weeklySchedule: [...user.weeklySchedule, e.target.value]})}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check 
                                        label="Saturday"
                                        value="Saturday" 
                                        onChange={(e) => setUser({...user, weeklySchedule: [...user.weeklySchedule, e.target.value]})}
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </Form.Group>
                </Col>
            </Row>

            <Row className="justify-content-lg-center">
                <Col lg='9'>
                    <Form.Group className="mb-3">
                        <Form.Label>What time zone do you live in?</Form.Label>
                        <Form.Select value={user.timeZone} onChange={(e) => setUser({...user, timeZone: e.target.value})}>
                            <option value="" defaultValue>Select Time Zone</option>
                            <option value="Eastern Daylight Time" name="Eastern Daylight Time">Eastern Daylight Time (UTC-4)</option>
                            <option value="Central Daylight Time" name="Central Daylight Time">Central Daylight Time (UTC-5)</option>
                            <option value="Mountain Daylight Time" name="Mountain Daylight Time">Mountain Daylight Time (UTC-6)</option>
                            <option value="Arizona Mountain Standard Time"name="Arizona Mountain Standard Time">Arizona Mountain Standard Time (UTC-7)</option>
                            <option value="Pacific Daylight Time" name="Pacific Daylight Time">Pacific Daylight Time (UTC-7)</option>
                            <option value="Alaska Daylight Time" name="Alaska Daylight Time">Alaska Daylight Time (UTC-8)</option>
                            <option value="Aleutian Daylight Time" name="Aleutian Daylight Time">Aleutian Daylight Time (UTC-9)</option>
                            <option value="Hawaii Standard Time" name="Hawaii Standard Time">Hawaii Standard Time (UTC-10)</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>

            <Row className="justify-content-lg-center">
                <Col lg='9'>
                    <Form.Group className="mb-3">
                        <Form.Label>What time of the day would you like to receive text message updates from BirthBot?</Form.Label>
                        <Form.Select>
                            <option value="" defaultValue>Select Time</option>
                            <option value="6:00 AM" name="6:00 AM">6:00 AM</option>
                            <option value="6:30 AM" name="6:30 AM">6:30 AM</option>
                            <option value="7:00 AM" name="7:00 AM">7:00 AM</option>
                            <option value="7:30 AM" name="7:30 AM">7:30 AM</option>
                            <option value="8:00 AM" name="8:00 AM">8:00 AM</option>
                            <option value="8:30 AM" name="8:30 AM">8:30 AM</option>
                            <option value="9:00 AM"name="9:00 AM">9:00 AM</option>
                            <option value="9:30 AM" name="9:30 AM">9:30 AM</option>
                            <option value="10:00 AM" name="10:00 AM">10:00 AM</option>
                            <option value="10:30 AM"name="10:30 AM">10:30 AM</option>
                            <option value="11:00 AM" name="11:00 AM">11:00 AM</option>
                            <option value="11:30 AM" name="11:30 AM">11:30 AM</option>
                            <option value="12:00 PM" name="12:00 PM">12:00 PM</option>
                            <option value="12:30 PM" name="12:30 PM">12:30 PM</option>
                            <option value="1:00 PM" name="1:00 PM">1:00 PM</option>
                            <option value="1:30 PM" name="1:30 PM">1:30 PM</option>
                            <option value="2:00 PM" name="2:00 PM">2:00 PM</option>
                            <option value="2:30 PM" name="2:30 PM">2:30 PM</option>
                            <option value="3:00 PM" name="3:00 PM">3:00 PM</option>
                            <option value="3:30 PM"name="3:30 PM">3:30 PM</option>
                            <option value="4:00 PM" name="4:00 PM">4:00 PM</option>
                            <option value="4:30 PM" name="4:30 PM">4:30 PM</option>
                            <option value="5:00 PM" name="5:00 PM">5:00 PM</option>
                            <option value="5:30 PM" name="5:30 PM">5:30 PM</option>
                            <option value="6:00 PM" name="6:00 PM">6:00 PM</option>
                            <option value="6:30 PM" name="6:30 PM">6:30 PM</option>
                            <option value="7:00 PM" name="7:00 PM">7:00 PM</option>
                            <option value="7:30 PM" name="7:30 PM">7:30 PM</option>
                            <option value="8:00 PM" name="8:00 PM">8:00 PM</option>
                            <option value="8:30 PM"name="8:30 PM">8:30 PM</option>
                            <option value="9:00 PM"name="9:00 PM">9:00 PM</option>
                            <option value="9:30 PM" name="9:30 PM">9:30 PM</option>
                            <option value="10:00 PM" name="10:00 PM">10:00 PM</option>
                            <option value="10:30 PM" name="10:30 PM">10:30 PM</option>
                            <option value="11:00 PM" name="11:00 PM">11:00 PM</option>
                            <option value="11:30 PM" name="11:30 PM">11:30 PM</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>

            <Row className="justify-content-lg-center" style={{ margin: '8px 0px'}}>
                <Col lg='9'>
                    <div className="row justify-content-center" >
                        <Button type='submit' disabled={formValid}>Meet BirthBot!</Button>
                    </div>
                </Col>
            </Row>

        </Form>
   
    )
}

export default UserForm