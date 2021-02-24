import React, {useState, useEffect} from 'react';

function StudentIDCell({ value }){
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
        <div className={`studentIDCell align-items-center text-decoration-none px-2`}>
            { studentData.eid }
        </div>
    );
}

export default StudentIDCell;