import React, { useState, useEffect } from 'react';
import {Column, Spinner, Table} from 'react-rainbow-components';

function Coach(props){
    // TODO: Add editing state
    // TODO: Add student data and response data

    const [coachData, setCoachData] = useState({});
    const [didLoad, setDidLoad] = useState(false);

    useEffect(() => {
        fetch(`https://manager-prod.herokuapp.com/coaches/${props.match.params.id}`, {method: "GET"})
            .then(res => res.json())
            .then(response => {
                setCoachData(response);
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
                       <div class="col-lg-6">
                           <h5>{coachData.responses.length} Responses</h5>
                           <Table isLoading={!didLoad} data={coachData.responses} keyField="id">

                           </Table>
                       </div>
                        <div className="col-lg-6">
                            <h5>{coachData.students.length} Students</h5>
                            <Table isLoading={!didLoad} data={coachData.students} keyField="id">

                            </Table>
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