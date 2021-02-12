import React, { useState, useEffect } from 'react';
import { Table, Column, MenuItem } from "react-rainbow-components";
import { Link } from 'react-router-dom';
import NameCell from './NameCell';

function Coaches() {
    let selectedCoaches = [];

    const [coachData, setCoachData] = useState([]);
    const [didLoad, setDidLoad] = useState(false);

    useEffect(() => {
        fetch(`https://manager-prod.herokuapp.com/coaches`, {method: "GET"})
            .then(res => res.json())
            .then(response => {
                const coachData = response.map(item => {
                    return {
                        "eid": item.eid,
                        "email": item.email,
                        "coach": {
                            "id": item.id,
                            "name": item.first_name.concat(" ", item.last_name),
                        }
                    }
                });
                setCoachData(coachData);
                setDidLoad(true);
            })
            .catch(error => console.log(error));
    }, []);

    function updateSelection(selection){
        selectedCoaches = selection;
        document.getElementById('deleteSelected').hidden = !(selectedCoaches.length > 0);
    }

    function deleteSelection() {
        // TODO: Interface with API for multi delete
    }

    return (
        <div className="coaches">
            <div class="container my-3">
                <h1>{coachData.length} Coaches</h1>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <Link to="/newCoach"><button type="button" className="btn btn-secondary">Add Coach</button></Link>
                    <button id="deleteSelected" type="button" className="btn btn-danger" hidden="true" onClick={deleteSelection()}>Delete Selected</button>
                </div>
                <div class="my-2">
                    <Table isLoading={!didLoad} showCheckboxColumn onRowSelection={selection => updateSelection(selection)} data={coachData} keyField="id">
                        <Column header={`Name`} field={`coach`} component={ NameCell }/>
                        <Column header={`EID`} field={`eid`}/>
                        <Column header={`Email`} field={`email`}/>
                        <Column type="action">
                            {/* TODO: Call API for delete and redirect to component for editing data */}
                            <MenuItem label="Edit" onClick={(event, data) => console.log(`Edit ${data.id}`)} />
                            <MenuItem label="Delete" onClick={(event, data) => console.log(`Delete ${data.id}`)} />
                        </Column>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default Coaches;