import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CheckYourPhone() {
    const { id } = useParams();
    
    return (
    <>
        <h4> have successfully sign up for BirthBot.</h4>
        <h3>Check your phone to see if BirthBot sent you a text!</h3>
    </>
    )
}


export default CheckYourPhone