import { Button, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { AddRole, UpdateRole } from '../../redux/slices/roleSlice';

const AddNewRole = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { state } = useLocation();
    const [role, setRole] = useState({
        label: '',
    });

    useEffect(() => {
        if (state && state.role) {
            setRole({ ...state.role });
        }
    }, [state]);

    const onCreateRole = (values) => {
        dispatch(AddRole({ key: values.label?.toLowerCase(), ...values}));
        navigate('/roles');
    };

    const onUpdateRole = (values) => {
        dispatch(UpdateRole(values));
        navigate('/roles');
    };
    
    return (
        <div>
            <Typography sx={{ fontSize: 24, textAlign: 'center', width: '100%', marginTop: "50px" }}>{role?.key ? 'Update Role' : 'Add New Role'}</Typography>
            <div style={{padding: 100}}>
                <Formik
                    enableReinitialize
                    initialValues={role}
                    onSubmit={(values) => {
                        if (values && role?.key) {
                            onUpdateRole(values);
                        } else {
                            onCreateRole(values);
                        }
                    }}
                    >
                    {({ isSubmitting }) => (
                        <Form>
                            <Field 
                                component={TextField}
                                name="label"
                                label="Label"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                required
                            />
                            <Button sx={{ marginTop: 5}} type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                                Submit
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AddNewRole;
