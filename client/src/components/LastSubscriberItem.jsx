import React from 'react';
import { Link } from 'react-router-dom';
import editIcon from '../assets/editIcon.png';

function LastSubscriberItem({user}) {
    return (
        <div>
            <div style={{border: '2px solid black', borderRadius: '1rem', marginTop: '0.5rem', alignItems: 'center'}}>
                <div style={{margin: '0.5rem'}}>
                    <h4 style={{padding: '0.5rem', display: 'inline'}}> { user.firstName } </h4>
                    <h4 style={{padding: '0.5rem', display: 'inline'}}> { user.lastName } </h4>
                </div>
                <span style={{padding: '0.5rem'}}> { user.phoneNumber } </span>
                <div style={{display: 'inline', margin: '0.5rem'}}>
                    <Link to={``}>
                        <button style={{backgroundColor: "white", border: "none", }} >
                            <img src={editIcon} alt="More Info" style={{height: '1.75rem', width: '1.75rem'}}/>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LastSubscriberItem
