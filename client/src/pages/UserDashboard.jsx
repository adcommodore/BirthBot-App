import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentAdmin } from '../features/auth/authSlice';
import AdminNavBar from '../components/AdminNavBar';

function UserDashboard() {
  const navigate = useNavigate()
  const admin = useSelector(selectCurrentAdmin)

  useEffect(() => {
      if(!admin) {
        navigate('/admin/login')
      }
  }, [admin, navigate])
  
  return (
    <div>
        <AdminNavBar />
        UserDashboard
    </div>
  )
}

export default UserDashboard