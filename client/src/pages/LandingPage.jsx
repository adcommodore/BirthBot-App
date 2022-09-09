import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Preloader from '../components/Preloader';
import LandingPageNavBar from '../components/LandingPageNavBar';
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
                <LandingPageNavBar/>
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
                    <Button variant='primary'>Get Started!</Button>
                </div>
            </div>
            }
        </div>
    
    )
}

export default LandingPage;


