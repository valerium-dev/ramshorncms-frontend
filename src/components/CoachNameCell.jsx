import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

function CoachNameCell({ value }){
    const [coachData, setCoachData] = useState({});

    useEffect(() => {
        fetch(`https://manager-prod.herokuapp.com/coaches/${value}`, {method: "GET"})
            .then(res => res.json())
            .then(response => {
                setCoachData(response);
            })
            .catch(error => console.log(error))
    }, [value]);

    return (
        <Link className={`coachNameCell align-items-center text-decoration-none`} to={`/coaches/${ value }`}>
            <div class="px-2">{ coachData.first_name + " " + coachData.last_name }</div>
        </Link>
    );
}

export default CoachNameCell;
