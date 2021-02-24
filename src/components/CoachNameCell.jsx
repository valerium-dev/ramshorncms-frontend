import React from 'react';
import { Link } from 'react-router-dom';

function CoachNameCell({ value }){
    return (
        <Link className={`nameCell text-decoration-none`} to={`/coaches/${ value.id }`}>
            <div>{ value.name }</div>
        </Link>
    );
}

export default CoachNameCell;
