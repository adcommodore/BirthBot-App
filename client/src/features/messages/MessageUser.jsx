import { useSelector } from 'react-redux';
import { selectAllUsers } from '../users/userSlice';
import { Link } from 'react-router-dom';

function MessageUser({ userId }) {
    const users = useSelector(selectAllUsers)

    const currentUser = users.find(user => user.id === userId);
    return (
        <h3> 
            { currentUser 
                ? <Link to={`/user/${userId}`}>{currentUser.firstName + " " + currentUser.lastName}</Link>
                : 'Unknown User'
            }
        </h3>
    )
}

export default MessageUser