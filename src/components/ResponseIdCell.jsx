import React, { useState, useEffect } from 'react';

function ResponseIdCell({ value }){

    const [responseData, setResponseData] = useState({});

    useEffect(() => {
        fetch(`https://manager-prod.herokuapp.com/responses/${value}`, {method: "GET"})
            .then(res => res.json())
            .then(response => {
                setResponseData(response);
            })
            .catch(error => console.log(error))
    }, [value]);

    return (
        <a class="align-items-center text-decoration-none p-2" href={responseData.response_url} rel="noreferrer">
            {/*TODO: Call Qualtrics API for a fresh response_url*/}
            {responseData.response_id}
        </a>
    );}

export default ResponseIdCell;