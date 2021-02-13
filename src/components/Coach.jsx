import React, { useState, useEffect } from 'react';
import {Column, Spinner, Table} from 'react-rainbow-components';
import ResponseDateCell from './ResponseDateCell';
import ResponseIdCell from './ResponseIdCell';

function Coach(props){
    // TODO: Add editing state
    // TODO: Add student data and response data

    const [coachData, setCoachData] = useState({});
    const [surveyResponses, setSurveyResponses] = useState({});
    const [studentIds, setStudentIds] = useState({});
    const [didLoad, setDidLoad] = useState(false);

    useEffect(() => {
        fetch(`https://manager-prod.herokuapp.com/coaches/${props.match.params.id}`, {method: "GET"})
            .then(res => res.json())
            .then(coachData => {
                const surveyResponseIds = coachData.responses.map(item => {
                    return {
                        "id": item
                    };
                });
                const studentIds = coachData.students.map(item => {
                    return {
                        "id": item
                    };
                });
                setCoachData(coachData);
                setSurveyResponses(surveyResponseIds);
                setStudentIds(studentIds);
                setDidLoad(true);
            })
            .catch(error => console.log(error));
    }, [props.match.params.id]);

    if (didLoad) {
        return (
            <div className="coach">
                <div className={`container my-3`}>
                    <h1>{coachData.first_name + " " + coachData.last_name}</h1>
                    <p>{"EID: " + coachData.eid + " | " + coachData.email}</p>
                </div>
                <div className="container my-2">
                    <div class={`row`}>
                       <div class="col-lg-6 my-2">
                           <h5>{coachData.responses.length} {coachData.responses.length > 1 || coachData.responses.length === 0 ? "Responses" : "Response"}</h5>
                           <div class="mb-3">
                               <Table isLoading={!didLoad} data={surveyResponses} keyField="id">
                                   {/* TODO: Create ResponseCell component */}
                                   <Column width={125} header={`Date`} field={`id`} component={ResponseDateCell}/>
                                   <Column header={`Response ID`} field={`id`} component={ResponseIdCell}/>
                               </Table>
                           </div>
                       </div>
                        <div className="col-lg-6 my-2">
                            <h5>{coachData.students.length} {coachData.students.length > 1 || coachData.students.length === 0 ? "Students" : "Student"}</h5>
                            <div class="mb-3">
                                <Table isLoading={!didLoad} data={studentIds} keyField="id">
                                    <Column header={`Name`} field={`id`}/>
                                    <Column header={`EID`} field={`id`}/>
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

export default Coach;