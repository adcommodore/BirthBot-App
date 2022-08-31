import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentAdmin } from '../features/auth/authSlice';
import Navigation from '../components/Navigation';

function Broadcast() {
    const navigate = useNavigate();
    const [ message, setMessage ] = useState('')
    const admin = useSelector(selectCurrentAdmin)

    useEffect(() => {
        if(!admin) {
            navigate('/admin/login')
        }
    }, [admin, navigate])

    return (
        <>
            <Navigation />
            <section style={{ textAlign: 'center'}}>
                <input 
                    placeholder='Write a message...' 
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button variant="primary" type="submit" style={{ backgroundColor: "#4C455F" }} >
                    <i className='fas fa-paper-plane'></i>
                </button>
            </section>
        </>
    )
}

export default Broadcast