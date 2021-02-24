import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
        <Link class="align-items-center text-decoration-none p-2" to={`/response/${responseData.response_id}`}>
            {responseData.response_id}
        </Link>
    );
}

export default ResponseIdCell;
