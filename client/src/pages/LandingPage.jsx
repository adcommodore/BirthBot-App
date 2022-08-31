import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Preloader from '../components/Preloader';

function LandingPage () {
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 19000 )
    }, [])

    return (
        <div>
            {
                loading ?
                
                <Preloader
                loading={loading}
                />

                :
        
            <div className="container-md" style={{ marginTop: '2rem' }}>
                <div className="text-center">
                    <h1 className="display-3">Welcome!</h1> 
                    <h1 className="display-3">Sign up for BirthBot!</h1>
                    <Link className="btn btn-primary" to="/signup">Let's Get Started</Link>
                </div>
            </div>
            }
        </div>
    
    )
}

export default LandingPage;


