import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Lockr from 'lockr';

function StudentNameCell({ value }){
    const [studentData, setStudentData] = useState({});

    useEffect(() => {
        const cachedData = Lockr.get(value + 'student', -1);
        if (cachedData !== -1) {
            setStudentData(cachedData)
            return;
        }

        fetch(`https://manager-prod.herokuapp.com/students/${value}`, {method: "GET"})
            .then(res => res.json())
            .then(response => {
                setStudentData(response);
                Lockr.set(value + 'student', response);
            })
            .catch(error => console.log(error))
    }, [value]);

    return (
        <Link className={`studentNameCell align-items-center text-decoration-none`} to={`/students/${ value }`}>
            { studentData.first_name + " " + studentData.last_name }
        </Link>
    );
}

export default StudentNameCell;