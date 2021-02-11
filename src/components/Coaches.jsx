import React, { useState, useEffect } from 'react';
import { TableWithBrowserPagination, Column } from "react-rainbow-components";

function Coaches() {
    const [coachData, setCoachData] = useState([]);

    useEffect(() => {
        fetch(`https://manager-prod.herokuapp.com/coaches`, {method: "GET"})
            .then(res => res.json())
            .then(response => {
                setCoachData(response)
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="coaches">
            <div class="container my-3">
                <h1>{coachData.length} Coaches</h1>
                <TableWithBrowserPagination pageSize={30} data={coachData} keyField="id">
                    <Column header={`First Name`} field={`first_name`}/>
                    <Column header={`Last Name`} field={`last_name`}/>
                    <Column header={`EID`} field={`eid`}/>
                    <Column header={`Email`} field={`email`}/>
                </TableWithBrowserPagination>
            </div>
        </div>
    );
}

export default Coaches;