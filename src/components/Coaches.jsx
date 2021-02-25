import React, { useState, useEffect } from 'react';
import { Table, Column, MenuItem } from "react-rainbow-components";
import { Link } from 'react-router-dom';
import CoachNameCell from './CoachNameCell';

function Coaches() {
    let selectedCoaches = [];

    const [coachData, setCoachData] = useState([]);
    const [didLoad, setDidLoad] = useState(false);
    const [disabled, setDisabled] = useState("disabled");

    useEffect(() => {
        fetch(`https://manager-prod.herokuapp.com/coaches`, {method: "GET"})
            .then(res => res.json())
            .then(response => {
                const coachData = response.map(item => {
                    return {
                        "eid": item.eid,
                        "email": item.email,
                        "id": item.id
                    }
                });
                setCoachData(coachData);
                setDidLoad(true);
            })
            .catch(error => console.log(error));
    }, []);

    function updateSelection(selection){
        selectedCoaches = selection;
        const multiDelete = document.getElementById('deleteSelected');
        multiDelete.textContent = `Delete ${selectedCoaches.length} ${selectedCoaches.length === 1 ? "Coach" : "Coaches"}`

        const multiEmail = document.getElementById('emailSelected');
        multiEmail.textContent = `Email ${selectedCoaches.length} ${selectedCoaches.length === 1 ? "Coach" : "Coaches"}`

        if (selectedCoaches.length > 0) {
            setDisabled('');
        } else {
            setDisabled('disabled');
        }
    }

    function deleteSelection() {
        selectedCoaches.forEach(deleteCoach)
    }

    function deleteCoach(coach) {
        fetch(`https://manager-prod.herokuapp.com/coaches/${coach.id}/delete`, {method: "GET"})
            .then(res => res.json())
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    return (
        <div className="coaches">
            <div class="container my-3">
                <h1>{coachData.length} {coachData.length > 1 || coachData.length === 0 ? "Coaches" : "Coach"}</h1>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <Link to="/newCoach"><button type="button" className="btn btn-secondary">Add Coach</button></Link>
                    <button id="emailSelected" type="button" className="btn btn-secondary" disabled={disabled}>Email 0 Coaches</button>
                    <button id="deleteSelected" type="button" className="btn btn-danger" disabled={disabled} onClick={deleteSelection}>Delete 0 Coaches</button>
                </div>
                <div class="my-2">
                    <Table isLoading={!didLoad} showCheckboxColumn onRowSelection={selection => updateSelection(selection)} data={coachData} keyField="id">
                        <Column header={`Name`} field={`id`} component={ CoachNameCell }/>
                        <Column header={`EID`} field={`eid`}/>
                        {/* TODO: Create component for sending email */}
                        <Column header={`Email`} field={`email`}/>
                        <Column type="action">
                            {/* TODO: Redirect to component for editing data */}
                            <MenuItem label="Edit" onClick={(event, data) => console.log(`Edit ${data.id}`)} />
                            <MenuItem label="Delete" onClick={(event, data) => deleteCoach({id: data.id})} />
                        </Column>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default Coaches;
