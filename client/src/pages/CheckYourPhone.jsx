import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUserById } from '../features/users/userSlice';
import { useSendMessageMutation } from '../features/messages/msgSlice';
import { useParams } from 'react-router-dom';

function CheckYourPhone() {
    const { id } = useParams();
    const user = useSelector(selectUserById(id))
    const body = "Hi! I'm BirthBot. I'm here to answer all you pregnancy, birth, and postpartum related questions."
    
    
    useSendMessageMutation({
        body: body,
        userId: id
    })

    return (
    <>
        <h4> {user.firstName} have successfully sign up for BirthBot.</h4>
        <h3>Check your phone to see if BirthBot sent you a text!</h3>
    </>
    )
}


export default CheckYourPhone