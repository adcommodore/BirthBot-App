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
    const [ error, setError ] = useState('')
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
            })
                .then(({data, error}) => {
                    console.log({data, error})
                    if (!error) {
                        console.log(data)
                        dispatch(setCurrentUser(data))
                        navigate('/checkyourphone/')
                    }
                    else {
                        setError(error.data.message)
                    }
                })
                .catch(e => {
                    console.log(e)
                });
        }

    return (
        <form onSubmit={signupHandler}>
            { (error !== "") &&
                <div>
                    {error}
                </div>
            }
            <div>
                <div className='form-group'>
                    <label htmlFor='firstName' className="form-label">Please enter your first name:</label>
                    <input
                        type='text'
                        className='form-control'
                        name="firstName"
                        value={user.firstName}
                        onChange={(e) => setUser({...user, firstName: e.target.value })}
                        required
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='lastName' className="form-label">Please enter your last name:</label>
                    <input
                        type='text'
                        className='form-control'
                        name="lastName"
                        value={user.lastName}
                        onChange={(e) => setUser({...user, lastName: e.target.value })}
                        required
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='estimatedDueDate' className="form-label">Please enter the first day of your last period:</label>
                    <input
                        type='date'
                        className='form-control'
                        name='estimatedDueDate'
                        value={user.estimatedDueDate}
                        onChange={(e) => setUser({...user, estimatedDueDate: e.target.value })}
                        required
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='phoneNumber' className="form-label">Please enter your phone number:</label>
                    <input
                        type='number'
                        className='form-control'
                        name='phoneNumber'
                        value={user.phoneNumber}
                        onChange={(e) => setUser({...user, phoneNumber: e.target.value })}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor='weeklySchedule' className="form-label">Which days of the week would you like to receive text message updates from BirthBot?</label>
                    <div className="row justify-content-evenly" >
                        <div className="col-6 col-md-1">
                            <div className="form-check">
                                <input 
                                    type="checkbox" 
                                    className="form-check-input" 
                                    name="Sunday"
                                    value="Sunday" 
                                    onChange={(e) => setUser({...user, weeklySchedule: [...user.weeklySchedule, e.target.value]})}
                                />
                                <label htmlFor='Sunday' className="form-check-label">Sunday</label>
                            </div>
                            <div className="form-check">
                                <input 
                                    type="checkbox" 
                                    className="form-check-input" 
                                    name="Monday"
                                    value="Monday"
                                    onChange={(e) => setUser({...user, weeklySchedule: [...user.weeklySchedule, e.target.value]})}
                                />
                                <label htmlFor='Monday' className="form-check-label">Monday</label>
                            </div>
                        
                        </div>
                        <div className="col-6 col-md-1">
                            <div className="form-check">
                                <input 
                                    type="checkbox"
                                    className="form-check-input"
                                    name="Tuesday"
                                    value="Tuesday" 
                                    onChange={(e) => setUser({...user, weeklySchedule: [...user.weeklySchedule, e.target.value]})}
                                />
                                <label htmlFor='Tuesday' className="form-check-label">Tuesday</label>
                            </div>
                            <div className="form-check">
                                <input 
                                    type="checkbox" 
                                    className="form-check-input" 
                                    name="Wednesday"
                                    value="Wednesday" 
                                    onChange={(e) => setUser({...user, weeklySchedule: [...user.weeklySchedule, e.target.value]})}
                                />
                                <label htmlFor='Wednesday' className="form-check-label">Wednesday</label>
                            </div>
                        </div>
                        <div className="col-6 col-md-1">
                            <div className="form-check">
                                <input  
                                    type="checkbox" 
                                    className="form-check-input" 
                                    name="Thursday"
                                    value="Thursday" 
                                    onChange={(e) => setUser({...user, weeklySchedule: [...user.weeklySchedule, e.target.value]})}
                                />
                                <label htmlFor='Thursday' className="form-check-label">Thursday</label>
                            </div>
                            <div className="form-check">
                                <input 
                                    type="checkbox" 
                                    className="form-check-input" 
                                    name="Friday"
                                    value="Friday" 
                                    onChange={(e) => setUser({...user, weeklySchedule: [...user.weeklySchedule, e.target.value]})}
                                />
                                <label htmlFor='Friday' className="form-check-label">Friday</label>
                            </div>
                        </div>
                        <div className="col-6 col-md-1">
                            <div className="form-check">
                                <input 
                                    type="checkbox" 
                                    className="form-check-input" 
                                    name="Saturday"
                                    value="Saturday" 
                                    onChange={(e) => setUser({...user, weeklySchedule: [...user.weeklySchedule, e.target.value]})}
                                />
                                <label htmlFor='Saturday' className="form-check-label">Saturday</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor='TimeZone' className="form-label">What time zone do you live in?</label>
                    <select className="form-select" value={user.timeZone} onChange={(e) => setUser({...user, timeZone: e.target.value})}>
                        <option value="" defaultValue>Select Time Zone</option>
                        <option value="Eastern Daylight Time" name="Eastern Daylight Time">Eastern Daylight Time (UTC-4)</option>
                        <option value="Central Daylight Time" name="Central Daylight Time">Central Daylight Time (UTC-5)</option>
                        <option value="Mountain Daylight Time" name="Mountain Daylight Time">Mountain Daylight Time (UTC-6)</option>
                        <option value="Arizona Mountain Standard Time"name="Arizona Mountain Standard Time">Arizona Mountain Standard Time (UTC-7)</option>
                        <option value="Pacific Daylight Time" name="Pacific Daylight Time">Pacific Daylight Time (UTC-7)</option>
                        <option value="Alaska Daylight Time" name="Alaska Daylight Time">Alaska Daylight Time (UTC-8)</option>
                        <option value="Aleutian Daylight Time" name="Aleutian Daylight Time">Aleutian Daylight Time (UTC-9)</option>
                        <option value="Hawaii Standard Time" name="Hawaii Standard Time">Hawaii Standard Time (UTC-10)</option>
                    </select>
                </div>
        
                <div className="mb-3">
                    <label htmlFor="dailySchedule" className="form-label">What time of the day would you like to receive text message updates from BirthBot?</label>
                    <select className="form-select" value={user.dailySchedule} onChange={(e) => setUser({...user, dailySchedule: e.target.value})}>
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
                    </select>
                </div>
                <div className="row justify-content-center" style={{ marginLeft: "3rem", marginRight: "3rem"}}>
                    <button className="btn btn-primary" type='submit'>Meet BirthBot!</button>
                </div>
            </div>
        </form>
    )
}

export default UserForm