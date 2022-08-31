import UserForm from "../features/users/UserForm";

function UserSignup() {

    return (
        <div id='background' className='container-fluid'>
            <div 
                className="container-md mx-auto" 
                style={{ 
                    marginTop: '3rem', 
                    padding: '2rem', 
                    backgroundColor: '#F5F5F5', 
                    opacity: '0.94', 
                    borderRadius: '1rem'
                }}
            >
            <UserForm />
            </div>
        </div>
    )
}

export default UserSignup