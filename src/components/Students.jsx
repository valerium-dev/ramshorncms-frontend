import React, { useState, useEffect } from 'react';
import { Table, Column, MenuItem } from "react-rainbow-components";
import { Link } from 'react-router-dom';
import StudentNameCell from './StudentNameCell';
import CoachNameCell from "./CoachNameCell";

function Students() {
    let selectedStudents = [];

    const [studentData, setStudentData] = useState([]);
    const [didLoad, setDidLoad] = useState(false);
    const [disabled, setDisabled] = useState("disabled");

    useEffect(() => {
        fetch(`https://manager-prod.herokuapp.com/students`, {method: "GET"})
            .then(res => res.json())
            .then(response => {
                const studentData = response.map(item => {
                    return {
                        "eid": item.eid,
                        "id": item.id,
                        "coach": item.coach
                    }
                });
                setStudentData(studentData);
                setDidLoad(true);
            })
            .catch(error => console.log(error));
    }, []);

    function updateSelection(selection){
        selectedStudents = selection;
        const multiDelete = document.getElementById('deleteSelected');
        multiDelete.textContent = `Delete ${selectedStudents.length} ${selectedStudents.length === 1 ? "Student" : "Students"}`;

        const multiReassign = document.getElementById('reassignSelected');
        multiReassign.textContent = `Reassign ${selectedStudents.length} ${selectedStudents.length === 1 ? "Student" : "Students"}`;

        if (selectedStudents.length > 0) {
            setDisabled('');
        } else {
            setDisabled('disabled');
        }
    }

    function deleteSelection() {
        // TODO: Interface with API for multi delete
    }

    return (
        <div className="coaches">
            <div class="container my-3">
                <h1>{studentData.length} {studentData.length > 1 || studentData.length === 0 ? "Students" : "Student"}</h1>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <Link to="/newStudent"><button type="button" className="btn btn-secondary">Add Student</button></Link>
                    <button id="reassignSelected" type="button" className="btn btn-secondary" disabled={disabled}>Reassign 0 Students</button>
                    <button id="deleteSelected" type="button" className="btn btn-danger" disabled={disabled} onClick={deleteSelection()}>Delete 0 Students</button>
                </div>
                <div class="my-2">
                    <Table isLoading={!didLoad} showCheckboxColumn onRowSelection={selection => updateSelection(selection)} data={studentData} keyField="id">
                        <Column header={`Name`} field={`id`} component={ StudentNameCell }/>
                        <Column header={`EID`} field={`eid`}/>
                        <Column header={`Coach`} field={`coach`} component={ CoachNameCell }/>
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

export default Students;