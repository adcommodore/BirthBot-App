import { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useLoginMutation } from './authApiSlice';
import Spinner from '../../components/Spinner';

const Login = () => {
    const adminRef = useRef()
    const errRef = useRef()
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ errMsg, setErrMsg ] = useState('')
    const navigate = useNavigate()

    const [ login, { isLoading } ] = useLoginMutation()
    const dispatch = useDispatch()

    useEffect(() => {
        adminRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [email, password])

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const adminData = await login({ email, password }).unwrap()
            dispatch(setCredentials({ ...adminData, email }))
            setEmail('')
            setPassword('')
            navigate('/chat')
        } catch (err) {
            if (!err?.originalStatus) {
                setErrMsg('No Server Response');
            } else if (err.originalStatus?.status === 400) {
                setErrMsg('Missing email or password.');
            } else if (err.originalStatus?.status === 401) {
                setErrMsg('Incorrect email or password.');
            } else {
                setErrMsg('Unauthorized');
            }
            errRef.current.focus();
        }
    }
    
    const content = isLoading ? <Spinner/> : (
        <section>
            <h1>Admin Panel Login</h1>
            <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>{errMsg}</p>
            
            <form style={{ width: "80%", maxWidth: 500}} onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="email" className="form-label"></label>
                    <input
                        type="email" 
                        className="form-control"
                        name="email"
                        ref={adminRef}
                        placeholder="Enter Email" 
                        value={email} 
                        onChange={ (e) => setEmail(e.target.value) }
                        autoComplete="off"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label"></label>
                    <input
                        type="password" 
                        className="form-control"
                        name="password"
                        placeholder="Enter Password" 
                        value={password} 
                        onChange={ (e) => setPassword(e.target.value) }
                        required
                    />
                </div>
                <div className='py-4'>
                    <Link className="text-muted" style={{textDecoration: "none"}} to="/admin/passwordreset">Forgot password?</Link>
                </div>
                <button variant="primary" type="submit" >
                    Sign In
                </button>
                <div className='py-4'>
                    <p className="text-center">
                        Need to create an account? <Link to="/admin/register">Sign Up</Link>
                    </p>
                </div>
            </form>
        </section>
    )

    return content
}

export default Login