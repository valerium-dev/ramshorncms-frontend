import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useFormik } from 'formik';

function NewStudent(){

    const [submitted, setSubmitted] = useState(false);

    const validate = values => {
        const errors = {};

        if (!values.first_name) {
            errors.first_name = 'Required';
        }

        if (!values.last_name) {
            errors.last_name = 'Required';
        }

        if (!values.eid) {
            errors.eid = 'Required';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            eid: ''
        },
        validate,
        onSubmit: values => {
            fetch('https://manager-prod.herokuapp.com/newStudent', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values, null, 2)
            }).then(() => {
                setSubmitted(true);
            });
        },
    });

    return (!submitted ?
        <div className="newStudent">
            <div class="container mt-3">
                <h1>Create New Student</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className="row mb-4">
                        <div class="col">
                            <label className="form-label mt-2" htmlFor="first_name">First Name</label>
                            <input
                                class="form-control"
                                id="first_name"
                                name="first_name"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.first_name}
                            />
                            {formik.touched.first_name && formik.errors.first_name ? <div class="form-text text-danger">{formik.errors.first_name}</div> : null}
                        </div>
                        <div class="col">
                            <label className="form-label mt-2" htmlFor="last_name">Last Name</label>
                            <input
                                class="form-control"
                                id="last_name"
                                name="last_name"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.last_name}
                            />
                            {formik.touched.last_name && formik.errors.last_name ? <div class="form-text text-danger">{formik.errors.last_name}</div> : null}
                        </div>
                        <div className="col">
                            <label className="form-label mt-2" htmlFor="eid">EID</label>
                            <input
                                className="form-control"
                                id="eid"
                                name="eid"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.eid}
                            />
                            {formik.touched.eid && formik.errors.eid ?
                                <div className="form-text text-danger">{formik.errors.eid}</div> : null}
                        </div>
                    </div>

                    <button class="btn btn-primary mt-2" type="submit">Create Student</button>
                </form>
            </div>
        </div> : <Redirect to="/students"/>);
}

export default NewStudent;