import React, { useState, useEffect } from 'react';

function ResponseDateCell({ value }){
    const [responseData, setResponseData] = useState({});

    useEffect(() => {
        fetch(`https://manager-prod.herokuapp.com/responses/${value}`, {method: "GET"})
            .then(res => res.json())
            .then(response => {
                setResponseData(response);
            })
            .catch(error => console.log(error));

    }, [value]);

    return (
        <div class="align-items-center text-decoration-none">
            {(new Date(responseData.timestamp)).toLocaleDateString()}
        </div>
    );
}

export default ResponseDateCell;