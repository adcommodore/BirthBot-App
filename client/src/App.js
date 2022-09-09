import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import UserSignup from './pages/UserSignup';
import CheckYourPhone from './pages/CheckYourPhone';
import AdminHome from './pages/AdminHome';
import AdminRegister from './pages/AdminRegister';
import ChangePassword from './pages/ChangePassword';
import AdminLogin from './pages/AdminLogin';
import Chat from './pages/Chat';
import ContentManager from './pages/ContentManager';
import AdminProfile from './pages/AdminProfile';
import Broadcast from './pages/Broadcast';
import UserDashboard from './pages/UserDashboard';
import RequireAuth from './features/auth/RequireAuth';

function App() {
  return (
    <>
        <Routes>
          <Route element = { <Layout/> } path="/">

            // public routes
            <Route element = { <LandingPage/> } index />
            <Route element = { <UserSignup/> } path="/signup" />
            <Route element = { <CheckYourPhone/> } path="/checkyourphone/" />
            <Route element = { <AdminHome/> } path="/admin" />
            <Route element = { <AdminRegister/> } path="/admin/register" />
            <Route element = { <ChangePassword/> } path="/admin/resetpassword" />
            <Route element = { <AdminLogin/> } path="/admin/login" />

            // protected routes
            <Route element={<RequireAuth/>}>
              <Route element = { <Chat/> } path="/chat" />
              <Route element = { <ContentManager/> } path="/content" />
              <Route element = { <AdminProfile/> } path="/admin/profile" />
              <Route element = { <Broadcast/> } path="/broadcast" />
              <Route element = { <UserDashboard/> } path="/users" />
            </Route>

          </Route>
  
          <Route element={ < Navigate to ="/" replace /> } path="*" />

        </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
