import React, {useState, useEffect} from 'react';
import Lockr from "lockr";

function StudentIDCell({ value }){
    const [studentData, setStudentData] = useState({});

    useEffect(() => {
        const cachedData = Lockr.get(value + 'sid', -1);
        if (cachedData !== -1) {
            setStudentData(cachedData)
            return;
        }

        fetch(`https://manager-prod.herokuapp.com/students/${value}`, {method: "GET"})
            .then(res => res.json())
            .then(response => {
                setStudentData(response);
                Lockr.get(value + 'sid')
            })
            .catch(error => console.log(error))
    }, [value]);

    return (
        <div className={`studentIDCell align-items-center text-decoration-none px-2`}>
            { studentData.eid }
        </div>
    );
}

export default StudentIDCell;