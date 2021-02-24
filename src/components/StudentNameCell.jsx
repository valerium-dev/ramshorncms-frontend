import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

function StudentNameCell({ value }){
    const [studentData, setStudentData] = useState({});

    useEffect(() => {
        fetch(`https://manager-prod.herokuapp.com/students/${value}`, {method: "GET"})
            .then(res => res.json())
            .then(response => {
                setStudentData(response);
            })
            .catch(error => console.log(error))
    }, [value]);

    return (
        <Link className={`studentNameCell align-items-center text-decoration-none`} to={`/students/${ value.id }`}>
            <div>{ studentData.first_name + " " + studentData.last_name }</div>
        </Link>
    );
}

export default StudentNameCell;