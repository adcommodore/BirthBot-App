import { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from './authApiSlice';
import Spinner from '../../components/Spinner';

const Register = () => {
    const adminRef = useRef()
    const errRef = useRef()
    const [ errMsg, setErrMsg ] = useState('')
    const [ formData, setFormData ] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: ''
    })
    const { 
        firstName, 
        lastName, 
        email,
        phoneNumber, 
        password 
    } = formData
    const navigate = useNavigate()
    const [ register, { isLoading } ] = useRegisterMutation()

    useEffect(() => {
        adminRef.current.focus()
    }, [])

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const adminData = await register({ formData }).unwrap()
            setFormData('')
            navigate('/admin/resetpassword')
        } catch (err) {
            if (!err?.originalStatus) {
                setErrMsg('No Server Response');
            } else if (err.originalStatus?.status === 400) {
                setErrMsg('Field missing. Please answer all required fields.');
            } else {
                setErrMsg('Unauthorized');
            }
            errRef.current.focus();
        }
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const content = isLoading ? <Spinner/> : (
        <form style={{ width: "80%", maxWidth: 500}} onSubmit={submitHandler}>
            <h1 className="text-center">Create An Account</h1>
            <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>{errMsg}</p>
            <div>

                <div className='form-group'>
                    <label htmlFor='firstName' className="form-label">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        placeholder="Enter First Name" 
                        value={firstName} 
                        onChange={onChange}
                        required
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='lastName' className="form-label">Last Name</label>
                    <input
                        type="text" 
                        className="form-control"
                        name="lastName"
                        placeholder="Enter Last Name" 
                        value={lastName} 
                        onChange={onChange}
                        required
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='email' className="form-label">Email Address</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Enter Email"
                        value={email} 
                        onChange={onChange}
                        required
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='phoneNumber' className="form-label">Phone Number</label>
                    <input
                        type="number"
                        className="form-control"
                        name="phoneNumber"
                        placeholder="Enter Phone Number" 
                        value={phoneNumber} 
                        onChange={onChange}
                        required
                    />
                </div>

                <div className='form-group'>
                    <label  htmlFor='password' className="form-label">Password</label>
                    <input
                        type="password" 
                        className="form-control"
                        name="password"
                        placeholder="Enter Password"
                        value={password} 
                        onChange={onChange}
                        required
                    />
                </div>

                <button variant="primary" type="submit">
                    Create Account
                </button>

            </div>

            <div className='py-4'>
                <p className="text-center">
                    Already have an account? <Link to="/admin/login">Login</Link>
                </p>
            </div>
        </form>
    )

    return content

}

export default Register