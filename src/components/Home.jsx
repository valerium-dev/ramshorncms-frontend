import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useFormik } from 'formik';

function Home() {

    const [submitted, setSubmitted] = useState(false);

    const formik = useFormik({
        initialValues: {
            excel: ''
        },
        onSubmit: values => {
            const data = new FormData();
            data.append('excel', values.excel);
            fetch('https://manager-prod.herokuapp.com/import/excel', {
                method: 'POST',
                body: data
            }).then(response => {
                setSubmitted(true);
            });
        }
    });

    return (!submitted ?
        <div className="home">
            <div class="container text-center py-3">
                <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#fileUploadModal">
                    <i className="fas fa-file-excel"/> Import from Excel
                </button>
            </div>
            <div class="modal fade" id="fileUploadModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Import from Excel file</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                        </div>
                        <div class="modal-body">
                            <p class="text-danger">
                                Importing from Excel files deletes all data stored in the system.
                                <strong> Proceed with caution.</strong>
                            </p>
                            <form id="fileUpload" onSubmit={formik.handleSubmit}>
                                <label htmlFor="excel" className="form-label">Select the Excel spreadsheet to import:</label>
                                <input id="excel"
                                       class="form-control"
                                       type="file"
                                       name="excel"
                                       onChange={(event)=>{
                                           formik.setFieldValue("excel", event.target.files[0]);
                                       }}
                                       onBlur={formik.handleBlur}/><br/>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <input type="submit" form="fileUpload" class="btn btn-primary"
                                   data-bs-toggle="modal"
                                   data-bs-target="#fileUploadModal"
                                   value="Upload File"/>
                        </div>
                    </div>
                </div>
            </div>
        </div> : <Redirect to="/coaches"/>
    );
}

export default Home;