import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Preloader from '../components/Preloader';
import './LandingPage.css';

function LandingPage () {
    const [ loading, setLoading ] = useState(false);

    // useEffect(() => {
    //     setLoading(true)
    //     setTimeout(() => {
    //         setLoading(false)
    //     }, 19000 )
    // }, [])

    return (
        <div>
            {
                loading ?
                
                <Preloader
                loading={loading}
                />

                :
        
            <div>
                <div className='background'>
                    <div className='title'>
                        <h1 className="display-3">BirthBot</h1>
                    </div>
                    <div className='sub-container'>
                        <h6 className='info-text'>
                            The first ever SMS-based childbirth educating chatbot powered by Al.
                        </h6>
                        <div className='color-block'>
                        </div>
                    </div>
                    <Link id="button" className="btn btn-primary" to="/signup">Let's Get Started</Link>
                </div>
            </div>
            }
        </div>
    
    )
}

export default LandingPage;


