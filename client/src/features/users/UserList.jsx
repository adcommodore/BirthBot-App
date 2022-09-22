import { useState } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { useGetUsersQuery } from './userApiSlice';

const UserList = (props) => {
    const [ currentUser, setCurrentUser ] = useState(null);
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetUsersQuery()

    if (isLoading) return <div>Loading...</div>

    const userSelectionHandler = (user) => {
        setCurrentUser(user)
    }
    
    return (
        <Container>
            <h2>Current Subscribers</h2>
            {users 
                ? users.map((user) => (
                    <ListGroup.Item key={user.id} onClick={userSelectionHandler(user)}>
                        <h4>{user.firstName} {user.lastName}</h4>
                        <h6>{user.phoneNumber}</h6>
                    </ListGroup.Item>
                ))
                : 'No current users.'}
        </Container>
    )
}

export default UserList