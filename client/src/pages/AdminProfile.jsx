import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentAdmin } from '../features/auth/authSlice';
import Navigation from '../components/Navigation';


function AdminProfile() {
    const navigate = useNavigate()

    const admin = useSelector(selectCurrentAdmin)


    useEffect(() => {
        if(!admin) {
            navigate('/admin/login')
        }
    }, [admin, navigate])

    return (
        <>
            <Navigation />
            <div className="container">
                <header className="jumbotron">
                    <h3>
                        <strong>{admin && admin.firstName}</strong> Profile
                    </h3>
                </header>
                <p>
                    <strong>Email:</strong> {admin && admin.email}
                </p>
                <p>
                    <strong>Phone Number:</strong> {admin && admin.phoneNumber}
                </p>
                <p>
                    <Link to="/admin/resetpassword">Change Password</Link>
                </p>
            </div>
        </>
    )
}

export default AdminProfile