import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

function CoachNameCell({ value }){
    const [coachData, setCoachData] = useState({});

    useEffect(() => {
        async function fetchCoachData() {
            if (!value) return;
            const response = await fetch(`https://manager-prod.herokuapp.com/coaches/${value}`, {method: "GET"});
            const coachData = await response.json();
            setCoachData(coachData);
        }
        fetchCoachData().catch(error => console.log(error));
    }, [value]);

    return (
        !value ?
            <div className={`align-items-center text-decoration-none px-2`}>N/A</div> :
            <Link className={`coachNameCell align-items-center text-decoration-none`} to={`/coaches/${ value }`}>
                <div class="px-2">{ coachData.first_name + " " + coachData.last_name }</div>
            </Link>
    );
}

export default CoachNameCell;
