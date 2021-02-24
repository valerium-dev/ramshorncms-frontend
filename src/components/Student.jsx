import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {Column, Spinner, Table} from 'react-rainbow-components';
import ResponseDateCell from './ResponseDateCell';
import ResponseIdCell from './ResponseIdCell';

function Student(props){
    // TODO: Add editing state

    const [studentData, setStudentData] = useState({});
    const [coachData, setCoachData] = useState({});
    const [surveyResponses, setSurveyResponses] = useState({});
    const [didLoad, setDidLoad] = useState(false);

    useEffect(() => {
        fetch(`https://manager-prod.herokuapp.com/students/${props.match.params.id}`, {method: "GET"})
            .then(res => res.json())
            .then(studentData => {
                const surveyResponseIds = studentData.responses.map(item => {
                    return {
                        "id": item
                    };
                });
                setStudentData(studentData);
                setSurveyResponses(surveyResponseIds);
                setDidLoad(true);
            })
            .catch(error => console.log(error));
    }, [props.match.params.id]);

    useEffect(() => {
        fetch(`https://manager-prod.herokuapp.com/coaches/${studentData.coach}`, {method: "GET"})
            .then(res => res.json())
            .then(coachData => {
                setCoachData(coachData);
            })
            .catch(error => console.log(error));
    }, [studentData.coach]);

    if (didLoad) {
        return (
            <div className="student">
                <div className={`container my-3`}>
                    <h1>{studentData.first_name + " " + studentData.last_name}</h1>
                    <div>
                        {"EID: " + studentData.eid + " | Coach: "}
                        <Link to={`/coaches/${studentData.coach}`}>
                            {`${coachData.first_name + " " + coachData.last_name}`}
                        </Link>
                    </div>
                </div>
                <div className="container my-2">
                    <div class={`row`}>
                        <div class="col-lg-6 my-2">
                            <h5>{studentData.responses.length} {studentData.responses.length > 1 || studentData.responses.length === 0 ? "Responses" : "Response"}</h5>
                            <div class="mb-3">
                                <Table isLoading={!didLoad} data={surveyResponses} keyField="id">
                                    <Column width={125} header={`Date`} field={`id`} component={ResponseDateCell}/>
                                    <Column header={`Response ID`} field={`id`} component={ResponseIdCell}/>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (<Spinner/>);
    }
}

export default Student;
