import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/users/userSlice';

function CheckYourPhone() {
    const user = useSelector(selectCurrentUser)

    return (
    <>
        <h4> {user.firstName} have successfully sign up for BirthBot.</h4>
        <h3>Check your phone to see if BirthBot sent you a text!</h3>
    </>
    )
}


export default CheckYourPhone